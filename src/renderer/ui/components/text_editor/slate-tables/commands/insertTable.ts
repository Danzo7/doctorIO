import { type Location, Transforms, Editor } from 'slate';
import { ReactEditor } from 'slate-react';

import { TableNode } from '../nodes';

export function insertTable(
  editor: Editor,
  props?: Parameters<typeof TableNode.createTable>[1],
  location: Location | undefined = editor.selection ?? undefined,
) {
  if (!location) {
    return false;
  }

  Transforms.insertNodes(
    editor,
    [
      TableNode.createTable(editor, props),
      { type: 'p', children: [{ text: '' }] },
    ],
    {
      at: location,
    },
  );
  Transforms.move(editor, { unit: 'line', distance: 1 });
  ReactEditor.focus(editor);

  return true;
}
