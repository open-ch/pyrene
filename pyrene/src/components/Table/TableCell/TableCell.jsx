import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './tableCell.css';

const TableCell = props => {

  const { ...childStyle} = props.style;
  
  return (
    <div styleName="tableCell" className="rt-td" role="gridcell" style={props.style} onClick={props.onClick}>
      <div styleName={classNames('tableData', { multiSelect: props.multiSelect })} style={childStyle}>{props.children}</div>
    </div>
  );
};



TableCell.displayName = 'TableCell';

TableCell.defaultProps = {
  style: null,
  multiSelect: false,
};

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  multiSelect: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default TableCell;
