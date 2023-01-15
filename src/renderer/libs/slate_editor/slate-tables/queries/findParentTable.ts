import { type Location, type NodeEntry, type Selection, Editor } from 'slate';
import { TableElement } from '../types';

export function findParentTable<T extends TableElement>(
  editor: Editor,
  location: Location | Selection = editor.selection,
): NodeEntry<T> | undefined {
  if (!location) {
    return undefined;
  }
  for (const entry of Editor.levels(editor, { at: location })) {
    if (editor.isTableNode(entry[0])) {
      return entry as NodeEntry<T>;
    }
  }

  return undefined;
}
