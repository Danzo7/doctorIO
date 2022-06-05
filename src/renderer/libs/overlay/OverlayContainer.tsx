import { Overlay } from './overlay';
import { ReactNode, useEffect, useRef } from 'react';
import './style/index.scss';
import SquareIconButton from '@components/buttons/square_icon_button';
import { css } from '@emotion/react';
import { createPopper } from '@popperjs/core';
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
  closeOnClickOutside?: (() => void) | true;
  onClose?: () => void;
  width?: string;
  popperTarget?: HTMLElement;
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
  isDimmed = false,
  clickThrough = false,
  backdropColor,
  width = '50%',
  closeBtn,
  popperTarget,
  closeOnClickOutside,
}: OverlayItemProps) {
  return (
    <>
      <div
        className="backdrop"
        css={css({
          backgroundColor: isDimmed ? backdropColor ?? '#000000d9' : undefined,
          pointerEvents: clickThrough ? 'none' : 'all',
        })}
        onClick={(e) => {
          if (closeOnClickOutside) {
            if (typeof closeOnClickOutside == 'function') closeOnClickOutside();
            else Overlay.close();
          }
          e.stopPropagation();
        }}
      ></div>
      <div
        className="layer"
        css={css({ width: width })}
        ref={
          popperTarget
            ? (e) => {
                if (e != null) {
                  createPopper(popperTarget, e);
                }
              }
            : undefined
        }
      >
        {closeBtn && (
          <div className={`close-btn ${closeBtn.placement}`}>
            {closeBtn.component ?? (
              <SquareIconButton onPress={() => Overlay.close()} />
            )}
          </div>
        )}
        {children}
      </div>
    </>
  );
}
