import React from 'react';
import PropTypes from 'prop-types';
import './keyValueTable.css';
import KeyValueRow from './KeyValueRow';

const KeyValueTable = props => (
  <table styleName="keyValueTable">
    <thead styleName="keyValueTableHeader">
      <tr><th colSpan="2">{props.header}</th></tr>
    </thead>
    <tbody>
      { props.rows.length > 0 && props.rows.map(row => (
        <KeyValueRow key={row.key+row.value} left={row.key} right={row.value} />
      ))}
    </tbody>
  </table>
);


KeyValueTable.displayName = 'KeyValueTable';

KeyValueTable.defaultProps = {
  header: 'Alcin header',
  rows: [{ key: 'asdf', value: 'qwer' }],
};

KeyValueTable.propTypes = {
  header: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.node,
  })),
};

export default KeyValueTable;
