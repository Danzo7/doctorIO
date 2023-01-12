import type { NodeEntry } from 'slate';

import type { GridWithSpansRow } from './createGridWithSpans';
import type { Matrix } from './Matrix';
import type { MatrixCell } from './MatrixCell';
import { TableRowElement } from '@components/text_editor/slate-tables/types';

export class MatrixRow {
  public readonly node: NodeEntry<TableRowElement>[0];

  public readonly path: NodeEntry<TableRowElement>[1];

  public readonly cells: MatrixCell[];

  private readonly y: number;

  private readonly matrix: Matrix;

  constructor(
    gridRow: GridWithSpansRow,
    y: number,
    matrix: Matrix,
    cells: MatrixCell[],
  ) {
    this.node = gridRow.entry[0];
    this.path = gridRow.entry[1];
    this.y = y;
    this.matrix = matrix;
    this.cells = cells;
  }

  get rowAbove() {
    return this.matrix.rows[this.y - 1];
  }

  get rowBelow() {
    return this.matrix.rows[this.y + 1];
  }

  get isFirst() {
    return this.rowAbove === undefined;
  }

  get isLast() {
    return this.rowBelow === undefined;
  }
}
