import React from 'react';
import PropTypes from 'prop-types';
import './simpleTable.css';
import getBy from './TableUtils';

const SimpleTable = props => (
  <table styleName="tableBody">
    <tbody>
      <tr styleName="tableRow">
        {props.columns.length > 0 && props.columns.map(column => (
          <th
            styleName="tableCell"
            key={column.id}
          >
            {column.headerName}
          </th>
        ))}
      </tr>
      {props.data.length > 0 && props.data.map(row => (
        <tr
          styleName="tableRow"
          key={Object.values(row)}
        >
          {props.columns.length > 0 && props.columns.map((column) => {
            const valueRow = row;
            valueRow.value = typeof column.accessor === 'string' ? getBy(row, column.accessor) : column.accessor(row);
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

SimpleTable.propTypes = {
  columns: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SimpleTable;
