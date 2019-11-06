import React from 'react';
import PropTypes from 'prop-types';
import './simpleTable.css';

/**
 * Simple Tables are used to display tabular data without the overhead of pagination, sorting and filtering.
 */
const SimpleTable = (props) => (
  <table styleName="table">
    {props.columns.length > 0 && props.columns.some((column) => typeof column.headerName !== 'undefined' && column.headerName !== '')
  && (
    <thead styleName="tableHeader">
      <tr styleName="tableHeaderRow">
        {props.columns.map((column) => (
          <th
            styleName="tableHeaderCell"
            style={{ maxWidth: column.maxWidth && column.maxWidth }}
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
      {props.data.length > 0 && props.data.map((row) => (
        <tr
          styleName="tableRow"
          key={Object.values(row)}
          onDoubleClick={() => props.onRowDoubleClick(row)}
        >
          {props.columns.length > 0 && props.columns.map((column) => {
            const valueRow = row;
            valueRow.value = typeof column.accessor === 'string' ? row[column.accessor] : column.accessor(row);
            return (
              <td
                styleName="tableCell"
                style={{ maxWidth: column.maxWidth && column.maxWidth }}
                key={column.id.concat(Object.values(valueRow))}
              >
                <div styleName="tableCellContent" style={{ textAlign: column.align }}>
                  {column.cellRenderCallback ? column.cellRenderCallback(valueRow) : valueRow.value}
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

SimpleTable.displayName = 'Simple Table';

SimpleTable.defaultProps = {
  onRowDoubleClick: () => {},
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
    maxWidth: PropTypes.string,
  })).isRequired,
  /**
   * Sets the Table data displayed in the rows. Type: [ JSON ]
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick: PropTypes.func,
};

export default SimpleTable;
