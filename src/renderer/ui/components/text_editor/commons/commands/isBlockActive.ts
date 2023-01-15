import { BLOCK_TYPE } from '@components/text_editor/slate.types';
import { Editor, Element } from 'slate';

export const isBlockActive = (
  editor: Editor,
  format: typeof BLOCK_TYPE[number],
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
    }),
  );

  return !!match;
};
