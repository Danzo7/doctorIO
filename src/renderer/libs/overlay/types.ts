import { CSSObject } from '@emotion/react';
import { OptionsGeneric, Modifier } from '@popperjs/core';
import { ReactNode } from 'react';
export type Position = {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
};
export type PopperTargetType = {
  target: HTMLElement;
  options: Partial<OptionsGeneric<Partial<Modifier<any, any>>>>;
};
export interface OverlayOptions {
  isDimmed?: boolean;
  clickThrough?: boolean;
  backdropColor?: string | false;
  closeOnClickOutside?: boolean;
  position?: Position;
  closeOnBlur?: boolean;
  onClose?: () => void;
  width?: number | string;
  height?: number | string;
  style?: CSSObject;
  popperTarget?: HTMLElement | PopperTargetType;
  closeMethod?: () => void;
  defaultCloseFallback?: boolean;
  closeBtn?:
    | 'inner'
    | 'outer'
    | 'above'
    | {
        placement: 'inner' | 'outer' | 'above';
        component: ReactNode;
      };
  transition?:
    | 'zoom'
    | 'appear-right'
    | 'appear-left'
    | 'appear-top'
    | 'appear-bottom'
    | 'none';
  autoFocus?: boolean;
  clickable?: boolean;
  closable?: boolean;
  type?: 'modal' | 'tooltip';
}
