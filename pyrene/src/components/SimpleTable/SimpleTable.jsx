import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import Loader from '../Loader/Loader';
import SimpleTableActionList from './SimpleTableActionList';
import './simpleTable.css';

/**
 * Simple Tables are used to display tabular data without the overhead of pagination, sorting and filtering.
 */
const SimpleTable = (props) => (
  <div styleName="container">
    <table styleName="table">
      {props.columns.length > 0 && props.columns.some((column) => typeof column.headerName !== 'undefined' && column.headerName !== '')
        && (
          <thead styleName="tableHeader">
            <tr styleName="tableHeaderRow">
              {props.columns.map((column) => (
                <th
                  styleName="tableHeaderCell"
                  style={{ maxWidth: column.width }}
                  key={column.id}
                >
                  <div styleName="tableCellContent" style={{ textAlign: column.align }}>
                    {column.headerName}
                  </div>
                </th>
              ))}
              {!!props.actions.length > 0 && (
                <th
                  aria-label="Action"
                  styleName={classNames('tableHeaderCell', 'actionCell')}
                  style={{ maxWidth: '20px' }}
                  key="action"
                />
              )}
            </tr>
          </thead>
        )}
      <tbody styleName="tableBody">
        {!props.loading && props.data && props.data.length > 0 && props.data.map((row, rowIndex) => (
          <tr
            styleName={classNames('tableRow', props.onRowDoubleClick ? 'tableRowWithFunction' : '')}
            key={Object.values(row)}
            onDoubleClick={() => (props.onRowDoubleClick ? props.onRowDoubleClick(row) : null)}
          >
            {props.columns.length > 0 && props.columns.map((column, columnIndex) => {
              const valueRow = row;
              valueRow.value = typeof column.accessor === 'string' ? row[column.accessor] : column.accessor(row, rowIndex, columnIndex);
              return (
                <td
                  styleName="tableCell"
                  style={{ maxWidth: column.width }}
                  key={column.id.concat(Object.values(valueRow))}
                >
                  <div styleName="tableCellContent" style={{ textAlign: column.align }}>
                    {column.cellRenderCallback ? column.cellRenderCallback(valueRow, rowIndex, columnIndex) : valueRow.value}
                  </div>
                </td>
              );
            })}
            {!props.loading && props.data && props.data.length > 0 && props.actions && props.actions.length > 0 && (
              <td
                styleName={classNames('tableCell', 'actionCell')}
                key={'action'.concat(Object.values(row))}
              >
                {<SimpleTableActionList
                  row={row}
                  actions={props.actions}
                />}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    {props.loading && (
      <div styleName="loader">
        <Loader type="inline" />
      </div>
    )}
    {!props.loading && (!props.data || !(props.data.length > 0)) && (
      <div styleName="noData">
          No data found.
      </div>
    )}
  </div>
);

SimpleTable.displayName = 'Simple Table';

SimpleTable.defaultProps = {
  actions: [],
  loading: false,
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
   * Type: [{ accessor: ( string | func ) (required), align: , cellRenderCallback: func, headerName: string (required), id: string (required), width: number ]
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
    width: PropTypes.string,
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
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick: PropTypes.func,
};

export default SimpleTable;
