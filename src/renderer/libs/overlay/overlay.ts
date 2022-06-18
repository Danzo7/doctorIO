//import { OverlayItem } from '@components/overlay_container/OverlayContainer';
import { OverlayItem } from '@libs/overlay/OverlayContainer';
import { ReactNode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { OverlayOptions } from '.';
export class Overlay {
  private static _root?: Root;

  static entryElement: HTMLDivElement;

  static setRenderer(ref: HTMLDivElement) {
    this.entryElement = ref;
  }

  static killRoot = () => {
    this._root?.unmount();
    this._root = undefined;
  };

  static open(target: ReactNode, props: OverlayOptions) {
    if (this.entryElement) {
      this.killRoot();
      const el = document.createElement('div');
      this.entryElement.appendChild(el);
      this._root = createRoot(el);
      this._root.render(OverlayItem({ children: target, ...props }));
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
      this._root = createRoot(layer);
      this._root.render(OverlayItem({ children: target, ...props }));
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
    } else
      throw Error(
        'No overlay reference found! ¨Please add `<OverlayContainer/>`to your component tree',
      );
  }

  static close() {
    if (this.entryElement) {
      this.entryElement.replaceChildren();
      this.killRoot();
    } else
      throw Error(
        'No overlay reference found! ¨Please add `<OverlayContainer/>`to your component tree',
      );
  }
}
