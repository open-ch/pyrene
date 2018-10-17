import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './tableHeaderCell.css';

const TableHeaderCell = props => {
  return (
    <div styleName={'tableHeaderCell'} className={classNames(props.className, 'unSelectable')} style={props.style} onClick={(event) => props.toggleSort(event)}>
      {props.children}
      {props.className && <span styleName={classNames('sortIcon', props.className)} />}
    </div>
  );
};

TableHeaderCell.displayName = 'TableHeaderCell';

TableHeaderCell.defaultProps = {};

TableHeaderCell.propTypes = {};

export default TableHeaderCell;