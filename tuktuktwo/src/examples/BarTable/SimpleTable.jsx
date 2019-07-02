import React from 'react';
import PropTypes from 'prop-types';
import './simpleTable.css';

const SimpleTable = props => (
  <div>
    {props.title && (
      <div styleName="tableTitle">
        {props.title}
      </div>
    )}
    <table xmlns="http://www.w3.org/1999/xhtml" styleName="tableBody">
      <tbody>
        <tr styleName="tableRow">
          {props.columns.length > 0 && props.columns.map(column => (
            <th styleName="tableCell">
              {column.headerName}
            </th>
          ))}
        </tr>
        {props.data.length > 0 && props.data.map(row => (
          <tr styleName="tableRow">
            {props.columns.length > 0 && props.columns.map(column => (
              <td styleName="tableCell">
                {column.cellRenderCallback ? props.cellRenderCallback(row, column) : row[column.id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

SimpleTable.defaultProps = {
  title: '',
  cellRenderCallback: value => value,
};

SimpleTable.propTypes = {
  /**
  * Defines how the cell should get rendered
  */
  cellRenderCallback: PropTypes.func,
  /**
   * Color of the closed area.
   */
  columns: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * Sets the title.
   */
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * Sets the Table data displayed in the rows. Type: JSON
   */
  title: PropTypes.string, // eslint-disable-line react/forbid-prop-types
};

export default SimpleTable;
