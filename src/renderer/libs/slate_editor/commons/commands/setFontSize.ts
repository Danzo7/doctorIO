import { Editor } from 'slate';

export const setFontSize = (
  editor: Editor,
  action: 'increase' | 'decrease',
) => {
  const current = Editor.marks(editor)?.fontSize ?? 12;
  let newVal = current;
  if (action === 'decrease' && current >= 8) {
    newVal = current - 1;
  } else if (action === 'increase' && current <= 128) {
    newVal = current + 1;
  }
  Editor.addMark(editor, 'fontSize', newVal);
};
