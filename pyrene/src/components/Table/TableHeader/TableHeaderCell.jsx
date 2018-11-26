import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SVG from 'react-svg-inline';

import DefaultSort from '../images/sort.svg';
import AscSort from '../images/sortDown.svg';
import DescSort from '../images/sortUp.svg';

import './tableHeaderCell.css';

const stringContains = (haystack, needle) => haystack.indexOf(needle) !== -1;

const getIconComponent = (className) => {
  if (stringContains(className, 'asc')) {
    return <SVG svg={AscSort} />;
  } else if (stringContains(className, 'desc')) {
    return <SVG svg={DescSort} />;
  }
  return <SVG svg={DefaultSort} />;
};

const TableHeaderCell = props => {
  return (
    <div styleName={'tableHeaderCell'} className={classNames(props.className, 'unSelectable')} style={props.style} onClick={(event) => props.toggleSort(event)}>
      {props.children}
      {props.className && getIconComponent(props.className)}
    </div>
  );
};

TableHeaderCell.displayName = 'TableHeaderCell';

TableHeaderCell.defaultProps = {};

TableHeaderCell.propTypes = {
  style: PropTypes.object,
  toggleSort: PropTypes.func,
  className: PropTypes.string,
};

export default TableHeaderCell;