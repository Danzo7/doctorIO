import { OverlayItem } from './OverlayItem';
import { color } from '@assets/styles/color';
import type { OverlayOptions } from './types';
import { Portal } from './Portal';
export { modal, toast, tooltip, alt } from './stores';
export { OverlayItem, OverlayOptions, Portal };

export const DEFAULT_MODAL: OverlayOptions = {
  width: '30%',
  closeOnClickOutside: true,
  isDimmed: true,
  clickThrough: false,
  closeBtn: 'inner',
  style: { minWidth: '20%', minHeight: '10%' },
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
  style: { minWidth: '20%', minHeight: '10%' },
};
