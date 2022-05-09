import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import { Cell } from 'react-table-7';

import styles from './TreeTableCell.module.css';

interface TreeTableCellProps<R> {
  onExpandClick: () => void;
  canExpand?: boolean;
  sectionOpen?: boolean;
  style?: CSSProperties;
  cell: Cell;
}

function TreeTableCell<R extends object = {}>({
  onExpandClick,
  canExpand = false,
  sectionOpen = false,
  style,
  cell,
}: TreeTableCellProps<R>): React.ReactElement<TreeTableCellProps<R>> {
  return (
      <div
        {...cell.getCellProps({style})}
        className={styles.treeTableCell}
        title={`${cell?.value ?? cell.column.id}`}
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
        {cell.render('Cell')}
      </div>
  );
}

TreeTableCell.displayName = 'TreeTableCell';

export default TreeTableCell;
