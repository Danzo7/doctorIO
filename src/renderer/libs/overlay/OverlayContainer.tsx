import { Overlay } from './overlay';
import back from 'toSvg/x_mark.svg?icon';

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
import { css, CSSObject } from '@emotion/react';
import { createPopper, Modifier, OptionsGeneric } from '@popperjs/core';
import { useRouteChange } from '@libs/HistoryBlocker';
import { ActionProps } from '@components/poppers/tooltip';
import { createPortal } from 'react-dom';
import {
  getOverlayNode,
  Overlay_u,
  useIsOpenModal,
  useOpenHelptipId,
  useOpenTooltipId,
} from '@stores/overlayStore';
import ToastContainer from '@libs/toast_container';
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
      //Temporary fix with "setTimeout" for dirty state when removing a portal while updating with usePrompt while updating a component
      setTimeout(
        () => setrender((old) => old.filter((item) => item !== portal)),
        0,
      );
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
export function TooltipContainer() {
  const id = useOpenTooltipId();
  return (
    <>
      {id && (
        <div className="overlay-container" css={{ zIndex: 2 }}>
          <div>{getOverlayNode(id)}</div>
        </div>
      )}
    </>
  );
}

export function HelptipContainer() {
  const hId = useOpenHelptipId();
  return (
    <>
      {hId && (
        <div className="overlay-container" css={{ zIndex: 30 }}>
          <div>{getOverlayNode(hId)}</div>
        </div>
      )}
    </>
  );
}
function ModalContainer() {
  const id = useIsOpenModal();
  return (
    <>
      {id && (
        <div className="overlay-container">
          <div>{getOverlayNode(id)}</div>
        </div>
      )}
    </>
  );
}
export function OverlayContainer_Unstable({}: OverlayContainerProps) {
  useRouteChange(() => Overlay_u.clear());

  return (
    <>
      <HelptipContainer />
      <ModalContainer />
      <ToastContainer />
      <TooltipContainer />
    </>
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
  closeOnClickOutside?: boolean;
  position?: Position;
  closeOnBlur?: boolean;
  onClose?: () => void;
  width?: number | string;
  height?: number | string;
  style?: CSSObject;
  popperTarget?: HTMLElement | PopperTargetType;
  closeMethod?: () => void;
  defaultCloseFallback?: boolean;
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
    | 'appear-bottom'
    | 'none';
  autoFocus?: boolean;
  clickable?: boolean;
  closable?: boolean;
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
  autoFocus = true,
  closeMethod,
  position,
  transition = 'zoom',
  onClose,
  defaultCloseFallback = true,
  style,
  clickable = true,
  closable = true,
}: OverlayItemProps) {
  const closeOverlay = () => {
    if (!closable) return;
    if (onClose) onClose();
    // if (closeMethod) closeMethod();
    else if (defaultCloseFallback) Overlay.close();
  };
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
            closable && closeOnClickOutside
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
          ...style,
          width: width,
          height: height,
          position: position && 'absolute',
          top: position?.top,
          bottom: position?.bottom,
          left: position?.left,
          right: position?.right,
          animation:
            transition != 'none'
              ? `${transition} .1s forwards ease-out`
              : undefined,
          pointerEvents: clickable ? 'all' : 'none',
        }}
        {...(autoFocus ? { tabIndex: -1 } : {})}
        onBlur={
          closable && closeOnBlur
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
                (popperTarget as PopperTargetType).target ?? popperTarget,
                e,
                (popperTarget as PopperTargetType).options ?? {
                  placement: 'auto-end',
                },
              );
          }
        }}
      >
        {closable && closeBtn && (
          <div
            className={`close-btn ${
              typeof closeBtn == 'string' ? closeBtn : closeBtn.placement
            }`}
          >
            {typeof closeBtn == 'string' ? (
              <SquareIconButton
                onPress={() => closeOverlay()}
                Icon={back}
                tip="Close"
              />
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
export function PortalContainer({}: OverlayContainerProps) {
  return (
    <div
      className="overlay-container"
      ref={(e) => {
        Overlay.portalEntry = e as HTMLDivElement;
      }}
    />
  );
}
export function ModalPortal({
  children,
  ...options
}: OverlayOptions & { onClose?: () => void } & {
  children: ReactNode;
}): React.ReactPortal {
  return createPortal(
    <div>
      <OverlayItem defaultCloseFallback={false} {...options}>
        {children}
      </OverlayItem>
    </div>,
    Overlay.portalEntry,
  );
}
