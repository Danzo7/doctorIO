import { ReactNode, useCallback, useEffect, useId, useRef } from 'react';
import { Overlay } from './overlay';
import Tooltip, { ActionProps } from '@components/poppers/tooltip';
import { createPortal } from 'react-dom';
import { createPopper } from '@popperjs/core';
import { OverlayItem } from './OverlayItem';
import { OverlayOptions } from './types';
/**
 *  @deprecated This hook is deprecated, use `Overlay_u` instead
 */
export function useOverlay(args?: { closeToOpen?: boolean }) {
  const layer = useRef<HTMLDivElement>();
  const id = 'l' + useId() + 'ov';
  const isOpened = useRef(false);
  const portal = useRef<React.ReactPortal>();
  const close = useCallback(() => {
    if (Overlay.entryElement == undefined)
      throw Error(
        'No overlay reference found,please create `<OverlayContainer></OverlayContainer> or you have to setRenderer first. Call seRenderer(Element) on your overlay component`',
      );
    try {
      layer.current?.remove();
    } catch (e) {
      //do nothing
    }
    layer.current = undefined;

    Overlay.removePortal(portal.current);
    portal.current = undefined;
    isOpened.current = false;
  }, [layer]);

  const open = useCallback(
    (target: ReactNode, props: OverlayOptions) => {
      if (Overlay.entryElement == undefined)
        throw Error(
          'No overlay reference found,please create `<OverlayContainer></OverlayContainer> or you have to setRenderer first. Call seRenderer(Element) on your overlay component`',
        );
      if (isOpened.current)
        if (args?.closeToOpen) {
          return;
        } else {
          close();
          open(target, props);
          return;
        }
      else {
        layer.current = document.createElement('div');
        layer.current.setAttribute('class', 'overlay ' + id);
        layer.current.setAttribute('id', id);
        layer.current.setAttribute(
          'style',
          'z-index:' + 10 + Overlay.entryElement.children.length,
        );
        Overlay.entryElement.appendChild(layer.current);

        portal.current = createPortal(
          OverlayItem({
            children: target,
            closeMethod: close,
            ...props,
          }),
          layer.current as HTMLDivElement,
        );
        Overlay.addPortal(portal.current);
        isOpened.current = true;
      }
    },
    [args?.closeToOpen, close, id],
  );
  const useOpen = (target: ReactNode, props: OverlayOptions, when = false) => {
    useEffect(() => {
      if (!when || isOpened.current) return;
      open(target, props);
    }, [target, props, when]);
  };
  const openTooltip = useCallback(
    (
      actionList: ActionProps[],
      popperTarget: HTMLElement,
      autoClose: true | undefined,
    ) => {
      if (Overlay.entryElement == undefined)
        throw Error(
          'No overlay reference found,please create `<OverlayContainer></OverlayContainer> or you have to setRenderer first. Call seRenderer(Element) on your overlay component`',
        );
      open(
        Tooltip({
          actionList: actionList,
          closeOnSelect: autoClose && close,
        }),
        {
          clickThrough: true,
          closeOnClickOutside: true,
          closeOnBlur: true,
          popperTarget,
          closeMethod: close,
        },
      );
    },
    [close, open],
  );

  const openPopper = useCallback(
    (
      target: ReactNode,
      {
        popperTarget,
        closeOnBlur = true,
        ...props
      }: OverlayOptions & { popperTarget: HTMLElement },
    ) => {
      if (Overlay.entryElement == undefined)
        throw Error(
          'No overlay reference found,please create `<OverlayContainer></OverlayContainer> or you have to setRenderer first. Call seRenderer(Element) on your overlay component`',
        );
      if (isOpened.current) close();
      layer.current = document.createElement('div');
      layer.current.setAttribute('class', 'overlay ' + id);
      layer.current.setAttribute('id', id);
      layer.current.setAttribute(
        'style',
        'z-index:' + 10 + Overlay.entryElement.children.length,
      );
      popperTarget.appendChild(layer.current);
      createPopper(popperTarget, layer.current, { placement: 'auto-end' });

      portal.current = createPortal(
        OverlayItem({
          children: target,
          closeOnBlur: closeOnBlur,
          closeMethod: close,
          backdropColor: false,

          ...props,
        }),
        layer.current,
      );
      Overlay.addPortal(portal.current);
      isOpened.current = true;
    },
    [close, id],
  );

  const openTooltip_unstable = useCallback(
    (
      actionList: ActionProps[],
      popperTarget: HTMLElement,
      autoClose: true | undefined,
    ) => {
      if (Overlay.entryElement == undefined)
        throw Error(
          'No overlay reference found,please create `<OverlayContainer></OverlayContainer> or you have to setRenderer first. Call seRenderer(Element) on your overlay component`',
        );
      openPopper(
        Tooltip({
          actionList: actionList,
          closeOnSelect: autoClose && close,
        }),
        {
          clickThrough: true,
          closeOnClickOutside: true,
          closeOnBlur: true,
          popperTarget,
          closeMethod: close,
        },
      );
    },
    [close, openPopper],
  );
  return {
    open,
    close,
    openTooltip,
    openPopper,
    openTooltip_unstable,
    useOpen,
    isOpened: isOpened.current,
  };
}
