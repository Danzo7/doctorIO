import { ReactNode, useCallback, useId, useRef } from 'react';
import { Overlay } from './overlay';
import { OverlayItem, OverlayOptions } from './OverlayContainer';
import Tooltip, { ActionProps } from '@components/poppers/tooltip';
import { createPortal } from 'react-dom';
import { createPopper } from '@popperjs/core';
//Known issues:
//When open overlay with closeOnBlur = true, on top of overlay with closeOnBlur the first one will be closed due to blur event.
export function useOverlay() {
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
      return;
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
      if (isOpened.current) close();
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
    },
    [close, id],
  );

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

  const openTest = useCallback(
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

  return { open, close, openTooltip, openTest };
}
// }unstable
// export function usePopper() {
//   const id = 'l' + useId() + 'ov';
//   const layer = useRef(document.createElement('div'));
//   layer.current.setAttribute('class', 'pop ' + id);
//   layer.current.setAttribute('id', id);
//   const portal = useRef<React.ReactPortal>();
//   const _popperTarget = useRef<HTMLElement>();
//   const close = useCallback(() => {
//     if (_popperTarget.current == undefined)
//       throw Error(
//         'No popper has been opened yet, please call openPopper first',
//       );

//     _popperTarget.current.removeChild(layer.current);
//     Overlay.removePortal(portal.current);
//     portal.current = undefined;
//   }, [layer]);

//   const open = useCallback(
//     (
//       target: ReactNode,
//       {
//         popperTarget,
//         closeOnBlur = true,
//         ...props
//       }: OverlayOptions & { popperTarget: HTMLElement },
//     ) => {
//       if (Overlay.entryElement == undefined)
//         throw Error(
//           'No overlay reference found,please create `<OverlayContainer></OverlayContainer> or you have to setRenderer first. Call seRenderer(Element) on your overlay component`',
//         );
//       if (portal.current) {
//         close();
//       }
//       popperTarget.appendChild(layer.current);
//       createPopper(popperTarget, layer.current, { placement: 'auto-end' });
//       portal.current = createPortal(
//         OverlayItem({
//           children: target,
//           closeOnBlur: closeOnBlur,
//           closeMethod: close,
//           backdropColor: false,
//           ...props,
//         }),
//         layer.current,
//       );
//       _popperTarget.current = popperTarget;
//       Overlay.addPortal(portal.current);
//     },
//     [close, layer],
//   );

//   const openTooltip = useCallback(
//     (
//       actionList: ActionProps[],
//       popperTarget: HTMLElement,
//       autoClose: true | undefined,
//     ) => {
//       if (Overlay.entryElement == undefined)
//         throw Error(
//           'No overlay reference found,please create `<OverlayContainer></OverlayContainer> or you have to setRenderer first. Call seRenderer(Element) on your overlay component`',
//         );
//       open(
//         Tooltip({
//           actionList: actionList,
//           closeOnSelect: autoClose && close,
//         }),
//         {
//           clickThrough: true,
//           closeOnClickOutside: true,
//           popperTarget,
//         },
//       );
//     },
//     [close, open],
//   );
//   return { open, close, openTooltip };
// }
