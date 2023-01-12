import { Editor, Node, Transforms } from 'slate';
import type { Path } from 'slate';

export function removeEmptyRows(editor: Editor, path: Path) {
  const table = Node.get(editor, path);

  if (!editor.isTableNode(table)) {
    return false;
  }

  for (const [row, rowPath] of Node.children(editor, path)) {
    if (editor.isTableRowNode(row) && row.children.length == 0) {
      Transforms.removeNodes(editor, { at: rowPath, match: (n) => n === row });
      return true;
    }
  }

  return false;
}
