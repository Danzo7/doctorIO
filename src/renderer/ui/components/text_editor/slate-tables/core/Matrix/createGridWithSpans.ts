import type { Editor, NodeEntry } from 'slate';
import { Node } from 'slate';

import { TableCellNode } from '../../nodes';
import {
  TableCellElement,
  TableElement,
  TableRowElement,
} from '@components/text_editor/slate-tables/types';

export interface GridWithSpansRow {
  entry: NodeEntry<TableRowElement>;
  cells: GridWithSpansCell[];
}

export interface GridWithSpansCell {
  entry: NodeEntry<TableCellElement>;
  isVirtual: boolean;
}

export function createGridWithSpans(
  editor: Editor,
  [, tablePath]: NodeEntry<TableElement>,
) {
  const grid: GridWithSpansRow[] = [];

  const rows = Array.from(Node.children(editor, tablePath));
  let rowIdx = 0;

  rows.forEach(([row, rowPath]) => {
    if (!editor.isTableRowNode(row)) {
      return;
    }

    const cells = Array.from(Node.children(editor, rowPath));
    let colIdx = 0;

    cells.forEach(([cell, cellPath]) => {
      if (!editor.isTableCellNode(cell)) {
        return;
      }

      let colSpanIdx = 0;
      const cellRowspan = TableCellNode.getCellRowspan(cell);

      for (let spanIdx = rowIdx; spanIdx < rowIdx + cellRowspan; spanIdx++) {
        if (!grid[spanIdx]?.cells) {
          grid[spanIdx] = { entry: [row, rowPath], cells: [] };
        }

        const cellColspan = TableCellNode.getCellColspan(cell);

        for (colSpanIdx = 0; colSpanIdx < cellColspan; colSpanIdx++) {
          // Insert cell at first empty position
          let i = 0;

          while (grid[spanIdx]?.cells[colIdx + colSpanIdx + i]) {
            i++;
          }

          const fakeCell = colSpanIdx > 0 || spanIdx !== rowIdx;

          const y = spanIdx;
          const x = colIdx + colSpanIdx + i;

          const matrixCell: GridWithSpansCell = {
            entry: [cell, cellPath],
            isVirtual: fakeCell,
          };

          grid[y].entry = [row, rowPath];
          grid[y].cells[x] = matrixCell;
        }
      }

      colIdx += colSpanIdx;
    });

    rowIdx += 1;
  });

  return grid;
}
