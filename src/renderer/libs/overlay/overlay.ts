//import { OverlayItem } from '@components/overlay_container/OverlayContainer';
import { OverlayItem } from '@libs/overlay/OverlayContainer';
import { ReactNode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { OverlayOptions } from '.';
export class Overlay {
  private static _root?: Root;

  static _ref: HTMLDivElement;

  static setRenderer(ref: HTMLDivElement) {
    this._ref = ref;
  }

  static killRoot = () => {
    this._root?.unmount();
    this._root = undefined;
  };

  static open(target: ReactNode, props: OverlayOptions) {
    if (this._ref) {
      this.killRoot();
      const el = document.createElement('div');
      this._ref.appendChild(el);
      this._root = createRoot(el);
      this._root.render(OverlayItem({ children: target, ...props }));
    } else
      throw Error(
        'You have to setRenderer first. Call seRenderer(Element) on your overlay component.',
      );
  }

  static push(target: ReactNode, props: OverlayOptions) {
    if (this._ref) {
      const layer = document.createElement('div');
      layer.setAttribute('id', 'overlay-' + this._ref.children.length);
      layer.setAttribute(
        'style',
        'z-index:' + 10 + Overlay._ref.children.length,
      );
      this._ref.appendChild(layer);
      this._root = createRoot(layer);
      this._root.render(OverlayItem({ children: target, ...props }));
    } else
      throw Error(
        'You have to setRenderer first. Call seRenderer(Element) on your overlay component.',
      );
  }

  static pop() {
    if (this._ref) {
      this._ref.lastChild?.remove();
      if (this._ref.children.length == 0) this.close();
    } else
      throw Error(
        'You have to setRenderer first. Call seRenderer(Element) on your overlay component.',
      );
  }

  static close() {
    if (this._ref) {
      this._ref.replaceChildren();
      this.killRoot();
    } else
      throw Error(
        'You have to setRenderer first. Call seRenderer(Element) on your overlay component.',
      );
  }
}
