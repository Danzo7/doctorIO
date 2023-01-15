/* eslint-disable no-param-reassign */
import { Editor, Range, Transforms } from 'slate';

export const insertEmptyParagraph = (editor: Editor) => {
  Transforms.insertNodes(editor, {
    type: 'p',
    children: [{ text: '' }],
  });
};
export function withBreaksOnExpandedSelection<T extends Editor>(editor: T): T {
  const { insertBreak } = editor;

  editor.insertBreak = () => {
    if (editor.selection && Range.isExpanded(editor.selection)) {
      const nodes = Array.from(
        Editor.nodes(editor, {
          at: editor.selection,
          match: (node) => Editor.isBlock(editor, node),
          mode: 'highest',
          voids: true,
        }),
      );

      const pathRefs = nodes.map(([, path]) => Editor.pathRef(editor, path));
      pathRefs.forEach((pathRef) => {
        const path = pathRef.unref();
        if (path) {
          Transforms.removeNodes(editor, { at: path });
        }
      });

      insertEmptyParagraph(editor);
      insertEmptyParagraph(editor);
      return;
    }

    insertBreak();
  };

  return editor;
}
