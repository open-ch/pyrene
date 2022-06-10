import React from 'react';
import { HeaderGroup } from 'react-table-7';

import styles from './TreeTableHeader.module.css';
import ResizeIcon from '../../Table/images/resize.svg';

export interface TreeTableHeaderProps<R> {
  headerGroups: HeaderGroup[];
  resizable?: boolean;
}

function TreeTableHeader<R extends object = {}>({
  headerGroups,
  resizable,
}: TreeTableHeaderProps<R>): React.ReactElement<TreeTableHeaderProps<R>> {
  return (
    <>
      {headerGroups.map((headerGroup) => {
        const lastNotHiddenIndex = headerGroup.headers
          .map((col) => col.isVisible + '')
          .lastIndexOf('true');
        return (
          <div className={styles.treeTableHeader} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => {
              return (
                <div
                  className={styles.treeTableHeaderCell}
                  {...column.getHeaderProps({ style: column?.headerStyle })}
                >
                  {column.render('Header')}
                  {column.canResize && resizable && index !== lastNotHiddenIndex && (
                    <div {...column.getResizerProps()} className={styles.resizer}>
                      <ResizeIcon />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default TreeTableHeader;
