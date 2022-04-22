import { css } from '@emotion/css';
import { Overlay } from './overlay';
import React, { ReactNode, useEffect, useRef } from 'react';
import './style/index.scss';
interface OverlayContainerProps {}

export function OverlayContainer({}: OverlayContainerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (overlayRef.current) Overlay.setRenderer(overlayRef.current);
    return () => {};
  }, [overlayRef]);

  return <div className="overlay-container" ref={overlayRef}></div>;
}
export interface OverlayOptions {
  isDimmed?: boolean;
  clickThrough?: boolean;
  //bgColor,position,draggable,closeBtn
}
type OverlayItemProps = OverlayOptions & {
  children?: ReactNode;
};

export function OverlayItem({
  children,
  isDimmed = true,
  clickThrough = false,
}: OverlayItemProps) {
  return (
    <>
      <div
        className={`backdrop ${css`
          background-color: ${isDimmed ? '#000000d9' : ''};
          pointer-events: ${clickThrough ? 'none' : 'all'};
        `}`}
        onClick={(e) => {
          Overlay.closeModal();
          e.stopPropagation();
        }}
      ></div>
      <div className="layer" children={children} />
    </>
  );
}
