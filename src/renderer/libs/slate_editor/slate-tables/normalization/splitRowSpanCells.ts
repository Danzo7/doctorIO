import { Path, Node, Transforms, Editor } from 'slate';

import { TablesEditor } from '../TablesEditor';
import { Logger } from '@libs/Logger';
import { TableCellElement } from '../types';

export function splitRowSpanCells(editor: Editor, path: Path) {
  const node = Node.get(editor, path);

  if (!editor.isTableNode(node)) {
    return false;
  }

  for (const [row, rowPath] of Node.children(editor, path)) {
    if (!editor.isTableRowNode(row)) {
      continue;
    }

    for (const [cell, cellPath] of Node.children(editor, rowPath)) {
      if (editor.isTableCellNode(cell) && cell.rowspan && cell.rowspan > 1) {
        const currentCellRelativePath = Path.relative(cellPath, rowPath);
        const padCells = [...Array(cell.rowspan - 1)].map(() =>
          TablesEditor.createTableCell(editor),
        );

        Editor.withoutNormalizing(editor, () => {
          Transforms.unsetNodes<TableCellElement>(editor, 'rowspan', {
            at: cellPath,
          });
          let nextRow = Path.next(rowPath);

          for (const padCell of padCells) {
            const at = [...nextRow, ...currentCellRelativePath];

            if (Editor.hasPath(editor, at)) {
              Transforms.insertNodes(editor, padCell, { at });
            } else {
              Logger.error(
                'Table error',
                `Can't find path to insert pad cell when split row spans at:`,
                at,
              );
            }

            nextRow = Path.next(nextRow);
          }
        });

        return true;
      }
    }
  }

  return false;
}
