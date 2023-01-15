/* eslint-disable @typescript-eslint/no-namespace */
import type { Location } from 'slate';
import { Editor, Transforms } from 'slate';

import { Traverse } from '../core';

import { TableRowNode } from './TableRowNode';
import { TableElement } from '../types';

export type TableHeader = 'first_row' | 'first_column';

export const TableNode = {
  createTable(
    editor: Editor,
    props?: Partial<Omit<TableElement, 'children'>> & {
      rowsCount?: number;
      columnsCount?: number;
    },
  ): TableElement {
    const { rowsCount = 2, columnsCount = 2, ...rest } = props ?? {};
    const rows = Array.from(Array(rowsCount)).map(() =>
      TableRowNode.createTableRow(editor, { children: columnsCount }),
    );
    return editor.createTableNode({
      ...rest,
      children: rows as any,
    });
  },

  update(
    editor: Editor,
    props: Partial<Omit<TableElement, 'children'>>,
    location: Location | undefined = editor.selection ?? undefined,
  ) {
    Transforms.setNodes<TableElement>(editor, props, {
      at: location,
      match: (node) => editor.isTableNode(node),
    });
  },
  toggleTableHeader(
    editor: Editor,
    headerType: TableHeader,
    location: Location | undefined = editor.selection ?? undefined,
  ) {
    if (!location) {
      return undefined;
    }

    const traverse = Traverse.create(editor, location);

    if (!traverse) {
      return undefined;
    }

    const isAlreadyEnabled = traverse.matrix.node.header?.includes(headerType);
    const newHeader = isAlreadyEnabled
      ? traverse.matrix.node.header?.filter(
          (h: TableHeader) => h !== headerType,
        )
      : [...(traverse.matrix.node.header ?? []), headerType];

    Transforms.setNodes<TableElement>(
      editor,
      { header: newHeader },
      {
        at: location,
        match: (n) => n === traverse.matrix.node,
      },
    );

    // When we mark text in cell as bold and then mark the first row as header the normalization is not called
    // and bold mark still present in cell content
    Editor.normalize(editor, { force: true });

    return newHeader;
  },
};
