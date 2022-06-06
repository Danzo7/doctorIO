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
type Position = {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
};
export interface OverlayOptions {
  isDimmed?: boolean;
  clickThrough?: boolean;
  backdropColor?: string;
  closeOnClickOutside?: true;
  position?: Position;
  closeOnBlur?: true;
  onClose?: () => void;
  width?: number | string;
  height?: number | string;
  popperTarget?: HTMLElement;
  closeMethod?: () => void;
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
  width,
  height,
  closeBtn,
  popperTarget,
  closeOnClickOutside,
  closeOnBlur,
  closeMethod,
  position,
}: OverlayItemProps) {
  const closeOverlay = () => (closeMethod ? closeMethod() : Overlay.close());

  return (
    <>
      <div
        className="backdrop"
        css={css({
          backgroundColor: isDimmed ? backdropColor ?? '#000000d9' : undefined,
          pointerEvents: clickThrough ? 'none' : 'all',
        })}
        onClick={
          closeOnClickOutside
            ? (e) => {
                closeOverlay();
                e.stopPropagation();
              }
            : undefined
        }
      ></div>
      <div
        className="layer"
        css={{
          width: width,
          height: height,
          position: position && 'absolute',
          top: position?.top,
          bottom: position?.bottom,
          left: position?.left,
          right: position?.right,
        }}
        tabIndex={-1}
        onBlur={
          closeOnBlur
            ? (event) => {
                if (
                  !(
                    event.relatedTarget == event.currentTarget ||
                    event.relatedTarget == event.currentTarget ||
                    event.target.contains(event.relatedTarget)
                  )
                )
                  closeOverlay();
              }
            : undefined
        }
        ref={(e) => {
          e?.focus();
          if (e != null) {
            if (popperTarget)
              createPopper(popperTarget, e, { placement: 'right' });
          }
        }}
      >
        {closeBtn && (
          <div className={`close-btn ${closeBtn.placement}`}>
            {closeBtn.component ?? (
              <SquareIconButton onPress={() => closeOverlay()} />
            )}
          </div>
        )}
        {children}
      </div>
    </>
  );
}
