import React, { CSSProperties, FC, ReactNode } from 'react';
import './keyValueTable.css';

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

const KeyValueTable: FC<KeyValueTableProps> = ({
  title = '',
  rows = [{ key: 'key', value: 'value' }],
  keyWidth = 256,
}: KeyValueTableProps) => (
  <div styleName="keyValueTable">
    {title && (
      <div styleName="keyValueTableTitle">
        {title}
      </div>
    )}
    <table styleName="keyValueBody">
      <tbody>
        {rows.length > 0 && rows.map((row: Row) => (
          <tr
            styleName="keyValueRow"
            style={row.rowStyle}
            key={row.key}
          >
            <td styleName="keyValueCellKey" style={{ width: keyWidth, minWidth: keyWidth, maxWidth: keyWidth }}>
              {row.key}
            </td>
            <td styleName="keyValueCellValue">
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
