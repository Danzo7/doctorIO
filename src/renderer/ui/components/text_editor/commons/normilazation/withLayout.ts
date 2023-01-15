import { Editor, Element, Transforms } from 'slate';
import { withUserFriendlyDeleteBehavior } from '../plugins';

export const withLayout = (editor: Editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      const lastChild = editor.children[editor.children.length - 1];
      if (
        lastChild &&
        Element.isElement(lastChild) &&
        lastChild.type === 'table'
      ) {
        const paragraph: Element = {
          type: 'p',
          children: [{ text: '' }],
        };
        Transforms.insertNodes(editor, paragraph, {
          at: path.concat(editor.children.length),
        });
      }
    }

    return normalizeNode([node, path]);
  };

  return withUserFriendlyDeleteBehavior(editor);
};
