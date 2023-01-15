import type { Editor, Location } from 'slate';
import { Transforms } from 'slate';
import { TableCellElement } from '../types';

const IMPLIED_COLSPAN = 1;
const IMPLIED_ROWSPAN = 1;

export const TableCellNode = {
  createTableCell(
    editor: Editor,
    props?: Partial<TableCellElement>,
  ): TableCellElement {
    const { children, ...rest } = props ?? {};
    return editor.createTableCellNode({
      ...rest,
      children: children ?? ([editor.createContentNode()] as any),
    });
  },

  getCellColspan(cell: TableCellElement | undefined) {
    return cell?.colspan ?? IMPLIED_COLSPAN;
  },

  getCellRowspan(cell: TableCellElement | undefined) {
    return cell?.rowspan ?? IMPLIED_ROWSPAN;
  },

  calculateCellRowSpan(
    cell: TableCellElement | undefined,
    action: '+' | '-',
    amount: number,
  ) {
    const currentRowSpan = this.getCellRowspan(cell);
    const newRowSpan =
      action === '+' ? currentRowSpan + amount : currentRowSpan - amount;

    if (newRowSpan < 1) {
      return this.getCellRowspan(undefined);
    }

    return newRowSpan;
  },

  calculateCellColSpan(
    cell: TableCellElement | undefined,
    action: '+' | '-',
    amount: number,
  ) {
    const currentColSpan = this.getCellColspan(cell);
    const newColSPan =
      action === '+' ? currentColSpan + amount : currentColSpan - amount;

    if (newColSPan < 1) {
      return this.getCellColspan(undefined);
    }

    return newColSPan;
  },

  update(
    editor: Editor,
    props: Partial<Omit<TableCellElement, 'children'>>,
    location: Location,
  ) {
    Transforms.setNodes<TableCellElement>(editor, props, {
      at: location,
      match: (node) => editor.isTableCellNode(node),
    });
  },
};
