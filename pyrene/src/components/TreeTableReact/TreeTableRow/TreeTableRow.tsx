import React, { CSSProperties, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { Row } from 'react-table-7';

import styles from './TreeTableRow.module.css';
import TreeTableCell from '../TreeTableCell/TreeTableCell';
import { CustomSubRowProps } from '../TreeTableReact';

export type CellValue = string | number | boolean;

export interface TreeTableRowProps {
  row: Row;
  highlighted?: boolean;
  disabled?: boolean;
  onRowClick?: (row?: Row['original']) => void;
  onRowDoubleClick?: (row?: Row['original']) => void;
  onRowHover?: ((row: {}, h: boolean) => void) | undefined;
  style?: CSSProperties;
  index: number;
  listRef: React.MutableRefObject<any>;
  expandOnParentRowClick?: boolean;
  multiSelect?: boolean;
  customSubRow?: ({ row, rowProps, listRef }: CustomSubRowProps) => JSX.Element;
}

function TreeTableRow<R extends object = {}>({
  row,
  highlighted,
  disabled,
  onRowClick,
  onRowDoubleClick,
  onRowHover,
  index,
  listRef,
  expandOnParentRowClick,
  style,
  multiSelect,
  customSubRow,
}: TreeTableRowProps): React.ReactElement<TreeTableRowProps> {
  const toggleRowExpansion = useCallback(() => {
    /**
     * clears the inner cache of styles and sizes of VariableSizeList,
     * which expects the same row index to have the same size.
     * When expanding we insert rows of different height into existing index space and cache gets dirty.
     * @param index - index to clear from(inclusive) to the end of the list
     */
    listRef?.current?.resetAfterIndex?.(index);
    row.toggleRowExpanded();
  }, [index]);

  const handleSingleClick = useCallback(() => {
    if ((row.canExpand || customSubRow) && expandOnParentRowClick) {
      toggleRowExpansion();
    } else {
      onRowClick?.(row.original);
    }
  }, [row.canExpand]);

  const hasExpandAction = useMemo(
    () => (row.canExpand || !!customSubRow) && expandOnParentRowClick,
    [row.canExpand, expandOnParentRowClick]
  );
  const hasSingleClickAction = useMemo(
    () => hasExpandAction || onRowClick,
    [hasExpandAction, onRowClick]
  );
  const hasDoubleClickAction = useMemo(
    () => !hasSingleClickAction && onRowDoubleClick,
    [hasSingleClickAction, onRowDoubleClick]
  );

  const nextToExpanderColumnIndex =
    row.cells.findIndex((cell) => cell.column.id === 'expander') + 1;
  const canExpand = useMemo(() => row?.canExpand || !!customSubRow, [row, customSubRow]);
  const rowProps = row.getRowProps({
    style: { ...style, ...(row.isExpanded && { width: '100%' }) },
  });

  return (
    <>
      <div
        {...rowProps}
        className={clsx(styles.rowElementsContainer, {
          [styles.openRootParent]: row.depth === 0 && row?.isExpanded && parent,
          [styles.activeAction]: hasSingleClickAction || hasDoubleClickAction,
          [styles.disabled]: disabled,
          [styles.highlighted]: highlighted,
        })}
        onClick={hasSingleClickAction ? handleSingleClick : undefined}
        onDoubleClick={hasDoubleClickAction ? () => onRowDoubleClick?.(row.original) : undefined}
        onMouseOver={() => onRowHover?.(row.original, true)}
        onMouseOut={() => onRowHover?.(row.original, false)}
      >
        {row.cells.map((cell, i) => {
          const styling = !customSubRow
            ? {
                // adjust column indent onExpand
                marginLeft: i === 0 ? cell.row.depth * 22 : 0,
                ...(i === nextToExpanderColumnIndex && {
                  width:
                    (cell.column.width as number) -
                    cell.row.depth * 24 +
                    (!row?.canExpand && multiSelect ? 16 : 0),
                }),
                // when there is no expander and we have multSelect do not leave empty space
                ...(!row?.canExpand &&
                  multiSelect &&
                  cell.column.id === 'expander' && { minWidth: 5, width: 5, paddingRight: 0 }),
              }
            : {};
          return (
            <TreeTableCell
              style={{ ...styling, ...cell?.column?.cellStyle }}
              key={cell.column.id}
              cell={cell}
              sectionOpen={canExpand && row?.isExpanded}
              canExpand={canExpand && cell.column.id === 'expander'}
              onExpandClick={hasExpandAction ? () => null : toggleRowExpansion}
            />
          );
        })}
      </div>
      {row?.isExpanded && customSubRow && customSubRow({ rowProps, row, listRef })}
    </>
  );
}

TreeTableRow.displayName = 'TreeTableRow';

export default TreeTableRow;
