import React from 'react';
import PropTypes from 'prop-types';
import './keyValueTable.css';

const KeyValueTable = ({ title, rows, keyWidth }) => (
  <div styleName="keyValueTable">
    {title && (
      <div styleName="keyValueTableTitle">
        {title}
      </div>
    )}
    <table styleName="keyValueBody">
      <tbody>
        {rows.length > 0 && rows.map((row) => (
          <tr
            styleName="keyValueRow"
            style={row.rowStyle}
            key={row.key}
          >
            <td styleName="keyValueCellKey" style={{ width: keyWidth, minWidth: keyWidth, maxWidth: keyWidth }}>
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
  keyWidth: 256,
  title: '',
  rows: [{ key: 'key', value: 'value' }],
};

KeyValueTable.propTypes = {
  keyWidth: PropTypes.number,
  /**
    * Rows definition: { key: 'key', value: 'value', rowStyle: {} }, where rowStyle is an object with css properties applied to the whole row
    */
  rows: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    rowStyle: PropTypes.shape({}),
    value: PropTypes.node,
  })),
  /**
   * Title of the table.
   */
  title: PropTypes.string,
};

export default KeyValueTable;
