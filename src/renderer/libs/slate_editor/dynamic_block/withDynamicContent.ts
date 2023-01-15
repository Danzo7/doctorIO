import { Transforms, Editor, Element } from 'slate';
import { ReactEditor } from 'slate-react';

export const withDynamicContent = (editor: Editor) => {
  const { deleteForward, normalizeNode, deleteBackward } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      const lastChild = editor.children[editor.children.length - 1];
      const firstChild = editor.children[0];
      if (
        firstChild &&
        Element.isElement(firstChild) &&
        firstChild.type === 'dynamic'
      ) {
        const paragraph: Element = {
          type: 'p',
          children: [{ text: '' }],
        };
        Transforms.insertNodes(editor, paragraph, {
          at: path.concat(0),
        });
      }
      if (
        lastChild &&
        Element.isElement(lastChild) &&
        lastChild.type === 'dynamic'
      ) {
        const paragraph: Element = {
          type: 'p',
          children: [{ text: '' }],
        };
        Transforms.insertNodes(editor, paragraph, {
          at: path.concat(editor.children.length),
        });
      }
      //if no dynamic node, add one
      if (
        !editor.children.some(
          (child) => Element.isElement(child) && child.type === 'dynamic',
        )
      ) {
        const dynamic: Element = {
          type: 'dynamic',
          children: [{ text: '' }],
        };
        Transforms.insertNodes(editor, dynamic, {
          at: path.concat(editor.children.length),
        });
      }
    }

    return normalizeNode([node, path]);
  };

  editor.deleteForward = (unit) => {
    const [frontmatter] = Editor.nodes(editor, {
      match: (node) =>
        !Editor.isEditor(node) &&
        Element.isElement(node) &&
        node.type === 'dynamic',
    });

    if (
      !!frontmatter &&
      Element.isElement(frontmatter[0]) &&
      Editor.isEmpty(editor, frontmatter[0])
    ) {
      return;
    }
    deleteForward(unit);
  };
  editor.deleteBackward = (unit) => {
    const [frontmatter] = Editor.nodes(editor, {
      match: (node) =>
        !Editor.isEditor(node) &&
        Element.isElement(node) &&
        node.type === 'dynamic',
    });

    if (
      !!frontmatter &&
      Element.isElement(frontmatter[0])
      //    &&
      //   Editor.isEmpty(editor, frontmatter[0])
    ) {
      Transforms.move(editor, { unit: 'line', distance: 1 });
      ReactEditor.focus(editor);
      return;
    }
    deleteBackward(unit);
  };
  return editor;
};
