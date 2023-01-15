import { type Location, Transforms, Editor, Element, NodeEntry } from 'slate';
import { ReactEditor } from 'slate-react';

import { TableNode } from '../nodes';
import { getCurrentNodeEntry } from '@libs/slate_editor/commons/commands';
const getNextSibling = (editor: Editor, node?: NodeEntry) => {
  const currentNode = node ?? getCurrentNodeEntry(editor);
  if (!currentNode) return;

  const [parent] = Editor.parent(editor, currentNode[1]);
  const index = parent.children.findIndex((n) => n === currentNode[0]);
  return parent.children[index + 1];
};
export function insertTable(
  editor: Editor,
  props?: Parameters<typeof TableNode.createTable>[1],
  location: Location | undefined = editor.selection ?? undefined,
) {
  if (!location) {
    return false;
  }
  const node = getCurrentNodeEntry(editor)?.[0];
  const nextSibling = getNextSibling(editor);

  if ((nextSibling as any)?.type === 'dynamic') {
    Transforms.insertNodes(editor, [{ type: 'p', children: [{ text: '' }] }], {
      at: location,
    });
  }
  Transforms.insertNodes(editor, [TableNode.createTable(editor, props)], {
    at: location,
  });
  Transforms.move(editor, { unit: 'line', distance: 1 });
  if (
    !node ||
    (Element.isElement(node) &&
      (node.children.length === 0 ||
        (node.children.length === 1 &&
          'text' in node.children[0] &&
          node.children[0].text === '')))
  ) {
    Transforms.removeNodes(editor, { at: location });
  }

  ReactEditor.focus(editor);

  return true;
}
