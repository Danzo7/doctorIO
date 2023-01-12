import { type Location, type NodeEntry, type Selection, Editor } from 'slate';

import { TableCellElement } from '@components/text_editor/slate-tables/types';

export function findParentCell<T extends TableCellElement>(
  editor: Editor,
  location: Location | Selection = editor.selection,
): NodeEntry<T> | undefined {
  if (!location) return undefined;
  for (const entry of Editor.levels(editor, { at: location })) {
    if (editor.isTableCellNode(entry[0])) {
      return entry as NodeEntry<T>;
    }
  }

  return undefined;
}
