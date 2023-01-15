import {
  TABLE_TYPES,
  TEXT_ALIGN_TYPES,
} from '@components/text_editor/slate.types';
import { Editor, Element } from 'slate';

export const isAlignActive = (
  editor: Editor,
  format: typeof TEXT_ALIGN_TYPES[number],
) => {
  const { selection } = editor;
  if (!selection) return false;
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        ((n as Element).align === format ||
          (!n.align &&
            format === 'left' &&
            !TABLE_TYPES.includes(n.type as any))),
    }),
  );
  return !!match;
};
