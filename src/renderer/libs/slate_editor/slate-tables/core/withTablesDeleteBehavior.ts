import type { Location } from 'slate';
import { Editor, Range, Point } from 'slate';
function canDeleteInTableCell<T extends Editor>(
  editor: T,
  getEdgePoint: (editor: Editor, at: Location) => Point,
) {
  if (editor.selection && Range.isCollapsed(editor.selection)) {
    const [cell] = Editor.nodes(editor, {
      match: editor.isTableCellNode,
    });

    if (cell) {
      const [, cellPath] = cell;
      const edge = getEdgePoint(editor, cellPath);

      if (Point.equals(editor.selection.anchor, edge)) {
        return false;
      }
    }
  }

  return true;
}

export function withTablesDeleteBehavior<T extends Editor>(editor: T): T {
  const { deleteBackward, deleteForward } = editor;

  editor.deleteBackward = (unit) => {
    if (canDeleteInTableCell(editor, Editor.start)) {
      deleteBackward(unit);
    }
  };

  editor.deleteForward = (unit) => {
    if (canDeleteInTableCell(editor, Editor.end)) {
      deleteForward(unit);
    }
  };

  return editor;
}
