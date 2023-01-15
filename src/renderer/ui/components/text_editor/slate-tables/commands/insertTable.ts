import { type Location, Transforms, Editor, Element } from 'slate';
import { ReactEditor } from 'slate-react';

import { TableNode } from '../nodes';
import { getCurrentNodeEntry } from '@components/text_editor/commons/commands/getCurrentNodeEntry';

export function insertTable(
  editor: Editor,
  props?: Parameters<typeof TableNode.createTable>[1],
  location: Location | undefined = editor.selection ?? undefined,
) {
  if (!location) {
    return false;
  }
  const node = getCurrentNodeEntry(editor)?.[0];

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
  )
    Transforms.removeNodes(editor, { at: location });

  ReactEditor.focus(editor);

  return true;
}
