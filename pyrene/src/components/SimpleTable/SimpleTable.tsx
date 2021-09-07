/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/require-default-props */
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import Loader from '../Loader/Loader';
import SimpleTableActionList from './SimpleTableActionList';
import styles from './simpleTable.css';

type Row = Record<string, any>;

export interface SimpleTableProps {
  /**
   * Allows the definition of row actions Type: [{ label: [ string ], onClick: [ function ] }, ...]
   */
  actions?: Array<{
    label: string,
    onClick: (row: Row) => void,
  }>,
  /**
   * Sets the Table columns.
   * Type: [{ accessor: ( string | func ) (required), align: string, cellRenderCallback: func, headerName: string, id: string (required), width: number ]
   */
  columns: Array<{
    accessor: string | ((row: Row, rowIndex: number, columnIndex: number) => string),
    align?: string,
    cellRenderCallback?: (row: Row, rowIndex: number, columnIndex: number) => string | JSX.Element,
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

/**
 * Simple Tables are used to display tabular data without the overhead of pagination, sorting and filtering.
 */
const SimpleTable: FunctionComponent<SimpleTableProps> = ({
  actions = [],
  columns,
  data,
  loading = false,
  onRowClick,
  onRowDoubleClick,
}: SimpleTableProps) => (
  <div className={styles.container}>
    <table className={styles.table}>
      {columns.some((column) => typeof column.headerName !== 'undefined' && column.headerName !== '')
        && (
          <thead className={styles.tableHeader}>
            <tr className={styles.tableHeaderRow}>
              {columns.map((column) => (
                <th
                  className={styles.tableHeaderCell}
                  style={{ maxWidth: column && column.width && column.width > 0 ? `${column.width}px` : undefined }}
                  key={column.id}
                >
                  <div className={styles.tableCellContent} style={{ textAlign: column.align as any }}>
                    {column.headerName}
                  </div>
                </th>
              ))}
              {actions.length > 0 && (
                <th
                  aria-label="Action"
                  className={clsx(styles.tableHeaderCell, styles.actionCell)}
                  key="action"
                />
              )}
            </tr>
          </thead>
        )}
      <tbody className={styles.tableBody}>
        {!loading && data.map((row, rowIndex) => (
          <tr
            className={clsx(styles.tableRow, { [styles.tableRowWithFunction]: onRowClick || onRowDoubleClick })}
            key={Object.values(row).join()}
            onDoubleClick={() => (onRowDoubleClick ? onRowDoubleClick(row) : null)}
            onClick={() => (onRowClick ? onRowClick(row) : null)}
          >
            {columns.map((column, columnIndex) => {
              const valueRow = row;
              valueRow.value = typeof column.accessor === 'string' ? row[column.accessor] : column.accessor(row, rowIndex, columnIndex);
              return (
                <td
                  className={styles.tableCell}
                  style={{ maxWidth: column.width }}
                  key={column.id.concat(Object.values(valueRow).join('-'))}
                >
                  <div className={styles.tableCellContent} style={{ textAlign: column.align as any }}>
                    {(column?.cellRenderCallback?.(valueRow, rowIndex, columnIndex) || valueRow.value) as React.ReactNode}
                  </div>
                </td>
              );
            })}
            {!loading && data && data.length > 0 && actions && actions.length > 0 && (
              <td
                className={clsx(styles.tableCell, styles.actionCell)}
                key={`action-${Object.values(row).join('-')}`}
              >
                <SimpleTableActionList
                  row={{
                    ...row,
                    key: (row && row.key && row.key.toString && row.key.toString()) || '',
                  }}
                  actions={actions}
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    {loading && (
      <div className={styles.loader}>
        <Loader type="inline" />
      </div>
    )}
    {!loading && (!data || !(data.length > 0)) && (
      <div className={styles.noData}>
        No data found.
      </div>
    )}
  </div>
);

SimpleTable.displayName = 'Simple Table';

export default SimpleTable;
