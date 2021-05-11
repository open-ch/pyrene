import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// @ts-ignore
import DefaultSort from '../images/sort.svg';
// @ts-ignore
import AscSort from '../images/sortDown.svg';
// @ts-ignore
import DescSort from '../images/sortUp.svg';

import styles from './tableHeaderCell.css';

const stringContains = (haystack, needle) => haystack.indexOf(needle) !== -1;

const getIconComponent = (className) => {
  if (stringContains(className, 'asc')) {
    return <AscSort />;
  }
  if (stringContains(className, 'desc')) {
    return <DescSort />;
  }
  return <DefaultSort />;
};

const TableHeaderCell = (props) => (
  <div
    onClick={(event) => props.toggleSort(event)}
    className={clsx({ [styles.multiSelect]: props.multiSelect }, styles.tableHeaderCell, props.className, 'unSelectable')}
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
