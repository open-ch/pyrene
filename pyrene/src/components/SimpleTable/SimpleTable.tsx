import React from 'react';
import clsx from 'clsx';
import Loader from '../Loader/Loader';
import SimpleTableActionList from './SimpleTableActionList';
import styles from './simpleTable.module.css';
import { Action, ExtendsRow } from './types';

export interface SimpleTableProps<R> {
  /**
   * Allows the definition of row actions Type: [{ label: [ string ], onClick: [ function ] }, ...]
   */
  actions?: Array<Action<R>>,
  /**
   * Sets the Table columns.
   * Type: [{ accessor: ( string | func ) (required), align: string, cellRenderCallback: func, headerName: string, id: string (required), width: number ]
   */
  columns: Array<{
    accessor: string | ((row: R, rowIndex: number, columnIndex: number) => string | number),
    align?: string,
    cellRenderCallback?: (row: ExtendsRow<R>, rowIndex: number, columnIndex: number) => string | JSX.Element | number,
    headerName?: string,
    id: string,
    width?: number,
  }>,
  /**
   * Sets the Table data displayed in the rows. Type: [ JSON ]
   */
  data: Array<R>,
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading?: boolean,
  /**
   * Called when the user clicks on a row.
   */
  onRowClick?: (row: ExtendsRow<R>) => void,
  /**
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick?: (row: ExtendsRow<R>) => void,
}

/**
 * Simple Tables are used to display tabular data without the overhead of pagination, sorting and filtering.
 */
const SimpleTable = <R extends {}>({
  actions = [],
  columns,
  data,
  loading = false,
  onRowClick,
  onRowDoubleClick,
}: SimpleTableProps<R>) => (
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
                const valueRow: ExtendsRow<R> = row;
                // @ts-ignore
                valueRow.value = typeof column.accessor === 'string' ? row[column.accessor] : column.accessor(row, rowIndex, columnIndex);
                return (
                    <td
                    className={styles.tableCell}
                    style={{ maxWidth: column.width }}
                    key={column.id.concat(Object.values(valueRow).join('-'))}
                  >
                    <div className={styles.tableCellContent} style={{ textAlign: column.align as any }}>
                        {column.cellRenderCallback ? column.cellRenderCallback(valueRow, rowIndex, columnIndex) : valueRow.value}
                      </div>
                  </td>
                );
              })
            }
              {!loading && data.length > 0 && actions && actions.length > 0 && (
            <td
                  className={clsx(styles.tableCell, styles.actionCell)}
                  key={`action-${Object.values(row).join('-')}`}
                >
                  <SimpleTableActionList<R> row={row} actions={actions} />
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

// SimpleTable written without blank, because Storybook crashes otherwise
SimpleTable.displayName = 'SimpleTable';

export default SimpleTable;
