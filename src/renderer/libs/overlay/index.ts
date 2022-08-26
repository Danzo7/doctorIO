import {
  OverlayContainer,
  OverlayItem,
  PortalContainer,
} from './OverlayContainer';
import type { OverlayOptions } from './OverlayContainer';
import { Overlay } from './overlay';
import { color } from '@assets/styles/color';
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
export const STOP_MODAL: OverlayOptions = {
  width: '30%',
  clickThrough: false,
  backdropColor: color.good_black,
  isDimmed: true,
};
export const FIT_MODAL: OverlayOptions = {
  closeOnClickOutside: true,
  isDimmed: true,
  clickThrough: false,
  closeBtn: 'inner',
};
