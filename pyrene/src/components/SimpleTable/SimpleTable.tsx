import React,{ FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Loader from '../Loader/Loader';
import SimpleTableActionList from './SimpleTableActionList';
import styles from './simpleTable.css';

interface SimpleTableProps {
  /**
   * Allows the definition of row actions Type: [{ label: [ string ], onClick: [ function ] }, ...]
   */
  actions?: Array<{
    label: string,
    onClick: () => void,
  }>,
  /**
   * Sets the Table columns.
   * Type: [{ accessor: ( string | func ) (required), align: string, cellRenderCallback: func, headerName: string, id: string (required), width: number ]
   */
  columns: Array<{
    accessor?: string | ((key: string) => string),
    align?: string,
    cellRenderCallback?: (valueRow: unknown, rowIndex: number, columnIndex: number) => void,
    headerName?: string,
    id?: string,
    width?: number,
  }>,
  /**
   * Sets the Table data displayed in the rows. Type: [ JSON ]
   */
  data: Array<any>,
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading?: boolean,
  /**
   * Called when the user clicks on a row.
   */
  onRowClick?: (row: unknown) => void,
  /**
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick?: (row: unknown) => void,
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
      {columns.length > 0 && columns.some((column) => typeof column.headerName !== 'undefined' && column.headerName !== '')
        && (
          <thead className={styles.tableHeader}>
            <tr className={styles.tableHeaderRow}>
              {columns.map((column) => (
                <th
                  className={styles.tableHeaderCell}
                  style={{ maxWidth: column && column.width && column.width > 0 ? `${column.width}px` : undefined }}
                  key={column.id}
                >
                  <div className={styles.tableCellContent} style={{ textAlign: column.align }}>
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
                  key={column.id.concat(Object.values(valueRow))}
                >
                  <div className={styles.tableCellContent} style={{ textAlign: column.align }}>
                    {column.cellRenderCallback ? column.cellRenderCallback(valueRow, rowIndex, columnIndex) : valueRow.value}
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
                  row={Object.assign(row, { key: row.key ? row.key.toString() : '' })}
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

SimpleTable.defaultProps = {
  actions: [],
  loading: false,
  onRowClick: null,
  onRowDoubleClick: null,
};

SimpleTable.propTypes = {
  /**
   * Allows the definition of row actions Type: [{ label: [ string ], onClick: [ function ] }, ...]
   */
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })),
  /**
   * Sets the Table columns.
   * Type: [{ accessor: ( string | func ) (required), align: , cellRenderCallback: func, headerName: string, id: string (required), width: number ]
   */
  columns: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    align: PropTypes.string,
    cellRenderCallback: PropTypes.func,
    headerName: PropTypes.string,
    id: PropTypes.string,
    width: PropTypes.number,
  })).isRequired,
  /**
   * Sets the Table data displayed in the rows. Type: [ JSON ]
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading: PropTypes.bool,
  /**
   * Called when the user clicks on a row.
   */
  onRowClick: PropTypes.func,
  /**
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick: PropTypes.func,
};

export default SimpleTable;
