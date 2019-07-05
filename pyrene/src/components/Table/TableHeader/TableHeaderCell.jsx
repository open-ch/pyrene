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
    return <SVG styleName="inlineSVGFlex" svg={AscSort} />;
  } if (stringContains(className, 'desc')) {
    return <SVG styleName="inlineSVGFlex" svg={DescSort} />;
  }
  return <SVG styleName="inlineSVGFlex" svg={DefaultSort} />;
};

const TableHeaderCell = props => (
  <div
    onClick={event => props.toggleSort(event)}
    styleName={classNames({ multiSelect: props.multiSelect, tableHeaderCell: true })}
    className={classNames(props.className, 'unSelectable')}
    style={props.style}
  >
    {props.children}
    {props.className && getIconComponent(props.className)}
  </div>
);

TableHeaderCell.displayName = 'TableHeaderCell';

TableHeaderCell.defaultProps = {
  className: null,
  style: null,
  multiSelect: false,
};

TableHeaderCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  multiSelect: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  toggleSort: PropTypes.func.isRequired,
};

export default TableHeaderCell;
