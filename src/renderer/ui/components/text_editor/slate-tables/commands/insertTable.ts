import { type Location, Transforms, Editor } from 'slate';
import { ReactEditor } from 'slate-react';

import { TableNode } from '../nodes';
import { isTextNode } from '@components/text_editor/helper';

export function insertTable(
  editor: Editor,
  props?: Parameters<typeof TableNode.createTable>[1],
  location: Location | undefined = editor.selection ?? undefined,
) {
  if (!location) {
    return false;
  }

  Transforms.insertNodes(editor, [TableNode.createTable(editor, props)], {
    at: location,
  });
  Transforms.move(editor, { unit: 'line', distance: 1 });
  if (
    editor.children.length > 1 &&
    isTextNode(editor.children[0]) &&
    editor.children[0].children[0].text === ''
  )
    Transforms.moveNodes(editor, { at: location, to: [1] });
  else {
    Transforms.insertNodes(editor, [{ type: 'p', children: [{ text: '' }] }]);
  }
  ReactEditor.focus(editor);

  return true;
}
