import { Editor, Element, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

export const insertAttribute = (
  editor: Editor,
  value: { reference: string; text: string; color?: string },
) => {
  const { selection } = editor;
  const [previousLeaf] = selection ? Editor.leaf(editor, selection) : [{}];

  const element: Element = {
    type: 'attribute',
    reference: value.reference,
    color: value.color,
    children: [{ ...previousLeaf, text: value.text }],
    inline: true,
    void: true,
  };
  editor.insertText(' ');
  Transforms.insertNodes(editor, [element], {});
  Transforms.move(editor);
  if (selection) editor.recoverMarks(selection);
  editor.insertText(' ');
  ReactEditor.focus(editor);
};
