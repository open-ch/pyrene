import React, { CSSProperties, useRef } from 'react';
import clsx from 'clsx';
import { Cell } from 'react-table-7';

import styles from './TreeTableCell.module.css';

interface TreeTableCellProps<R> {
  onExpandClick: () => void;
  canExpand?: boolean;
  sectionOpen?: boolean;
  style?: CSSProperties;
  cell: Cell;
  showCellTitle?: boolean;
}

function TreeTableCell<R extends object = {}>({
  onExpandClick,
  canExpand = false,
  sectionOpen = false,
  style,
  cell,
  showCellTitle,
}: TreeTableCellProps<R>): React.ReactElement<TreeTableCellProps<R>> {
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      {...cell.getCellProps({ style })}
      className={styles.treeTableCell}
      title={
        // eslint-disable-next-line no-nested-ternary
        cell?.column?.title
          ? `${cell.column.title?.(cell.value)}`
          : showCellTitle
          ? contentRef.current?.innerText ?? contentRef.current?.textContent ?? undefined
          : undefined
      }
    >
      {canExpand && (
        <div
          className={clsx(
            styles.pivotIcon,
            { [styles.sectionOpen]: sectionOpen },
            'pyreneIcon-chevronDown'
          )}
          onClick={onExpandClick}
        />
      )}
      <div
        className={cell.column.id !== 'selection' ? styles.cellContent : styles.checkbox}
        ref={(element) => (contentRef.current = element)}
      >
        {cell.render('Cell')}
      </div>
    </div>
  );
}

TreeTableCell.displayName = 'TreeTableCell';

export default TreeTableCell;
