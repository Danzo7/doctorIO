//import { OverlayItem } from '@components/overlay_container/OverlayContainer';
import { OverlayItem } from '@libs/overlay/OverlayContainer';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { OverlayOptions } from '.';
export class Overlay {
  static entryElement: HTMLDivElement;

  static update: (portal?: React.ReactPortal) => void;

  static portals: { portal: React.ReactPortal; id?: string }[];

  static removePortal: (portal?: React.ReactPortal) => void;

  static setRenderer(ref: HTMLDivElement) {
    this.portals = [];
    this.entryElement = ref;
  }

  static open(target: ReactNode, props: OverlayOptions) {
    if (this.entryElement) {
      this.entryElement.replaceChildren();
      const el = document.createElement('div');
      this.entryElement.appendChild(el);
      this.update(
        createPortal(OverlayItem({ children: target, ...props }), el),
      );
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
      this.portals.push({
        portal: createPortal(
          OverlayItem({ children: target, ...props }),
          layer,
        ),
        id: id,
      });
      this.update(this.portals[this.portals.length - 1].portal);
    } else
      throw Error(
        'No overlay reference found! ¨Please add `<OverlayContainer/>`to your component tree',
      );
  }

  static pop(id = this.entryElement.children.length.toString()) {
    if (this.entryElement) {
      if (id == this.entryElement.children.length.toString()) {
        this.removePortal(this.portals.pop()?.portal);
      } else {
        const target = this.portals.filter((portal) => portal.id == id);
        if (target.length == 1) this.removePortal(target[0].portal);
      }
      if (document.querySelector('#overlay-' + id))
        document.querySelector('#overlay-' + id)?.remove();
      else this.entryElement.lastChild?.remove();
      if (this.entryElement.children.length == 0) this.close();
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
