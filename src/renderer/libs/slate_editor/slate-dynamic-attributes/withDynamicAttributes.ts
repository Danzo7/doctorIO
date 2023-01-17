import { Editor } from 'slate';

export const withDynamicAttributes = (editor: Editor) => {
  const { isInline, isVoid, markableVoid } = editor;
  editor.isInline = (element) => {
    return element.inline ?? isInline(element);
  };

  editor.isVoid = (element) => {
    return element.void ?? isVoid(element);
  };

  editor.markableVoid = (element) => {
    return element.inline ?? markableVoid(element);
  };

  return editor;
};
