import uniqid from 'uniqid';

export default class TreeTableUtils {

  static prepareColumnToggle = (columns) => columns.map((col, index) => {
    if (index === 0) {
      return { ...col };
    }
    return (
      { ...col, hidden: col.initiallyHidden }
    );
  });

  static updateSubRowDetails(row, getRowKey) {
    // eslint-disable-next-line no-underscore-dangle
    const treeDepth = row._treeDepth || 0;
    row.children.forEach((sr) => {
      // eslint-disable-next-line
      sr._treeDepth = treeDepth + 1;
      // eslint-disable-next-line
      sr._rowId = getRowKey(sr) || uniqid();

      if (sr.children) {
        this.updateSubRowDetails(sr, getRowKey);
      }
    });
  }

  static initialiseRootData(data, getRowKey) {
    return data.map((row) => {
      // eslint-disable-next-line
      row._treeDepth = 0;
      // eslint-disable-next-line
      row._rowId = getRowKey(row) || uniqid();

      if (row.children) {
        this.updateSubRowDetails(row, getRowKey);
      }

      return row;
    });
  }

  static _getRowChildren(row) {
    if (!row.children) {
      return [];
    }
    const children = [...row.children];
    // eslint-disable-next-line no-underscore-dangle
    row.children.forEach((child) => children.push(...TreeTableUtils._getRowChildren(child)));
    return children;
  }

  static handleAllRowExpansion(rows, tableState) {

    let newTableState = tableState;
    // do the single row and then do all the children right after that
    rows.forEach((row) => {
      if (row.children) {
        newTableState = TreeTableUtils.handleRowExpandChange(row, newTableState);
        newTableState = TreeTableUtils.handleAllRowExpansion(row.children, newTableState);
      }
    });
    return newTableState;
  }

  static handleRowExpandChange(row, tableState) {
    const {
      expanded,
      rows,
    } = tableState;
    let newRows = [...rows];
    const { _rowId: rowKey } = row;
    const isExpanded = expanded[rowKey];
    const subRows = row.children;
    const index = rows.indexOf(row);
    if (!isExpanded) {
      expanded[rowKey] = true;
      newRows.splice(index + 1, 0, ...subRows);
    } else {
      delete expanded[rowKey];
      // eslint-disable-next-line no-underscore-dangle
      const rowChildren = TreeTableUtils._getRowChildren(row);
      newRows = rows.filter((oldRow) => !rowChildren.includes(oldRow));
      // eslint-disable-next-line no-underscore-dangle
      rowChildren.forEach((child) => delete expanded[child._rowId]);
    }

    return {
      expanded,
      rows: newRows,
    };
  }

}
