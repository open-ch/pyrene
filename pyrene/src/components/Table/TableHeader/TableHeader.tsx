import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './tableHeader.css';

const TableHeader = (props) => (
  <div className={clsx(styles.tableHeader, { [styles.disabled]: props.disabled })}>
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
