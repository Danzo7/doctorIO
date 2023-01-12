import { Path, Node, Transforms, Editor } from 'slate';

import { TablesEditor } from '../TablesEditor';
import { TableCellElement } from '@components/text_editor/slate-tables/types';

export function splitColSpanCells(editor: Editor, path: Path) {
  const node = Node.get(editor, path);

  if (!editor.isTableRowNode(node)) {
    return false;
  }

  for (const [cell, cellPath] of Node.children(editor, path)) {
    if (editor.isTableCellNode(cell) && cell.colspan && cell.colspan > 1) {
      const padCells = [...Array(cell.colspan - 1)].map(() =>
        TablesEditor.createTableCell(editor),
      );

      Editor.withoutNormalizing(editor, () => {
        Transforms.unsetNodes<TableCellElement>(editor, 'colspan', {
          at: cellPath,
        });
        Transforms.insertNodes(editor, padCells, { at: Path.next(cellPath) });
      });

      return true;
    }
  }

  return false;
}
