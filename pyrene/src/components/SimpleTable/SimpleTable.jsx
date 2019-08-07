import React from 'react';
import PropTypes from 'prop-types';
import './simpleTable.css';

/**
 * Simple Tables are used to display tabular data without the overhead of pagination, sorting and filtering.
 */
const SimpleTable = props => (
  <table styleName="table">
    {props.columns.length > 0 && props.columns.some(column => typeof column.headerName !== 'undefined' && column.headerName !== '')
  && (
    <thead>
      <tr styleName="tableHeaderRow">
        {props.columns.map(column => (
          <th
            styleName="tableHeaderCell"
            key={column.id}
          >
            {column.headerName}
          </th>
        ))}
      </tr>
    </thead>
  )}
    <tbody>
      {props.data.length > 0 && props.data.map(row => (
        <tr
          styleName="tableRow"
          key={Object.values(row)}
        >
          {props.columns.length > 0 && props.columns.map((column) => {
            const valueRow = row;
            valueRow.value = typeof column.accessor === 'string' ? row[column.accessor] : column.accessor(row);
            return (
              <td
                styleName="tableCell"
                key={column.id.concat(Object.values(valueRow))}
              >
                {column.cellRenderCallback ? column.cellRenderCallback(valueRow) : valueRow.value}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

SimpleTable.displayName = 'Simple Table';

SimpleTable.propTypes = {
  /**
   * Sets the Table columns.
   * Type: [{ accessor: ( string | func ) (required), cellRenderCallback: func, headerName: string (required), id: string (required)]
   */
  columns: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    cellRenderCallback: PropTypes.func,
    headerName: PropTypes.string,
    id: PropTypes.string,
  })).isRequired,
  /**
   * Sets the Table data displayed in the rows. Type: [ JSON ]
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SimpleTable;
