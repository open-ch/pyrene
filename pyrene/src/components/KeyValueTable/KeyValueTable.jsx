import React from 'react';
import PropTypes from 'prop-types';
import './keyValueTable.css';

const KeyValueTable = ({ title, rows }) => (
  <div styleName="keyValueTable">
    {title && (
      <div styleName="keyValueTableTitle">
        {title}
      </div>
    )}
    <table styleName="keyValueBody">
      <tbody>
        {rows.length > 0 && rows.map(row => (
          <tr styleName="keyValueRow"
            key={row.key}
          >
            <td styleName="keyValueCellKey">
              {row.key}
            </td>
            <td styleName="keyValueCellValue">
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


KeyValueTable.displayName = 'Key Value Table';

KeyValueTable.defaultProps = {
  title: '',
  rows: [{ key: 'key', value: 'value' }],
};

KeyValueTable.propTypes = {
  /**
    * Rows definition: { key: 'key', value: 'value' }
    */
  rows: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.node,
  })),
  /**
   * Title of the table.
   */
  title: PropTypes.string,
};

export default KeyValueTable;
