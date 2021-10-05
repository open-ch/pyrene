/* eslint-disable react/prop-types */
import React, { CSSProperties, ReactNode, FunctionComponent } from 'react';
import clsx from 'clsx';

import styles from './tableCell.css';

export interface TableCellProps {
  children: ReactNode,
  multiSelect?: boolean,
  onClick: () => void,
  style?: CSSProperties
}

const TableCell: FunctionComponent<TableCellProps> = ({
  children,
  multiSelect = false,
  onClick,
  style,
}) => (
  <div className={clsx(styles.tableCell, 'rt-td')} role="gridcell" style={style} onClick={onClick}>
    <div
      className={clsx(styles.tableData, { [styles.multiSelect]: multiSelect })}
      style={{ overflow: style?.overflow }}
    >
      {children}
    </div>
  </div>
);

export default TableCell;
