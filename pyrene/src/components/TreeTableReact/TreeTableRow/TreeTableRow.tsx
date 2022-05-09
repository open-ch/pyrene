import React, { CSSProperties, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { Row } from 'react-table-7';

import styles from './TreeTableRow.module.css';
import TreeTableCell from '../TreeTableCell/TreeTableCell';

export type CellValue = string | number | boolean;

export interface TreeTableRowProps {
  row: Row;
  highlighted?: boolean;
  onRowClick?: (row?: Row['original']) => void;
  onRowDoubleClick?: (row?: Row['original']) => void;
  onRowHover?: ((row: {}, h: boolean) => void) | undefined;
  style?: CSSProperties;
  index: number;
  listRef: React.MutableRefObject<any>;
  expandOnParentRowClick?: boolean;
  multiSelect?: boolean;
}

function TreeTableRow<R extends object = {}>({
  row,
  highlighted,
  onRowClick,
  onRowDoubleClick,
  onRowHover,
  index,
  listRef,
  expandOnParentRowClick,
  style,
  multiSelect,
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
    if (row.canExpand && expandOnParentRowClick) {
      toggleRowExpansion();
    } else {
      onRowClick?.(row.original);
    }
  }, [row.canExpand]);

  const hasExpandAction = useMemo(
    () => row.canExpand && expandOnParentRowClick,
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

  return (
    <div
      {...row.getRowProps({ style })}
      className={clsx(
        styles.rowElementsContainer,
        {
          [styles.openRootParent]: row.depth === 0 && row?.isExpanded && parent,
          [styles.activeAction]: hasSingleClickAction || hasDoubleClickAction,
        },
        { [styles.highlighted]: highlighted }
      )}
      onClick={hasSingleClickAction ? handleSingleClick : undefined}
      onDoubleClick={
        hasDoubleClickAction
          ? () => onRowDoubleClick?.(row.original)
          : undefined
      }
      onMouseOver={() => onRowHover?.(row.original, true)}
      onMouseOut={() => onRowHover?.(row.original, false)}
    >
      {row.cells.map((cell, i) => {
        const shouldReplaceExpander =
          cell.column.id === 'expander' && !row?.canExpand && multiSelect;
        const styling = {
          marginLeft: i === 0 ? cell.row.depth * 24 : 0,
          // adjust column indent onExpand
          ...(i === nextToExpanderColumnIndex && {
            width:
              (cell.column.width as number) -
              cell.row.depth * 24 +
              (!row?.canExpand && multiSelect ? 16 : 0),
          }),
          // when there is no expander and we have multiselect leave the expander as a margin
          ...(shouldReplaceExpander && { width: 4 }),
        };
        return (
          <TreeTableCell
            style={{ ...styling, ...cell?.column?.cellStyle }}
            key={cell.column.id}
            cell={cell}
            sectionOpen={row?.canExpand && row?.isExpanded}
            canExpand={row?.canExpand && cell.column.id === 'expander'}
            onExpandClick={hasExpandAction ? () => null : toggleRowExpansion}
          />
        );
      })}
    </div>
  );
}

TreeTableRow.displayName = 'TreeTableRow';

export default TreeTableRow;
