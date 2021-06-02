import React, { CSSProperties, ReactNode } from 'react';
import styles from './keyValueTable.css';

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
  rows?: Row[]
  /**
   * Title of the table.
   */
  title?: string;
}

const KeyValueTable: React.FC<KeyValueTableProps> = ({
  title = '',
  rows = [{ key: 'key', value: 'value' }],
  keyWidth = 256,
}: KeyValueTableProps) => (
  <div className={styles.keyValueTable}>
    {title && (
      <div className={styles.keyValueTableTitle}>
        {title}
      </div>
    )}
    <table className={styles.keyValueBody}>
      <tbody>
        {rows.length > 0 && rows.map((row: Row) => (
          <tr
            className={styles.keyValueRow}
            style={row.rowStyle}
            key={row.key}
          >
            <td className={styles.keyValueCellKey} style={{ width: keyWidth, minWidth: keyWidth, maxWidth: keyWidth }}>
              {row.key}
            </td>
            <td className={styles.keyValueCellValue}>
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

KeyValueTable.displayName = 'Key Value Table';

export default KeyValueTable;
