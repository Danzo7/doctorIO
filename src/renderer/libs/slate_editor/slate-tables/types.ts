import { CustomElement } from '../slate.types';
import { TableHeader } from './nodes';
import { Node, Text } from 'slate';
export const TABLE_TYPES = ['table', 'tr', 'td'] as const;

export type TableElement = {
  type: 'table';
  children: TableRowElement[];
  border?: boolean;
  header?: TableHeader[];
};
export type TableRowElement = {
  type: 'tr';
  children: TableCellElement[];
};
export type TableCellElement = {
  type: 'td';
  children: CustomElement[];
  rowspan?: number;
  colspan?: number;
};
export interface TableEditor {
  createContentNode: () => Element | Text;
  createTableNode: (props: Partial<TableElement>) => TableElement;
  createTableRowNode: (props: Partial<TableRowElement>) => TableRowElement;
  createTableCellNode: (props: Partial<TableCellElement>) => TableCellElement;
  isTableNode: (node: Node) => node is TableElement;
  isTableRowNode: (node: Node) => node is TableRowElement;
  isTableCellNode: (node: Node) => node is TableCellElement;
}
