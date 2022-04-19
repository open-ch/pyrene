import React from 'react';
import Tooltip from '../Tooltip/Tooltip';
// @ts-ignore
import styles from './TableUtils.module.css';

export default class TableUtils {

  static mapColumnProps = (allColumnProps) => {
    const propMap = {
      cellRenderCallback: {
        rtPropName: 'Cell',
      },
      headerName: {
        rtPropName: 'Header',
        transformValue: (value, columnProps) => (columnProps.headerTooltip ? (
          <Tooltip label={columnProps.headerTooltip}>
            <div className={styles.headerNameContainer}>{columnProps.headerName}</div>
          </Tooltip>
        ) : (
          value
        )),
      },
      accessor: {
        rtPropName: 'accessor',
      },
      id: {
        rtPropName: 'id',
      },
      sortable: {
        rtPropName: 'sortable',
      },
      sortFunction: {
        rtPropName: 'sortMethod',
      },
      initiallyHidden: {
        rtPropName: 'show',
        transformValue: (value) => (typeof value !== 'undefined' ? !value : undefined),
      },
      width: {
        rtPropName: 'width',
      },
      cellStyle: {
        rtPropName: 'style',
      },
      headerStyle: {
        rtPropName: 'headerStyle',
      },
      resizable: {
        rtPropName: 'resizable',
      },
    };

    return allColumnProps.map((columnProps) => Object.keys(columnProps).reduce((remappedColumns, key) => {
      if (typeof propMap[key] !== 'undefined') {
        if (propMap[key].hasOwnProperty('transformValue')) { // eslint-disable-line no-prototype-builtins
          remappedColumns[propMap[key].rtPropName] = propMap[key].transformValue( // eslint-disable-line no-param-reassign
            columnProps[key],
            columnProps,
          );
        } else {
          remappedColumns[propMap[key].rtPropName] = columnProps[key]; // eslint-disable-line no-param-reassign
        }
      }
      return remappedColumns;
    }, {}));
  };

}
