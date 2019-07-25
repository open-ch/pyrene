import React from 'react';
import PropTypes from 'prop-types';
import './simpleTable.css';

/**
 * Simple Tables are used to display tabular data without the overhead of pagination, sorting and filtering.
 */
const SimpleTable = props => (
  <table styleName="table">
    <thead>
      <tr styleName="tableHeaderRow">
        {props.columns.length > 0 && props.columns.map(column => (
          <th
            styleName="tableHeaderCell"
            key={column.id}
          >
            {column.headerName}
          </th>
        ))}
      </tr>
    </thead>
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
   * Type: [{ id: string (required), headerName: string (required), accessor: string (required), headerStyle: object, cellStyle: object, initiallyHidden: bool, width: number }]
   */
  columns: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * Sets the Table data displayed in the rows. Type: JSON
   */
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SimpleTable;
