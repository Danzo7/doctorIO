import { type Location, Transforms, Editor } from 'slate';
import { ReactEditor } from 'slate-react';

import { Traverse } from '../core';

export function removeTable(
  editor: Editor,
  location: Location | undefined = editor.selection ?? undefined,
) {
  if (!location) {
    return false;
  }

  const traverse = Traverse.create(editor, location);

  if (!traverse) {
    return false;
  }

  const { matrix } = traverse;

  ReactEditor.focus(editor);

  Transforms.removeNodes(editor, { at: matrix.path });

  return true;
}
