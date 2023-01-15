import { Editor } from 'slate';
import { isMarkActive } from './isMarkActive';
import { TEXT_FORMAT_TYPES } from '@components/text_editor/slate.types';

export const toggleMark = (
  editor: Editor,
  format: typeof TEXT_FORMAT_TYPES[number],
) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
