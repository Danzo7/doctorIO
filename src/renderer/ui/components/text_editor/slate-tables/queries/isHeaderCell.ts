import { Editor, Location, Node } from 'slate';

import {
  TableCellElement,
  TableElement,
} from '@components/text_editor/slate-tables/types';
function findTableAndCellNodes(
  editorOrTable: Editor | TableElement,
  locationOrCell?: (Location | null) | TableCellElement,
) {
  let tableNode: TableElement | undefined;
  let cellNode: TableCellElement | undefined;

  const isEditor = Editor.isEditor(editorOrTable);
  const isLocation = Location.isLocation(locationOrCell);

  if (isEditor || isLocation || locationOrCell === null) {
    if (isEditor) {
      const editor = editorOrTable;
      const location = locationOrCell ?? editor.selection;

      if (Location.isLocation(location)) {
        for (const [currentNodeToCheck] of Node.levels(
          editor,
          Editor.path(editor, location),
        )) {
          if (editor.isTableNode(currentNodeToCheck)) {
            tableNode = currentNodeToCheck;
          }

          if (editor.isTableCellNode(currentNodeToCheck)) {
            cellNode = currentNodeToCheck;
          }

          if (tableNode && cellNode) {
            break;
          }
        }
      }
    }
  } else {
    tableNode = editorOrTable;
    cellNode = locationOrCell;
  }

  return { tableNode, cellNode };
}

function isFirstRow(table: TableElement, cell: TableCellElement): boolean {
  return table.children[0]?.children.includes(cell);
}

function isFirstColumn(table: TableElement, cell: TableCellElement): boolean {
  return table.children.some((row) => row.children[0] === cell);
}
export function isHeaderCell(
  editor: Editor,
  location?: Location | null,
): boolean;
export function isHeaderCell(
  table: TableElement,
  cell: TableCellElement,
): boolean;
export function isHeaderCell(
  editorOrTable: Editor | TableElement,
  locationOrCell?: (Location | null) | TableCellElement,
) {
  const { tableNode, cellNode } = findTableAndCellNodes(
    editorOrTable,
    locationOrCell,
  );

  if (tableNode && cellNode) {
    return (
      (tableNode.header?.includes('first_row') &&
        isFirstRow(tableNode, cellNode)) ||
      (tableNode.header?.includes('first_column') &&
        isFirstColumn(tableNode, cellNode))
    );
  }

  return false;
}
