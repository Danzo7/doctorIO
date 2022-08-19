import {
  OverlayContainer,
  OverlayItem,
  PortalContainer,
} from './OverlayContainer';
import type { OverlayOptions } from './OverlayContainer';
import { Overlay } from './overlay';
export {
  OverlayContainer,
  OverlayItem,
  Overlay,
  OverlayOptions,
  PortalContainer,
};
export const DEFAULT_MODAL: OverlayOptions = {
  width: '30%',
  closeOnClickOutside: true,
  isDimmed: true,
  clickThrough: false,
  closeBtn: 'inner',
};
export const FIT_MODAL: OverlayOptions = {
  closeOnClickOutside: true,
  isDimmed: true,
  clickThrough: false,
  closeBtn: 'inner',
};
