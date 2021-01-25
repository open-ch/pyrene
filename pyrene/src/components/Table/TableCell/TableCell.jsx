import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './tableCell.css';

const TableCell = (props) => (
  <div styleName="tableCell" className="rt-td" role="gridcell" style={props.style} onClick={props.onClick}>
    <div styleName={classNames('tableData', { multiSelect: props.multiSelect, overflowAble: props.overflowAble })}>{props.children}</div>
  </div>
);


TableCell.displayName = 'TableCell';

TableCell.defaultProps = {
  children: null,
  style: null,
  multiSelect: false,
  overflowAble: false,
};

TableCell.propTypes = {
  children: PropTypes.node,
  multiSelect: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  overflowAble: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default TableCell;
