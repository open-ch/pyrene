import uniqid from 'uniqid';

export default class TreeTableUtils {

  static EMPTY_SET = new Set();

  static prepareColumnToggle = columns => columns.map((col, index) => {
    if (index === 0) {
      return { ...col };
    }
    return (
      { ...col, hidden: col.initiallyHidden }
    );
  });

  static updateSubRowDetails(row, parentTreeDepth, getRowKey) {
    const treeDepth = parentTreeDepth || 0;
    row.children.forEach((sr) => {
      // eslint-disable-next-line
      if (!sr._treeDepth) {
        // eslint-disable-next-line
        sr._parent = row;
        // eslint-disable-next-line
        sr._treeDepth = treeDepth + 1;
        // eslint-disable-next-line
        sr._rowId = getRowKey(sr) || uniqid();
      }
    });
  }

  static initialiseRootData(data, getRowKey) {
    return data.map((row) => {
      // eslint-disable-next-line
      row._treeDepth = 0;
      // eslint-disable-next-line
      row._rowId = getRowKey(row) || uniqid();
      return row;
    });
  }

  static _getRowChildren(row) {
    if (!row.children) {
      return [];
    }
    const children = [...row.children];
    // eslint-disable-next-line no-underscore-dangle
    row.children.forEach(child => children.push(...TreeTableUtils._getRowChildren(child)));
    return children;
  }

  static handleAllRowExpansion(rows, tableState, getRowKey) {
    // console.log(rows, tableState, getRowKey);
    let newTableState = tableState;
    // do the single row and then do all the children right after that
    rows.forEach((row) => {
      if (row.children) {
        newTableState = TreeTableUtils.handleRowExpandChange(row, newTableState, getRowKey);
        newTableState = TreeTableUtils.handleAllRowExpansion(row.children, newTableState, getRowKey);
      }
    });
    return newTableState;
  }

  static handleRowExpandChange(row, tableState, getRowKey) {
    const {
      expanded,
      rows,
    } = tableState;
    let newRows = [...rows];
    const { _rowId: rowKey } = row;
    const isExpanded = expanded[rowKey];
    expanded[rowKey] = !isExpanded;
    const subRows = row.children;
    const index = rows.indexOf(row);
    if (!isExpanded) {
      // eslint-disable-next-line no-underscore-dangle
      TreeTableUtils.updateSubRowDetails(row, row._treeDepth, getRowKey);
      newRows.splice(index + 1, 0, ...subRows);
    } else {
      // eslint-disable-next-line no-underscore-dangle
      const rowChildren = TreeTableUtils._getRowChildren(row);
      newRows = rows.filter(oldRow => !rowChildren.includes(oldRow));
      // eslint-disable-next-line no-underscore-dangle
      rowChildren.forEach(child => delete expanded[child._rowId]);
    }

    return {
      expanded,
      rows: newRows,
    };
  }

}
