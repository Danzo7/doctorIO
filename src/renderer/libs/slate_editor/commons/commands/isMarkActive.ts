import { TEXT_FORMAT_TYPES } from '@libs/slate_editor/slate.types';
import { Editor } from 'slate';

export const isMarkActive = (
  editor: Editor,
  format: typeof TEXT_FORMAT_TYPES[number],
) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
