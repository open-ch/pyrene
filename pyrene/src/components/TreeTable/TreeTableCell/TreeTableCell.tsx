/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { CSSProperties } from 'react';
import clsx from 'clsx';

import styles from './treeTableCell.css';

type AllowedValues = string | number | boolean;

type Row<R> = R & {
  _getParent: () => string,
  _rowId: string,
  _treeDepth: number,
};

type RowData<R> = Row<R> & {
  children: Array<Row<R>>
};

interface Column<R> {
  accessor: keyof R,
  cellStyle?: any,
  headerName?: string,
  headerStyle?: any,
  initiallyHidden?: boolean,
  width?: number,
  renderCallback?: (value?: AllowedValues, rowData?: RowData<R>) => JSX.Element,
}

interface TreeTableCellProps<R> {
  columnProps: Column<R>,
  firstColumn?: boolean,
  onExpandClick: () => void,
  parent?: boolean,
  rowData?: RowData<R>,
  sectionOpen?: boolean,
  style?: CSSProperties,
  value?: AllowedValues,
}

function TreeTableCell <R extends object>({
  onExpandClick,
  value = '',
  columnProps,
  parent = false,
  sectionOpen = false,
  firstColumn = false,
  style,
  rowData,
}: TreeTableCellProps<R>) {
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

export default TreeTableCell;

TreeTableCell.displayName = 'TreeTableCell';
