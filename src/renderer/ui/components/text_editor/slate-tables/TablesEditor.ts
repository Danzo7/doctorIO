import { Editor, Location } from 'slate';

import * as TableCommands from './commands';
import * as TableQueries from './queries';
import { TableCellNode, TableNode, TableRowNode } from './nodes';

export const TablesEditor = {
  ...TableCommands,
  ...TableNode,
  ...TableQueries,
  ...TableRowNode,
  ...TableCellNode,
  ...TableRowNode,
  updateTable: TableNode.update,

  insertColumnLeft(editor: Editor, location?: Location) {
    return TableCommands.insertColumn(editor, 'left', location);
  },

  insertColumnRight(editor: Editor, location?: Location) {
    return TableCommands.insertColumn(editor, 'right', location);
  },

  insertRowAbove(editor: Editor, location?: Location) {
    return TableCommands.insertRow(editor, 'above', location);
  },

  insertRowBelow(editor: Editor, location?: Location) {
    return TableCommands.insertRow(editor, 'bellow', location);
  },

  isTablesEditor(editor: Editor): editor is Editor {
    return 'isTableCellNode' in editor;
  },
};
