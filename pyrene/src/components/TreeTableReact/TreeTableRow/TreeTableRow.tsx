import React, { CSSProperties, useCallback, useMemo, forwardRef } from 'react';
import clsx from 'clsx';
import { Row } from 'react-table-7';

import styles from './TreeTableRow.module.css';
import TreeTableCell from '../TreeTableCell/TreeTableCell';
import { CustomSubRowProps } from '../TreeTableReact';

export type CellValue = string | number | boolean;

export interface TreeTableRowProps {
  row: Row;
  highlighted?: boolean;
  highlightBorderColor?: string;
  highlightBackgroundColor?: string;
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
  showCellTitle?: boolean;
}

function TreeTableRow<R extends object = {}>(
  {
    row,
    highlighted,
    highlightBorderColor = 'var(--highlight-fg)',
    highlightBackgroundColor = 'var(--highlight-bg)',
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
    showCellTitle,
  }: TreeTableRowProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const toggleRowExpansion = useCallback(() => {
    /**
     * clears the inner cache of styles and sizes of VariableSizeList,
     * which expects the same row index to have the same size.
     * When expanding we insert rows of different height into existing index space and cache gets dirty.
     * @param index - index to clear from(inclusive) to the end of the list
     */
    listRef?.current?.resetAfterIndex?.(index);
    row.toggleRowExpanded();
  }, [index, listRef, row]);

  const handleSingleClick = useCallback(() => {
    if ((row.canExpand || customSubRow) && expandOnParentRowClick) {
      toggleRowExpansion();
    } else {
      onRowClick?.(row.original);
    }
  }, [customSubRow, expandOnParentRowClick, toggleRowExpansion, onRowClick, row]);

  const hasExpandAction = useMemo(
    () => (row.canExpand || !!customSubRow) && expandOnParentRowClick,
    [row.canExpand, expandOnParentRowClick, customSubRow]
  );
  const hasSingleClickAction = useMemo(
    () => hasExpandAction || onRowClick,
    [hasExpandAction, onRowClick]
  );
  const hasDoubleClickAction = useMemo(
    () => !hasSingleClickAction && onRowDoubleClick,
    [hasSingleClickAction, onRowDoubleClick]
  );

  const canExpand = useMemo(() => row?.canExpand || !!customSubRow, [row, customSubRow]);

  const rowStyle = {
    ...style,
    ...(highlighted && {
      borderLeftColor: highlightBorderColor,
      borderRightColor: highlightBorderColor,
      backgroundColor: highlightBackgroundColor,
    }),
    ...(row.isExpanded && { width: '100%' }),
  };

  const rowProps = row.getRowProps({
    style: { ...rowStyle },
  });

  return (
    <>
      <div
        {...rowProps}
        className={clsx(styles.rowElementsContainer, {
          [styles.openRootParent]: row.depth === 0 && row?.isExpanded,
          [styles.activeAction]: hasSingleClickAction || hasDoubleClickAction,
          [styles.disabled]: disabled,
          [styles.highlighted]: highlighted,
        })}
        onClick={hasSingleClickAction ? handleSingleClick : undefined}
        onDoubleClick={hasDoubleClickAction ? () => onRowDoubleClick?.(row.original) : undefined}
        onMouseOver={() => onRowHover?.(row.original, true)}
        onMouseOut={() => onRowHover?.(row.original, false)}
        ref={ref}
      >
        {row.cells.map((cell, i) => {
          const styling = !customSubRow
            ? {
                // adjust column indent onExpand
                marginLeft: i === 0 ? cell.row.depth * 22 : 0,
                ...(i === (multiSelect ? 1 : 0) &&
                  (multiSelect || cell.row.depth) && {
                    width:
                      (cell.column.width as number) - (multiSelect ? 22 : 0) - cell.row.depth * 22,
                  }),
                ...(!canExpand &&
                  i === 1 &&
                  multiSelect && {
                    width: (cell.column.width as number) - cell.row.depth * 22,
                    marginLeft: -20,
                  }),
                ...(multiSelect && i === 0 && !canExpand && { marginLeft: 42 }),
              }
            : ({} as CSSProperties);
          return (
            <TreeTableCell
              showCellTitle={showCellTitle}
              style={{ ...styling, ...(cell?.column?.cellStyle as CSSProperties) }}
              key={cell.column.id}
              cell={cell}
              sectionOpen={canExpand && row?.isExpanded}
              canExpand={canExpand && i === 0}
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

export default forwardRef(TreeTableRow);
