import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import Loader from '../Loader/Loader';
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
              style={{ maxWidth: column.width && column.width }}
              key={column.id}
            >
              <div styleName="tableCellContent" style={{ textAlign: column.align }}>
                {column.headerName}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    )}
      <tbody styleName="tableBody">
        {!props.loading && props.data && props.data.length > 0 && props.data.map((row, rowIndex) => (
          <tr
            styleName={classNames('tableRow', props.onRowDoubleClick ? 'tableRowWithFunction' : '')}
            key={Object.values(row)}
            onDoubleClick={(event) => {
              const targetRow = event.currentTarget;
              // To get the column index, we need to retrieve the td element that is the target of the event. Since we could have clicked on any children of the td element, we
              // need to traverse back in the DOM until we find an element that is a direct children of the row. Keep in mind that with this approach we are not supporting nested tables
              const targetCell = (function findTd(target) { return target.parentElement.nodeName === 'TR' ? target : target.parentElement.nodeName === 'TABLE' ? null : findTd(target.parentElement); }(event.target.parentElement));
              const columnIndex = Array.from(targetRow.childNodes).indexOf(targetCell);
              return (props.onRowDoubleClick ? props.onRowDoubleClick(row, columnIndex) : null);
            }}
          >
            {props.columns.length > 0 && props.columns.map((column, columnIndex) => {
              const valueRow = row;
              valueRow.value = typeof column.accessor === 'string' ? row[column.accessor] : column.accessor(row, rowIndex, columnIndex);
              return (
                <td
                  styleName="tableCell"
                  style={{ maxWidth: column.width && column.width }}
                  key={column.id.concat(Object.values(valueRow))}
                >
                  <div styleName="tableCellContent" style={{ textAlign: column.align }}>
                    {column.cellRenderCallback ? column.cellRenderCallback(valueRow, rowIndex, columnIndex) : valueRow.value}
                  </div>
                </td>
              );
            })}
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
  loading: false,
  onRowDoubleClick: null,
};

SimpleTable.propTypes = {
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
