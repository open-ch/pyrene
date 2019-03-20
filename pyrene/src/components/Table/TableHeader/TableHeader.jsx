import React from 'react';
import PropTypes from 'prop-types';

import './tableHeader.css';

const TableHeader = props => (
  <div styleName="tableHeader">
    {props.children}
  </div>
);


TableHeader.displayName = 'TableHeader';

TableHeader.defaultProps = {};

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableHeader;
