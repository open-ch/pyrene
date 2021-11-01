import { CSSProperties } from 'react';

export type CellValue = string | number | boolean;

export type ExtendedRow<R> = R & {
  _getParent: () => ExtendedRow<R>,
  _rowId: string,
  _treeDepth: number,
  children?: Array<ExtendedRow<R>>
};

export interface Column<R> {
  accessor: keyof R,
  cellStyle?: CSSProperties,
  headerName?: string,
  hidden?: boolean,
  headerStyle?: CSSProperties,
  initiallyHidden?: boolean,
  width?: number,
  renderCallback?: (value?: CellValue, rowData?: ExtendedRow<R>) => JSX.Element,
}
