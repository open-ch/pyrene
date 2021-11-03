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
      // eslint-disable-next-line
      sr._getParent = () => row;

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
      // eslint-disable-next-line
      row._getParent = () => null;

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

  static _getRowParents(row) {
    const bottomToTopParents = [];
    let checkedRow = row;

    // eslint-disable-next-line no-underscore-dangle
    while (checkedRow._getParent()) {
      // eslint-disable-next-line no-underscore-dangle
      const parent = checkedRow._getParent();
      bottomToTopParents.push(parent);
      checkedRow = parent;
    }

    return [...bottomToTopParents].reverse();
  }

  static _handleExpandAllParentsOfRow(row, tableState) {
    let newTableState = tableState;
    const rowParents = this._getRowParents(row);
    rowParents.forEach((parent) => {
      // eslint-disable-next-line no-underscore-dangle
      const isRowOpen = newTableState.expanded[parent._rowId];
      if (!isRowOpen) {
        newTableState = this.handleRowExpandChange(parent, newTableState);
      }
    });
    return newTableState;
  }

  static _findRowFromTree(rowId, rows) {
    // eslint-disable-next-line no-restricted-syntax
    for (const row of rows) {
      // eslint-disable-next-line no-underscore-dangle
      if (row._rowId === rowId) {
        return row;
      }
      if (row.children) {
        const recursiveResult = this._findRowFromTree(rowId, row.children);
        if (recursiveResult) {
          return recursiveResult;
        }
      }
    }
    return null;
  }

  static handleExpandAllParentsOfRowById(rowId, tableState) {
    const {
      rows,
    } = tableState;
    const rowToOpen = this._findRowFromTree(rowId, rows);
    if (rowToOpen) {
      return this._handleExpandAllParentsOfRow(rowToOpen, tableState);
    }
    return tableState;
  }

  static getFirstLevelParentRowId(rowId, { rows }) {
    const rowParents = this._getRowParents(this._findRowFromTree(rowId, rows));
    if (rowParents.length) {
      // eslint-disable-next-line no-underscore-dangle
      return rowParents[0]._rowId;
    }
    return rowId;
  }

}
