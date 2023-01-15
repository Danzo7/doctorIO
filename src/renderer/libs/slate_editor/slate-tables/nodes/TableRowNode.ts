/* eslint-disable @typescript-eslint/no-namespace */
import type { Editor, Location } from 'slate';
import { Transforms } from 'slate';

import { TableCellNode } from './TableCellNode';
import { TableRowElement } from '../types';

export const TableRowNode = {
  createTableRow(
    editor: Editor,
    props?: Partial<
      Omit<TableRowElement, 'children'> & {
        children: TableRowElement[] | number;
      }
    >,
  ): TableRowElement {
    const { children, ...rest } = props ?? {};
    return editor.createTableRowNode({
      ...rest,
      children: (typeof children === 'number'
        ? Array.from(Array(children)).map(() =>
            TableCellNode.createTableCell(editor),
          )
        : children ?? []) as any,
    });
  },

  update(
    editor: Editor,
    props: Partial<Omit<TableRowElement, 'children'>>,
    location: Location,
  ) {
    Transforms.setNodes<TableRowElement>(editor, props, {
      at: location,
      match: (node) => editor.isTableRowNode(node),
    });
  },
};
