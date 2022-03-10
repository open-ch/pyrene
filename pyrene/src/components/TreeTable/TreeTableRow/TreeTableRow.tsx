/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
import React, { CSSProperties } from 'react';
import clsx from 'clsx';

import styles from './TreeTableRow.module.css';
import TreeTableCell from '../TreeTableCell/TreeTableCell';
import { Column, RowData } from '../types';

export interface TreeTableRowProps<R> {
  columns: Array<Column<R>>;
  data?: RowData<R>;
  expandOnParentRowClick: boolean;
  highlighted?: boolean;
  index: number;
  isExpanded: boolean;
  level: number;
  onExpand?: (args: { row?: RowData<R>; index: number }) => void;
  onRowClick?: (row?: RowData<R>) => void;
  onRowDoubleClick?: (row?: RowData<R>) => void;
  parent?: boolean;
  style?: CSSProperties;
}

function TreeTableRow<R extends object = {}>({
  columns,
  data,
  expandOnParentRowClick,
  highlighted,
  index,
  isExpanded,
  level,
  onExpand,
  onRowClick,
  onRowDoubleClick,
  parent,
}: TreeTableRowProps<R>): React.ReactElement<TreeTableRowProps<R>> {

  const toggleRowExpansion = () => {
    onExpand?.({ row: data, index });
  };

  const handleSingleClick = () => {
    if (parent && expandOnParentRowClick) {
      toggleRowExpansion();
    } else {
      onRowClick?.(data);
    }
  };

  const hasExpandAction = parent && expandOnParentRowClick;
  const hasSingleClickAction = hasExpandAction || onRowClick;
  const hasDoubleClickAction = !hasSingleClickAction && onRowDoubleClick;

  return (
    <div
      className={clsx(styles.treeTableRow, {
        [styles.activeAction]: hasSingleClickAction || hasDoubleClickAction,
      })}
    >

      {/* Row Elements are rendered here */}
      <div
        className={clsx(
          styles.rowElementsContainer,
          { [styles.openRootParent]: level === 0 && isExpanded && parent },
          { [styles.highlighted]: highlighted },
        )}
        onClick={hasSingleClickAction ? handleSingleClick : undefined}
        onDoubleClick={hasDoubleClickAction ? () => onRowDoubleClick?.(data) : undefined}
      >
        {columns.map((column, i) => {

          // Do not display column if it is hidden
          if (column.hidden) {
            return null;
          }

          const colWidth = typeof column.width !== 'undefined' || column.width !== 0 ? column.width : 100;
          const styling = {
            width: colWidth,
            flex: colWidth ? `${colWidth} 0 auto` : '100 0 auto',
            paddingLeft: i === 0 ? level * 24 + 8 : 0,
          };
          const firstColumn = i === 0;

          return (
            <TreeTableCell
              style={{ ...styling, ...column.cellStyle }}
              key={column.accessor as string}
              columnProps={column}
              firstColumn={firstColumn}
              parent={parent}
              sectionOpen={isExpanded}
              // @ts-ignore
              value={data[column.accessor]}
              rowData={data}
              onExpandClick={hasExpandAction ? () => null : toggleRowExpansion}
            />
          );
        })}
      </div>
    </div>
  );
}

TreeTableRow.displayName = 'TreeTableRow';

export default TreeTableRow;
