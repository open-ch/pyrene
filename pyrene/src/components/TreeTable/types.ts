import { CSSProperties } from 'react';

export type CellValue = string | number | boolean;

export type ExtendedRow<R> = R & {
  _getParent: () => string,
  _rowId: string,
  _treeDepth: number,
};

export type RowData<R> = ExtendedRow<R> & {
  children: Array<ExtendedRow<R>>
};

export interface Column<R> {
  accessor: keyof R,
  cellStyle?: CSSProperties,
  headerName?: string,
  headerStyle?: CSSProperties,
  initiallyHidden?: boolean,
  width?: number,
  renderCallback?: (value?: CellValue, rowData?: RowData<R>) => JSX.Element,
}
