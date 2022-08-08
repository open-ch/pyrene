import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './KeyValueTable.module.css';
import Banner from '../Banner/Banner';
import Loader from '../Loader/Loader';

const getNodeText = (node: ReactNode): string => {
  if (['string', 'number'].includes(typeof node)) return node as string;
  if (node instanceof Array) return node.map(getNodeText).join(' ');
  // @ts-ignore
  if (typeof node === 'object' && node) return getNodeText(node.props.children);
  return '';
};

type Row = {
  key: ReactNode;
  rowStyle?: CSSProperties;
  value: ReactNode;
  multiLine?: boolean;
};

export interface KeyValueTableProps {
  /**
   * Width of key column - only applied for 'border' theme
   */
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
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading?: boolean;
  /**
   * Sets the error message to be displayed
   */
  error?: string;
}

const KeyValueTable: React.FC<KeyValueTableProps> = ({
  title = '',
  rows = [{ key: 'key', value: 'value' }],
  keyWidth = 256,
  theme = 'border',
  error,
  loading,
}: KeyValueTableProps) => (
  <div className={styles.keyValueTable}>
    {title && (
      <div className={clsx(styles.keyValueTableTitle, styles[`title-${theme}`])}>{title}</div>
    )}
    {error ? (
      <div className={styles.centeredElement}>
        <Banner label={error} type="error" styling="inline" />
      </div>
    ) : loading ? (
      <div className={styles.centeredElement}>
        <Loader size="large" />
      </div>
    ) : (
      <table className={styles.keyValueBody}>
        <tbody>
          {rows &&
            rows.map((row) => (
              <tr
                className={clsx(styles.keyValueRow, styles[`row-${theme}`])}
                style={row.rowStyle}
                key={getNodeText(row.key)}
              >
                <td
                  className={clsx(styles.keyValueCellKey, styles[`key-${theme}`])}
                  style={
                    theme === 'border'
                      ? { width: keyWidth, minWidth: keyWidth, maxWidth: keyWidth }
                      : undefined
                  }
                  title={getNodeText(row.key)}
                >
                  {row.key}
                </td>
                <td
                  title={getNodeText(row.value)}
                  className={clsx(
                    styles.keyValueCellValue,
                    styles[`value-${theme}`],
                    row.multiLine && styles.multiLine
                  )}
                >
                  {row.value}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )}
  </div>
);

KeyValueTable.displayName = 'KeyValueTable';

export default KeyValueTable;
