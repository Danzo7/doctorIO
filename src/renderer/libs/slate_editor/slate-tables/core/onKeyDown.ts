import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import { type Location, type Point, Editor, Transforms } from 'slate';

import { TablesEditor } from '../TablesEditor';

import { Traverse } from './Traverse';
import { CursorCommands } from './commands';
import { findLeafPoint } from './commands/findLeafPoint';
function onUpPress(editor: Editor): Point | undefined {
  if (!editor.selection) {
    return undefined;
  }

  const traverse = Traverse.create(editor, editor.selection);

  if (!traverse) {
    return undefined;
  }

  const { activeCell, matrix } = traverse;

  const cellStart = Editor.start(editor, activeCell.path);

  const isCursorOnFirstLine = CursorCommands.isCursorOnFirstLine(
    editor,
    cellStart,
    editor.selection.anchor,
  );

  if (isCursorOnFirstLine) {
    if (activeCell.row.isFirst) {
      return Editor.before(editor, matrix.path, { unit: 'block' });
    }

    const { cellAbove } = activeCell;

    if (cellAbove) {
      return findLeafPoint(
        editor,
        {
          path: cellAbove.path,
          offset: 0,
        },
        'lowest',
      );
    }
  }

  return undefined;
}

function onDownPress(editor: Editor): Point | undefined {
  if (!editor.selection) {
    return undefined;
  }

  const traverse = Traverse.create(editor, editor.selection);

  if (!traverse) {
    return undefined;
  }

  const { activeCell, matrix } = traverse;

  const cellEnd = Editor.end(editor, activeCell.path);

  const isCursorOnLastLine = CursorCommands.isCursorOnLastLine(
    editor,
    cellEnd,
    editor.selection.anchor,
  );

  if (isCursorOnLastLine) {
    if (activeCell.row.isLast) {
      return Editor.after(editor, matrix.path, { unit: 'block' });
    }

    const { cellBelow } = activeCell;

    if (cellBelow) {
      return findLeafPoint(
        editor,
        {
          path: cellBelow.path,
          offset: 0,
        },
        'highest',
      );
    }
  }

  return undefined;
}

function onTabPress(editor: Editor): Location | undefined {
  if (!editor.selection) {
    return undefined;
  }

  const traverse = Traverse.create(editor, editor.selection);

  if (!traverse) {
    return undefined;
  }

  const { activeCell } = traverse;

  if (activeCell.row.isLast && activeCell.column.isLast) {
    TablesEditor.insertColumnRight(editor);
    return undefined;
  }

  return activeCell.nextCell?.path;
}

export function onKeyDown(event: KeyboardEvent<Element>, editor: Editor) {
  if (!editor.selection) {
    return;
  }

  let locationToSelect: Location | undefined = undefined;

  if (isHotkey('up', event)) {
    locationToSelect = onUpPress(editor);
  }

  if (isHotkey('down', event)) {
    locationToSelect = onDownPress(editor);
  }

  if (isHotkey('tab', event)) {
    locationToSelect = onTabPress(editor);
    event.preventDefault();
  }

  if (locationToSelect) {
    Transforms.select(editor, locationToSelect);
    event.stopPropagation();
    event.preventDefault();
  }
}
