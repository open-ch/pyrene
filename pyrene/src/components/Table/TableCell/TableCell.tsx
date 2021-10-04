import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './tableCell.css';

const TableCell = (props) => (
  <div className={clsx(styles.tableCell, 'rt-td')} role="gridcell" style={props.style} onClick={props.onClick}>
    <div className={clsx(styles.tableData, { [styles.multiSelect]: props.multiSelect })} style={{ overflow: props.style.overflow }}>{props.children}</div>
  </div>
);


TableCell.displayName = 'TableCell';

TableCell.defaultProps = {
  children: null,
  style: null,
  multiSelect: false,
};

TableCell.propTypes = {
  children: PropTypes.node,
  multiSelect: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default TableCell;
