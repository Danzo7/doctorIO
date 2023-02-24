import Tooltip, { ActionProps } from '@components/poppers/tooltip';
import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { OverlayItem, OverlayOptions } from '.';
/**
 * @deprecated This hook is deprecated, use `Overlay_u` instead
 */
export class Overlay {
  static entryElement: HTMLDivElement;

  static portalEntry: HTMLDivElement;

  static update: (
    state?: (portals: React.ReactPortal[]) => React.ReactPortal[],
  ) => void;

  static removePortal: (portal?: React.ReactPortal) => void;

  static setRenderer(ref: HTMLDivElement) {
    this.entryElement = ref;
  }

  static addPortal(portal: React.ReactPortal) {
    this.update((portals) => [...portals, portal]);
  }

  static open(target: ReactNode, props: OverlayOptions) {
    if (this.entryElement) {
      this.entryElement.replaceChildren();
      const el = document.createElement('div');
      this.entryElement.appendChild(el);
      this.update((portals) => [
        ...portals,
        createPortal(OverlayItem({ children: target, ...props }), el),
      ]);
    } else
      throw Error(
        'No overlay reference found! ¨Please add `<OverlayContainer/>`to your component tree',
      );
  }

  static push(
    target: ReactNode,
    props: OverlayOptions,
    id = this.entryElement.children.length.toString(),
  ) {
    if (this.entryElement) {
      const layer =
        document.querySelector('#overlay-' + id) ||
        document.createElement('div');
      layer.setAttribute('id', 'overlay-' + id);
      layer.setAttribute(
        'style',
        'z-index:' + 10 + Overlay.entryElement.children.length,
      );
      this.entryElement.appendChild(layer);
      this.update((portals) => [
        ...portals,
        createPortal(OverlayItem({ children: target, ...props }), layer, id),
      ]);
    } else
      throw Error(
        'No overlay reference found! ¨Please add `<OverlayContainer/>`to your component tree',
      );
  }

  static pop(id = this.entryElement.children.length.toString()) {
    if (this.entryElement) {
      if (document.querySelector('#overlay-' + id))
        document.querySelector('#overlay-' + id)?.remove();
      else this.entryElement.lastChild?.remove();
      if (this.entryElement.children.length == 0) Overlay.close();
      this.update((portals) => {
        if (id == this.entryElement.children.length.toString()) {
          return portals.slice(0, portals.length - 1);
        } else {
          return portals.filter((portal) => portal.key !== id);
        }
      });
    } else
      throw Error(
        'No overlay reference found! ¨Please add `<OverlayContainer/>`to your component tree',
      );
  }

  static openTooltip = (
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
    Overlay.open(
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
  };

  static close() {
    if (this.entryElement) {
      this.update();
      try {
        this.entryElement.replaceChildren();
      } catch (e) {
        return;
      }
    } else
      throw Error(
        'No overlay reference found! ¨Please add `<OverlayContainer/>`to your component tree',
      );
  }
}
