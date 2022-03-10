/* eslint-disable react/prop-types */
import React, { ReactNode, FunctionComponent } from 'react';
import clsx from 'clsx';

import styles from './TableHeader.module.css';

export interface TableHeaderProps {
  children: ReactNode;
  disabled?: boolean;
}

const TableHeader: FunctionComponent<TableHeaderProps> = ({ children, disabled = false }) => (
  <div className={clsx(styles.tableHeader, { [styles.disabled]: disabled })}>{children}</div>
);

export default TableHeader;
