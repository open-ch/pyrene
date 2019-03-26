import React from 'react';
import PropTypes from 'prop-types';
import './keyValueTable.css';

const KeyValueTable = props => (
  <table styleName="keyValueTable">
    <thead styleName="keyValueTableHeader">
      <tr><th colSpan="2">{props.header}</th></tr>
    </thead>
    <tbody>
      { props.rows.length > 0 && props.rows.map(row => (
        <tr styleName="keyValueRow">
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
);


KeyValueTable.displayName = 'KeyValueTable';

KeyValueTable.defaultProps = {
  header: 'KeyValue table',
  rows: [{ key: 'key', value: 'value' }],
};

KeyValueTable.propTypes = {
  header: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.node,
  })),
};

export default KeyValueTable;
