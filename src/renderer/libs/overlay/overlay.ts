//import { OverlayItem } from '@components/overlay_container/OverlayContainer';
import { OverlayItem } from '@libs/overlay/OverlayContainer';
import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { OverlayOptions } from '.';
export class Overlay {
  static entryElement: HTMLDivElement;

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
      if (this.entryElement.children.length == 0) this.close();
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

  static close() {
    if (this.entryElement) {
      this.update();
      this.entryElement.replaceChildren();
    } else
      throw Error(
        'No overlay reference found! ¨Please add `<OverlayContainer/>`to your component tree',
      );
  }
}
