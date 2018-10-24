import React from 'react';
import PropTypes from 'prop-types';

import './treeTableCell.css';

const TreeTableCell = props => (
  <div style={props.style} styleName={'treeTableCell'}>
    {props.children}
  </div>
);


TreeTableCell.displayName = 'TreeTableCell';

TreeTableCell.defaultProps = {};

TreeTableCell.propTypes = {
  children: PropTypes.node,
};

export default TreeTableCell;