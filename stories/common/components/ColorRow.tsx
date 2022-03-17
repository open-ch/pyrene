import React from 'react';
import clsx from 'clsx';

import ColorBox, { Size, StackPosition } from './ColorBox';
import styles from './ColorRow.module.css';

interface ColorType {
  bordered?: boolean;
  colorName?: string;
  darkFont?: boolean;
  infoLabel?: string;
  infoText?: string;
  name?: string;
  stack?: StackPosition;
}

interface ColorRowProps {
  columns?: number;
  description?: React.ReactNode;
  preColumns?: number;
  rowData?: { title: string; colors: ColorType[] }[];
  rowHeader?: { width: string; colors: ColorType[] };
  rowSize?: Size;
  showInfo?: 'fullInfo' | 'onlyTitles';
  title?: string;
}

const ColorRow: React.FC<ColorRowProps> = ({
  columns = 0,
  preColumns = 0,
  showInfo = 'fullInfo',
  rowSize = 'large',
  rowHeader,
  rowData,
  title,
  description,
}) => {
  // This is used to create column padding and is set as colSpan
  const spanNumber =
    columns - (rowHeader ? rowData.length + 1 : rowData.length) - (preColumns ? preColumns : 0);

  return (
    <div className={styles.colorRowContainer}>
      <table>
        {showInfo && (
          <thead>
            <tr>
              {title && (
                <th
                  style={{ width: rowHeader.width || 'auto' }}
                  className={clsx(styles.title, styles[rowSize], styles['base-column'])}
                >
                  {title}
                </th>
              )}
              {preColumns > 0 && <th colSpan={preColumns}>&nbsp;</th>}
              {rowHeader &&
                Object.keys(rowHeader).length > 0 &&
                showInfo &&
                rowData.map((element) => (
                  <th key={`${element.colors[0].name}-title`}>
                    <div className={clsx(styles.title, styles[rowSize])}>{element.title || ''}</div>
                  </th>
                ))}
            </tr>
          </thead>
        )}
        <tbody>
          <tr className={styles.colorRow}>
            {rowHeader && rowHeader.colors && (
              <td className={clsx(styles.rowHeader, styles[rowSize])}>
                <ColorBox
                  variableName={rowHeader.colors[0].name}
                  size={rowSize}
                  darkFont={rowHeader.colors[0].darkFont}
                  bordered={rowHeader.colors[0].bordered}
                  stackPosition={rowHeader.colors[0].stack}
                  infoBox={{
                    infoTitle: rowHeader.colors[0].colorName,
                    infoText: rowHeader.colors[0].infoText,
                    infoLabel: rowHeader.colors[0].infoLabel,
                  }}
                  centered={false}
                />
              </td>
            )}
            {preColumns > 0 && <td colSpan={preColumns} />}
            {rowData.map((element) => (
              <td key={`${element.colors[0].name}`}>
                {element.colors.map((color) => (
                  <ColorBox
                    variableName={color.name}
                    size={rowSize}
                    darkFont={color.darkFont}
                    bordered={color.bordered}
                    stackPosition={color.stack}
                    infoBox={
                      showInfo === 'fullInfo'
                        ? {
                            infoTitle: color.colorName,
                            infoText: color.infoText,
                            infoLabel: color.infoLabel,
                          }
                        : showInfo === 'onlyTitles' && color.colorName
                        ? { infoTitle: color.colorName }
                        : {}
                    }
                    key={color.name}
                  />
                ))}
              </td>
            ))}
            {spanNumber > 0 && <td colSpan={spanNumber} />}
          </tr>
        </tbody>
      </table>
      {description && <div className={styles.descriptionCell}>{description}</div>}
    </div>
  );
};

ColorRow.displayName = 'ColorRow';
export default ColorRow;
