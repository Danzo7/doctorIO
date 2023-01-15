import { Editor, Element, Transforms } from 'slate';

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
      // if (editor.children.length < 1) {
      //   const title: Element = {
      //     type: 'p',
      //     children: [{ text: '' }],
      //   };
      //   Transforms.insertNodes(editor, title, { at: path.concat(0) });
      // }

      // if (editor.children.length < 2) {
      //   const paragraph: Element = {
      //     type: 'p',
      //     children: [{ text: '' }],
      //   };
      //   Transforms.insertNodes(editor, paragraph, { at: path.concat(1) });
      // }

      // for (const [child, childPath] of Node.children(editor, path)) {
      //   let type: string;
      //   const slateIndex = childPath[0];
      //   const enforceType = (type) => {
      //     if (SlateElement.isElement(child) && child.type !== type) {
      //       const newProperties: Partial<Element> = { type };
      //       Transforms.setNodes<Element>(editor, newProperties, {
      //         at: childPath,
      //       });
      //     }
      //   };

      //   switch (slateIndex) {
      //     case 0:
      //       type = 'title';
      //       enforceType(type);
      //       break;
      //     case 1:
      //       type = 'paragraph';
      //       enforceType(type);
      //     default:
      //       break;
      //   }
      // }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};
