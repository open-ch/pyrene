/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';

import styles from './treeTableHeader.css';
import { Column } from '../types';

export interface TreeTableHeaderProps<R> {
  columns: Array<Column<R>>,
  scrollPadding: number,
}

function TreeTableHeader<R extends object = {}>({
  columns,
  scrollPadding,
}: TreeTableHeaderProps<R>): React.ReactElement<TreeTableHeaderProps<R>> {
  return (
    <div className={styles.treeTableHeader} style={{ paddingRight: scrollPadding }}>

      {columns.map((column) => {
        // Do not display hidden columns
        if (column.hidden) {
          return null;
        }

        const header = column.headerName ? column.headerName : column.accessor;

        const colWidth = (typeof column.width !== 'undefined' || column.width !== 0) ? column.width : null;

        const styling = {
          width: colWidth,
          flex: colWidth ? `${colWidth} 0 auto` : null,
        };
        return (
          <div style={{ ...styling, ...column.headerStyle }} className={styles.treeTableHeaderCell} key={header}>
            {header}
          </div>
        );
      })}
    </div>
  );
}

export default TreeTableHeader;
