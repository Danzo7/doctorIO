import { Editor } from 'slate';

export const getFontSize = (editor: Editor) => {
  return Editor.marks(editor)?.fontSize ?? 12;
};
