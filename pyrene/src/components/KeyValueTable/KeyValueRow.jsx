import React from 'react';
import PropTypes from 'prop-types';
import './keyValueTable.css';

const KeyValueRow = props => (
  <tr styleName="keyValueRow">
    <td styleName="keyValueCellKey">
      {props.left}
    </td>
    <td styleName="keyValueCellData">
      {props.right}
    </td>
  </tr>
);

KeyValueRow.displayName = 'KeyValueRow';

KeyValueRow.defaultProps = {
  left: 'Hello',
  right: 'world!',
};

KeyValueRow.propTypes = {
  left: PropTypes.string,
  right: PropTypes.node,
};

export default KeyValueRow;
