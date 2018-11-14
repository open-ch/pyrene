export default class TableUtils {

  static mapColumnProps = (allColumnProps) => {

    const propMap = {
      cellRenderCallback: {
        rtPropName: 'Cell',
      },
      headerRenderCallback: {
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
        transformValue: value => !value,
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

    return allColumnProps.map(columnProps => {
      const remappedColumn = {};
      Object.keys(columnProps).map(key => {
        if (typeof propMap[key] !== 'undefined') {
          if (propMap[key].hasOwnProperty('transformValue')) {
            remappedColumn[propMap[key].rtPropName] = propMap[key].transformValue(columnProps[key]);
          } else {
            remappedColumn[propMap[key].rtPropName] = columnProps[key];
          }
        }
      });
      return remappedColumn;
    });
  };
}