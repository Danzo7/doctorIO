import { ReactNode } from 'react';
import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';
import {
  TableCellElement,
  TableEditor,
  TableElement,
  TableRowElement,
} from './slate-tables/types';
import { ImageElement } from './slate-image/types';
import { TagElement } from './slate-suggestion/types';
import { DynamicContentElement } from './dynamic_block/types';
import { AttributeElement } from './slate-dynamic-attributes/types';
import { CommonEditor } from './commons/CommonEditor';
import { AddonEditor } from './createEditor';
export * from './slate-dynamic-attributes/types';
export * from './slate-tables/types';
export * from './slate-image/types';
export * from './slate-suggestion/types';
export * from './dynamic_block/types';

export type TableHeader = 'first_row' | 'first_column';

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor &
  TableEditor &
  AddonEditor &
  typeof CommonEditor;
export const EMPTY_SPACE_TYPE = 'empty' as const;
export const BLOCK_TYPE = [
  'p',
  'bq',
  'bl',
  'h1',
  'h2',
  'li',
  'nl',
  'span',
] as const;
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'] as const;
export type ElementCommons = {
  inline?: boolean;
  void?: boolean;
  align?: typeof TEXT_ALIGN_TYPES[number];
};
export type ComponentElement = {
  type: 'react';
  node: ReactNode;
};

export type TextElement = {
  type: typeof BLOCK_TYPE[number] | typeof EMPTY_SPACE_TYPE;
};

export type CustomElement =
  | (
      | ({ children: CustomText[] } & (
          | TagElement
          | TextElement
          | ComponentElement
          | ImageElement
          | DynamicContentElement
          | AttributeElement
        ))
      | TableElement
      | TableRowElement
      | TableCellElement
    ) &
      ElementCommons;
export const TEXT_FORMAT_TYPES = [
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'code',
  'superscript',
  'subscript',
] as const;
export const TEXT_DECORATION_TYPES = ['color', 'fontSize'] as const;
export const TEXT_MARK_TYPES = [
  ...TEXT_FORMAT_TYPES,
  ...TEXT_DECORATION_TYPES,
] as const;
export type FormattedText = {
  text: string;
  fontSize?: number;
  color?: string;
} & {
  [key in typeof TEXT_FORMAT_TYPES[number]]?: boolean;
};
export type CustomText = FormattedText;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
