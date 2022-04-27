//import { OverlayItem } from '@components/overlay_container/OverlayContainer';
import { OverlayItem } from '@components/overlay/OverlayContainer';
import { ReactNode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { OverlayOptions } from '.';
import { createPopper } from '@popperjs/core';

export class Overlay {
  private static _root?: Root;

  static _ref: HTMLDivElement;

  static setRenderer(ref: HTMLDivElement) {
    if (!this._root) {
      this._ref = ref;
      this._root = createRoot(ref);
    }
  }

  static showModal(target: ReactNode, props: OverlayOptions) {
    if (this._ref && !this._root) {
      this.setRenderer(this._ref);
    }
    if (this._root) {
      this._root.render(OverlayItem({ children: target, ...props }));
    } else
      throw Error(
        'You have to setRenderer first. Call seRenderer(Element) on your overlay component.',
      );
  }

  static showTooltip(container: HTMLDivElement, ref: HTMLDivElement) {
    if (this._ref && !this._root) {
      this.setRenderer(this._ref);
    }
    if (this._root) {
      createPopper(container, ref, {
        placement: 'top',
      });
    } else
      throw Error(
        'You have to setRenderer first. Call seRenderer(Element) on your overlay component.',
      );
  }

  static closeModal() {
    if (this._root) {
      this._root.unmount();
      this._root = undefined;
    } else
      throw Error(
        'You have to setRenderer first. Call seRenderer(Element) on your overlay component.',
      );
  }
}
