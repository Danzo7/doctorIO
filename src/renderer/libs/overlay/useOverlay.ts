import { createPopper } from '@popperjs/core';
import { ReactNode, useCallback, useId, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Overlay } from './overlay';
import { OverlayItem, OverlayOptions } from './OverlayContainer';

export function useOverlay() {
  const id = 'l' + useId() + 'ov';
  const layer = document.createElement('div');
  layer.setAttribute('class', 'overlay ' + id);
  if (id) layer.setAttribute('id', id);
  const root = useRef<Root>();
  const killRoot = useCallback(() => {
    root.current?.unmount();
    root.current = undefined;
  }, []);
  const close = useCallback(() => {
    if (Overlay._ref == undefined)
      throw Error(
        'No overlay reference found,please create `<OverlayContainer></OverlayContainer>`',
      );
    Overlay._ref.removeChild(layer);
    if (root) {
      killRoot();
    }
  }, [killRoot, layer, root]);
  const open = useCallback(
    (target: ReactNode, props: OverlayOptions) => {
      if (Overlay._ref == undefined)
        throw Error(
          'No overlay reference found,please create `<OverlayContainer></OverlayContainer>`',
        );

      Overlay._ref.appendChild(layer);
      layer.setAttribute(
        'style',
        'z-index:' + 10 + Overlay._ref.children.length,
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
  const openTooltipTest = useCallback(
    (
      target: ReactNode,
      {
        popperTarget,
        ...props
      }: OverlayOptions & { popperTarget: HTMLElement },
    ) => {
      killRoot();
      (popperTarget.parentElement || popperTarget).appendChild(layer);
      createPopper(popperTarget, layer, { placement: 'right' });

      root.current = createRoot(layer);
      root.current.render(
        OverlayItem({
          children: target,
          ...props,
          closeMethod: close,
        }),
      );
    },
    [close, killRoot, layer],
  );

  return { open, close, openTooltipTest, root };
}
