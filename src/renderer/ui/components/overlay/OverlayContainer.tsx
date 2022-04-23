import { css } from '@emotion/css';
import { Overlay } from './overlay';
import React, { ReactNode, useEffect, useRef } from 'react';
import './style/index.scss';
import BackButton from '@components/buttons/back_button';
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
  backdropColor?: string;
  width?: string;
  //draggable?: boolean;
  closeBtn?: {
    placement: 'inner' | 'outer' | 'above';
    component?: ReactNode;
  };
  //bgColor,position,draggable,closeBtn
}
type OverlayItemProps = OverlayOptions & {
  children?: ReactNode;
};

export function OverlayItem({
  children,
  isDimmed = true,
  clickThrough = false,
  backdropColor,
  width = '50%',
  closeBtn,
}: OverlayItemProps) {
  return (
    <>
      <div
        className={`backdrop ${css`
          background-color: ${isDimmed ? backdropColor ?? '#000000d9' : ''};
          pointer-events: ${clickThrough ? 'none' : 'all'};
        `}`}
        onClick={(e) => {
          Overlay.closeModal();
          e.stopPropagation();
        }}
      ></div>
      <div
        className={`layer ${css`
          width: ${width};
        `}`}
      >
        {closeBtn && (
          <div className={`close-btn ${closeBtn.placement}`}>
            {closeBtn.component ?? (
              <BackButton onClick={() => Overlay.closeModal()} />
            )}
          </div>
        )}
        {children}
      </div>
    </>
  );
}
