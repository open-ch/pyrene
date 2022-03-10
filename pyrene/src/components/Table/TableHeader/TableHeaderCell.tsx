/* eslint-disable react/prop-types */
import React, { ReactNode, FunctionComponent, CSSProperties, MouseEvent } from 'react';
import clsx from 'clsx';
import DefaultSort from '../images/sort.svg';
import AscSort from '../images/sortDown.svg';
import DescSort from '../images/sortUp.svg';

import styles from './TableHeaderCell.module.css';

export interface TableHeaderCellProps {
  children: ReactNode;
  className?: string;
  multiSelect?: boolean;
  style?: CSSProperties;
  toggleSort: (e: MouseEvent<HTMLDivElement>) => void;
}

const getIconComponent = (className: string) => {
  if (className.indexOf('asc') !== -1) {
    return <AscSort />;
  }
  if (className.indexOf('desc') !== -1) {
    return <DescSort />;
  }
  return <DefaultSort />;
};

const TableHeaderCell: FunctionComponent<TableHeaderCellProps> = ({
  children,
  className,
  multiSelect = false,
  style,
  toggleSort,
}) => (
  <div
    onClick={(event) => toggleSort(event)}
    className={clsx({ [styles.multiSelect]: multiSelect }, styles.tableHeaderCell, className, 'unSelectable')}
    style={style}
  >
    {children}
    {className && getIconComponent(className)}
  </div>
);

export default TableHeaderCell;
