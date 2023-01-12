import { Node, Transforms, Path, Editor } from 'slate';

import { TablesEditor } from '../TablesEditor';
import { TableRowElement } from '@components/text_editor/slate-tables/types';
function calculateRowWidth(row: TableRowElement) {
  return row.children.reduce((size, cell) => size + (cell.colspan ?? 1), 0);
}

export function insertMissingCells(editor: Editor, path: Path) {
  const table = Node.get(editor, path);

  if (!editor.isTableNode(table)) {
    return false;
  }

  const maxWidth = Math.max(
    ...table.children.map((node) =>
      editor.isTableRowNode(node) ? calculateRowWidth(node) : 0,
    ),
  );

  for (const [row, rowPath] of Node.children(editor, path)) {
    if (editor.isTableRowNode(row)) {
      const rowSize = calculateRowWidth(row);
      const absentCellsQuantity = maxWidth - rowSize;

      if (absentCellsQuantity > 0) {
        const newCells = [...Array(absentCellsQuantity)].map(() =>
          TablesEditor.createTableCell(editor),
        );

        const lastNodeInRowEntry = Array.from(
          Node.children(editor, rowPath),
        ).at(-1);

        if (lastNodeInRowEntry) {
          const [lastNode, lastNodePath] = lastNodeInRowEntry;

          if (editor.isTableCellNode(lastNode)) {
            Transforms.insertNodes(editor, newCells, {
              at: Path.next(lastNodePath),
            });
            return true;
          }
        }
      }
    }
  }

  return false;
}
