import { ReactNode } from 'react';
import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
export const EMPTY_SPACE_TYPE = 'empty' as const;
export const BLOCK_TYPE = ['p', 'bq', 'bl', 'h1', 'h2', 'li', 'nl'] as const;
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'] as const;
export const TABLE_TYPES = ['table', 'tr', 'td'] as const;
export type TableElement = {
  type: typeof TABLE_TYPES[number];
  children: TableRowElement[];
};
export type TableRowElement = {
  type: 'tr';
  children: TableCellElement[];
};
export type TableCellElement = {
  type: 'td';
  children: CustomElement[];
};
export type ComponentElement = {
  type: 'react';
  node: ReactNode;
};
export type TagElement = {
  type: 'tag';
  tag: string;
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
        ))
      | TableElement
      | TableRowElement
      | TableCellElement
    ) & {
      inline?: boolean;
      void?: boolean;
      align?: typeof TEXT_ALIGN_TYPES[number];
    };
export const TEXT_FORMAT_TYPES = [
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'code',
  'superscript',
  'subscript',
] as const;

export type FormattedText = { text: string; fontSize?: number } & {
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
