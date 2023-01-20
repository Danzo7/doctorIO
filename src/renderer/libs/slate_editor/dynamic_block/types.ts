import { CustomElement, CustomText } from '../slate.types';

export type DynamicContentElement = {
  type: 'dynamic';
  height?: number;
  replace?: boolean;
  children: (CustomElement | CustomText)[];
};
