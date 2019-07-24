import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './tableHeader.css';

const TableHeader = props => (
  <div styleName={classNames('tableHeader', { disabled: props.disabled })}>
    {props.children}
  </div>
);


TableHeader.displayName = 'TableHeader';

TableHeader.defaultProps = {
  disabled: false,
};

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

export default TableHeader;
