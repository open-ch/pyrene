/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/require-default-props */
import React, { CSSProperties } from 'react';
import clsx from 'clsx';

import styles from './treeTableCell.css';
import { Column, ExtendedRow, CellValue } from '../types';

interface TreeTableCellProps<R> {
  columnProps: Column<R>,
  firstColumn?: boolean,
  onExpandClick: () => void,
  parent?: boolean,
  rowData?: ExtendedRow<R>,
  sectionOpen?: boolean,
  style?: CSSProperties,
  value?: CellValue,
}

function TreeTableCell<R extends object = {}>({
  onExpandClick,
  value = '',
  columnProps,
  parent = false,
  sectionOpen = false,
  firstColumn = false,
  style,
  rowData,
}: TreeTableCellProps<R>): React.ReactElement<TreeTableCellProps<R>> {
  return (
    <div style={style} className={styles.treeTableCell}>

      {firstColumn && parent
        ? (
          <div
            className={clsx(styles.pivotIcon, { [styles.sectionOpen]: sectionOpen }, 'pyreneIcon-chevronDown')}
            onClick={onExpandClick}
          />
        )
        : <div className={styles.iconSpaceholder} />}

      {/* Use renderCallback if there is one defined for this column */}

      {columnProps.renderCallback
        ? columnProps.renderCallback(value, rowData)
        : (
          <div className={styles.cellDataContainer} title={`${value}`}>
            {value}
          </div>
        )}
    </div>
  );
}

TreeTableCell.displayName = 'TreeTableCell';

export default TreeTableCell;
