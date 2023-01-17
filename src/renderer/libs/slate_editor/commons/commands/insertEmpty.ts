import { Editor, Transforms } from 'slate';

export const insertEmpty = (editor: Editor) => {
  const { selection } = editor;
  const [previousLeaf] = selection ? Editor.leaf(editor, selection) : [];
  Transforms.insertNodes(editor, [
    {
      type: 'span',
      children: [{ ...previousLeaf, text: '' }],
      inline: true,
    },
  ]);
};
