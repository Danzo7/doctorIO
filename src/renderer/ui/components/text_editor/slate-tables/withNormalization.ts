import { Editor } from 'slate';
import * as normalization from './normalization';

const normalizers = [
  normalization.removeEmptyRows,
  normalization.splitRowSpanCells,
  normalization.splitColSpanCells,
  normalization.insertMissingCells,
];

export function withNormalization(editor: Editor) {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [, path] = entry;

    for (const normalize of normalizers) {
      const changed = normalize(editor, path);

      if (changed) {
        return;
      }
    }

    normalizeNode(entry);
  };

  return editor;
}
