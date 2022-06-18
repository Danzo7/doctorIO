import { ReactNode, useCallback, useId, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Overlay } from './overlay';
import { OverlayItem, OverlayOptions } from './OverlayContainer';
import Tooltip, { ActionProps } from '@components/poppers/tooltip';

export function useOverlay() {
  const id = 'l' + useId() + 'ov';
  const layer = document.createElement('div');
  layer.setAttribute('class', 'overlay ' + id);
  layer.setAttribute('id', id);
  const root = useRef<Root>();
  const killRoot = useCallback(() => {
    root.current?.unmount();
    root.current = undefined;
  }, []);
  const close = useCallback(() => {
    if (Overlay.entryElement == undefined)
      throw Error(
        'No overlay reference found,please create `<OverlayContainer></OverlayContainer> or you have to setRenderer first. Call seRenderer(Element) on your overlay component`',
      );
    Overlay.entryElement.removeChild(layer);
    if (root) {
      killRoot();
    }
  }, [killRoot, layer, root]);
  const open = useCallback(
    (target: ReactNode, props: OverlayOptions) => {
      if (Overlay.entryElement == undefined)
        throw Error(
          'No overlay reference found,please create `<OverlayContainer></OverlayContainer>`',
        );

      Overlay.entryElement.appendChild(layer);
      layer.setAttribute(
        'style',
        'z-index:' + 10 + Overlay.entryElement.children.length,
      );
      killRoot();
      root.current = createRoot(layer);
      root.current.render(
        OverlayItem({
          children: target,
          closeMethod: close,
          ...props,
        }),
      );
    },
    [close, killRoot, layer],
  );

  //unstable
  const openTooltip = useCallback(
    (
      actionList: ActionProps[],
      popperTarget: HTMLElement,
      autoClose: true | undefined,
    ) => {
      // killRoot();
      // (popperTarget.parentElement || popperTarget).appendChild(layer);
      // createPopper(popperTarget, layer, { placement: 'right' });
      // root.current = createRoot(layer);
      if (Overlay.entryElement == undefined)
        throw Error(
          'No overlay reference found,please create `<OverlayContainer></OverlayContainer>`',
        );

      Overlay.entryElement.appendChild(layer);
      layer.setAttribute(
        'style',
        'z-index:' + 10 + Overlay.entryElement.children.length,
      );
      killRoot();
      root.current = createRoot(layer);
      root.current.render(
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
      );
    },
    [close, killRoot, layer],
  );

  return { open, close, openTooltip, root };
}
