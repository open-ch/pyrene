import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './tableHeaderCell.css';

const TableHeaderCell = props => {
  const iconClassName = props.className.replace(/-cursor-pointer/g, '');
  return (
    <div styleName={'tableHeaderCell'} className={classNames(props.className, 'unSelectable')} style={props.style} onClick={(event) => props.toggleSort(event)}>
      {props.children}
      <span styleName={classNames('sortIcon', [iconClassName]: true)} />
    </div>
  );
};

TableHeaderCell.displayName = 'TableHeaderCell';

TableHeaderCell.defaultProps = {};

TableHeaderCell.propTypes = {};

export default TableHeaderCell;