export default class TableUtils {

  static mapColumnProps = (allColumnProps) => {

    const propMap = {
      cellRenderCallback: {
        rtPropName: 'Cell',
      },
      headerName: {
        rtPropName: 'Header',
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
      resizable: {
        rtPropName: 'resizable',
      },
      initiallyHidden: {
        rtPropName: 'show',
        transformValue: value => (typeof value !== 'undefined' ? !value : undefined),
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
    };

    return allColumnProps.map(columnProps => Object.keys(columnProps).reduce((remappedColumns, key) => {
      if (typeof propMap[key] !== 'undefined') {
        if (propMap[key].hasOwnProperty('transformValue')) { // eslint-disable-line no-prototype-builtins
          remappedColumns[propMap[key].rtPropName] = propMap[key].transformValue(columnProps[key]); // eslint-disable-line no-param-reassign
        } else {
          remappedColumns[propMap[key].rtPropName] = columnProps[key]; // eslint-disable-line no-param-reassign
        }
      }
      return remappedColumns;
    }, {}));
  };

}
