import { Overlay } from './overlay';
import back from 'toSvg/arrow_line.svg?icon';

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './style/index.scss';
import SquareIconButton from '@components/buttons/square_icon_button';
import { css } from '@emotion/react';
import { createPopper, Modifier, OptionsGeneric } from '@popperjs/core';
import { useRouteChange } from '@libs/HistoryBlocker';
import { ActionProps } from '@components/poppers/tooltip';
interface OverlayContainerProps {}
export const OverlayContext = createContext<{
  open?: (target: ReactNode, props: OverlayOptions) => void;
  close?: () => void;
  openTooltip?: (
    actionList: ActionProps[],
    popperTarget: HTMLElement,
    autoClose: true | undefined,
  ) => void;
}>({
  open: Overlay?.open,
  close: Overlay?.close,
  openTooltip: Overlay?.openTooltip,
});

export function OverlayContainer({}: OverlayContainerProps) {
  const [render, setrender] = useState<React.ReactPortal[]>([]);
  const update = useCallback(
    (state?: (portals: React.ReactPortal[]) => React.ReactPortal[]) => {
      if (state) setrender((old) => state(old));
      else setrender([]);
    },
    [],
  );
  const overlayRef = useRef(null);

  useRouteChange(() => Overlay.close());

  const removePortal = useCallback((portal?: React.ReactPortal) => {
    if (portal) {
      setrender((old) => old.filter((item) => item !== portal));
    }
  }, []);
  useEffect(() => {
    if (overlayRef.current) Overlay.setRenderer(overlayRef.current);
    Overlay.update = update;
    Overlay.removePortal = removePortal;
  }, [update, removePortal]);

  return (
    <div className="overlay-container" ref={overlayRef}>
      {render}
    </div>
  );
}
type Position = {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
};
type PopperTargetType = {
  target: HTMLElement;
  options: Partial<OptionsGeneric<Partial<Modifier<any, any>>>>;
};
export interface OverlayOptions {
  isDimmed?: boolean;
  clickThrough?: boolean;
  backdropColor?: string | false;
  closeOnClickOutside?: true;
  position?: Position;
  closeOnBlur?: true;
  onClose?: () => void;
  width?: number | string;
  height?: number | string;
  popperTarget?: HTMLElement | PopperTargetType;
  closeMethod?: () => void;
  //draggable?: boolean;
  closeBtn?:
    | 'inner'
    | 'outer'
    | 'above'
    | {
        placement: 'inner' | 'outer' | 'above';
        component: ReactNode;
      };
  transition?:
    | 'zoom'
    | 'appear-right'
    | 'appear-left'
    | 'appear-top'
    | 'appear-bottom';
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
  transition = 'zoom',
}: OverlayItemProps) {
  const closeOverlay = () => (closeMethod ? closeMethod() : Overlay.close());

  return (
    <>
      {backdropColor !== false && (
        <div
          className="backdrop"
          css={css({
            backgroundColor: isDimmed
              ? backdropColor ?? '#000000d9'
              : undefined,
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
      )}
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
          animation: transition && `${transition} .1s forwards ease-out`,
        }}
        tabIndex={-1}
        onBlur={
          closeOnBlur
            ? (event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  closeOverlay();
                }
              }
            : undefined
        }
        ref={(e) => {
          e?.focus();
          if (e != null) {
            if (popperTarget)
              createPopper(
                (popperTarget as PopperTargetType)?.target ?? popperTarget,
                e,
                (popperTarget as PopperTargetType)?.options ?? {
                  placement: 'auto-end',
                },
              );
          }
        }}
      >
        {closeBtn && (
          <div
            className={`close-btn ${
              typeof closeBtn == 'string' ? closeBtn : closeBtn.placement
            }`}
          >
            {typeof closeBtn == 'string' ? (
              <SquareIconButton onPress={() => closeOverlay()} Icon={back} />
            ) : (
              closeBtn.placement
            )}
          </div>
        )}
        {children}
      </div>
    </>
  );
}
