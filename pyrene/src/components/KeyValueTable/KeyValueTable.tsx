import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './KeyValueTable.module.css';

type Row = {
  key: string;
  rowStyle?: CSSProperties;
  value: ReactNode;
};

export interface KeyValueTableProps {
  keyWidth?: number;
  /**
   * Rows definition: { key: 'key', value: 'value', rowStyle: {} }, where rowStyle is an object with css properties applied to the whole row
   */
  rows?: Row[];
  /**
   * Title of the table.
   */
  title?: string;
  /**
   * Theme of the table.
   */
  theme?: 'greyLabel' | 'border';
}

const KeyValueTable: React.FC<KeyValueTableProps> = ({
  title = '',
  rows = [{ key: 'key', value: 'value' }],
  keyWidth = 256,
  theme = 'border',
}: KeyValueTableProps) => (
  <div className={styles.keyValueTable}>
    {title && (
      <div className={clsx(styles.keyValueTableTitle, styles[`title-${theme}`])}>{title}</div>
    )}
    <table className={styles.keyValueBody}>
      <tbody>
        {rows &&
          rows.map((row) => (
            <tr
              className={clsx(styles.keyValueRow, styles[`row-${theme}`])}
              style={row.rowStyle}
              key={row.key}
            >
              <td
                className={clsx(styles.keyValueCellKey, styles[`key-${theme}`])}
                style={{ width: keyWidth, minWidth: keyWidth, maxWidth: keyWidth }}
              >
                {row.key}
              </td>
              <td className={styles.keyValueCellValue}>{row.value}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

KeyValueTable.displayName = 'KeyValueTable';

export default KeyValueTable;
