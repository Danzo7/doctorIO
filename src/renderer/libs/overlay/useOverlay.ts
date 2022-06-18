import { ReactNode, useCallback, useId, useRef } from 'react';
import { Overlay } from './overlay';
import { OverlayItem, OverlayOptions } from './OverlayContainer';
import Tooltip, { ActionProps } from '@components/poppers/tooltip';
import { createPortal } from 'react-dom';

export function useOverlay() {
  const id = 'l' + useId() + 'ov';
  const layer = document.createElement('div');
  layer.setAttribute('class', 'overlay ' + id);
  layer.setAttribute('id', id);
  const portal = useRef<React.ReactPortal>();
  const close = useCallback(() => {
    if (Overlay.entryElement == undefined)
      throw Error(
        'No overlay reference found,please create `<OverlayContainer></OverlayContainer> or you have to setRenderer first. Call seRenderer(Element) on your overlay component`',
      );
    Overlay.entryElement.removeChild(layer);
    Overlay.removePortal(portal.current);
  }, [layer]);
  const open = useCallback(
    (target: ReactNode, props: OverlayOptions) => {
      if (Overlay.entryElement == undefined)
        throw Error(
          'No overlay reference found,please create `<OverlayContainer></OverlayContainer> or you have to setRenderer first. Call seRenderer(Element) on your overlay component`',
        );
      Overlay.entryElement.appendChild(layer);
      layer.setAttribute(
        'style',
        'z-index:' + 10 + Overlay.entryElement.children.length,
      );

      portal.current = createPortal(
        OverlayItem({
          children: target,
          closeMethod: close,
          ...props,
        }),
        layer,
      );
      Overlay.update(portal.current);
    },
    [close, layer],
  );

  //unstable
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
      // killRoot();
      // (popperTarget.parentElement || popperTarget).appendChild(layer);
      // createPopper(popperTarget, layer, { placement: 'right' });
      // root.current = createRoot(layer);

      Overlay.entryElement.appendChild(layer);
      layer.setAttribute(
        'style',
        'z-index:' + 10 + Overlay.entryElement.children.length,
      );

      portal.current = createPortal(
        OverlayItem({
          children: Tooltip({
            actionList: actionList,
            closeOnSelect: autoClose && close,
          }),
          clickThrough: true,
          closeOnClickOutside: true,
          closeOnBlur: true,
          popperTarget,
          closeMethod: close,
        }),
        layer,
      );
      Overlay.update(portal.current);
    },
    [close, layer],
  );

  return { open, close, openTooltip };
}
