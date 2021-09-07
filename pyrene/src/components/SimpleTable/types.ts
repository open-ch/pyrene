export type Row = Record<string, any>;

export interface Action {
  label: string,
  onClick: (row: Row) => void,
}

export interface SimpleTableProps {
  /**
   * Allows the definition of row actions Type: [{ label: [ string ], onClick: [ function ] }, ...]
   */
  actions?: Array<Action>,
  /**
   * Sets the Table columns.
   * Type: [{ accessor: ( string | func ) (required), align: string, cellRenderCallback: func, headerName: string, id: string (required), width: number ]
   */
  columns: Array<{
    accessor: string | ((row: Row, rowIndex: number, columnIndex: number) => string | number),
    align?: string,
    cellRenderCallback?: (row: Row, rowIndex: number, columnIndex: number) => string | JSX.Element | number,
    headerName?: string,
    id: string,
    width?: number,
  }>,
  /**
   * Sets the Table data displayed in the rows. Type: [ JSON ]
   */
  data: Array<Row>,
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading?: boolean,
  /**
   * Called when the user clicks on a row.
   */
  onRowClick?: (row: Row) => void,
  /**
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick?: (row: Row) => void,
}
