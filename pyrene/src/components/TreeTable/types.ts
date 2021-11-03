import { CSSProperties } from 'react';

export type CellValue = string | number | boolean;

export type ExtendedRow<R> = R & {
  _getParent: () => ExtendedRow<R>,
  _rowId: string,
  _treeDepth: number,
  children?: Array<ExtendedRow<R>>
};

export type RowData<R> = ExtendedRow<R>;

export interface Column<R> {
  accessor: keyof R,
  cellStyle?: CSSProperties,
  id?: string,
  headerName?: string,
  hidden?: boolean,
  headerStyle?: CSSProperties,
  initiallyHidden?: boolean,
  width?: number,
  renderCallback?: (value?: CellValue, rowData?: RowData<R>) => JSX.Element,
}
