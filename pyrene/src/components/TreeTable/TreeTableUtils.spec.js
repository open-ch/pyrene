import TreeTableUtils from './TreeTableUtils';

/* eslint-disable no-underscore-dangle */

describe('TreeTableUtils', () => {

  const data = [
    {
      key: 'lol',
      children: [
        {
          key: 'child1',
          children: [
            {
              key: 'child2',
            },
          ],
        },
      ],
    },
    {
      key: 'lala',
      children: [
        {
          key: 'lala1',
          children: [
            {
              key: 'lala2',
            },
          ],
        },
      ],
    },
    {
      keyMissing: true,
    },
  ];

  const getRowKey = (row) => row.key;

  describe('initialiseRootData', () => {

    it('should initialise root data with keys', () => {
      const initialised = TreeTableUtils.initialiseRootData(data, getRowKey);
      expect(initialised[0]._rowId).toEqual(data[0].key);
      expect(initialised[0]._treeDepth).toEqual(0);
      expect(initialised[1]._rowId).toEqual(data[1].key);
      expect(initialised[1]._treeDepth).toEqual(0);
      expect(initialised[2]._rowId).toBeTruthy();
      expect(initialised[2]._treeDepth).toEqual(0);

      expect(initialised[0].children[0]._rowId).toBe(data[0].children[0].key);
      expect(initialised[0].children[0]._treeDepth).toEqual(1);
      expect(initialised[0].children[0].children[0]._rowId).toBe(data[0].children[0].children[0].key);
      expect(initialised[0].children[0].children[0]._treeDepth).toEqual(2);

      expect(initialised[0]._getParent()).toBe(null);
      expect(initialised[0].children[0]._getParent()).toBe(initialised[0]);
      expect(initialised[0].children[0].children[0]._getParent()).toBe(initialised[0].children[0]);
    });

  });

  describe('_getRowChildren', () => {

    it('should get all nested children', () => {
      const children = TreeTableUtils._getRowChildren(data[0]);
      expect(children.includes(data[0].children[0])).toBeTruthy();
      expect(children.includes(data[0].children[0].children[0])).toBeTruthy();
    });

    it('should return empty array if no children', () => {
      const children = TreeTableUtils._getRowChildren(data[2]);
      expect(children).toHaveLength(0);
    });

  });

  describe('handleRowExpandChange', () => {

    it('should open all children one by one and close all children on parent close', () => {
      const rows = TreeTableUtils.initialiseRootData(data, getRowKey);
      let tableState = {
        rows,
        expanded: {},
      };
      const firstRow = rows[0];
      const firstChild = firstRow.children[0];
      const firstGrandChild = firstRow.children[0].children[0];

      // open the parent row
      tableState = TreeTableUtils.handleRowExpandChange(firstRow, tableState);
      expect(tableState.expanded[firstRow._rowId]).toBe(true);
      expect(tableState.expanded[firstChild._rowId]).toBe(undefined);
      expect(tableState.expanded[firstGrandChild._rowId]).toBe(undefined);
      expect(tableState.rows.includes(firstChild)).toBe(true);
      expect(tableState.rows.includes(firstGrandChild)).toBe(false);
      // open the child row
      tableState = TreeTableUtils.handleRowExpandChange(firstChild, tableState);
      expect(tableState.expanded[firstRow._rowId]).toBe(true);
      expect(tableState.expanded[firstChild._rowId]).toBe(true);
      expect(tableState.expanded[firstGrandChild._rowId]).toBe(undefined);
      expect(tableState.rows.includes(firstChild)).toBe(true);
      expect(tableState.rows.includes(firstGrandChild)).toBe(true);

      // close parent row, thus expect children to be removed as well
      tableState = TreeTableUtils.handleRowExpandChange(firstRow, tableState);
      expect(tableState.expanded[firstRow._rowId]).toBe(undefined);
      expect(tableState.expanded[firstChild._rowId]).toBe(undefined);
      expect(tableState.expanded[firstGrandChild._rowId]).toBe(undefined);
      expect(tableState.rows.includes(firstChild)).toBe(false);
      expect(tableState.rows.includes(firstGrandChild)).toBe(false);
    });

  });

  describe('handleAllRowExpansion', () => {

    it('should open all rules', () => {
      const rows = TreeTableUtils.initialiseRootData(data, getRowKey);
      let tableState = {
        rows,
        expanded: {},
      };
      expect(tableState.rows).toHaveLength(3);
      tableState = TreeTableUtils.handleAllRowExpansion(rows, tableState);
      // expect the two nested child rows to be shown
      expect(tableState.rows).toHaveLength(7);
      // expect to not have the rows without children to be "expanded"
      expect(Object.keys(tableState.expanded).sort()).toEqual([
        rows[0]._rowId,
        rows[0].children[0]._rowId,
        rows[1]._rowId,
        rows[1].children[0]._rowId,
      ].sort());
    });

  });

  describe('_getRowParents', () => {
    const initialised = TreeTableUtils.initialiseRootData(data, getRowKey);
    it('should return correct parents of row', () => {
      const rootParents = TreeTableUtils._getRowParents(initialised[0]);
      expect(rootParents).toHaveLength(0);
      const level1Parents = TreeTableUtils._getRowParents(initialised[0].children[0]);
      expect(level1Parents).toEqual([initialised[0]]);
      const level2Parents = TreeTableUtils._getRowParents(initialised[0].children[0].children[0]);
      expect(level2Parents).toEqual([initialised[0], initialised[0].children[0]]);
    });
  });

  describe('_handleExpandAllParentsOfRow', () => {
    const initialised = TreeTableUtils.initialiseRootData(data, getRowKey);
    it('should open first level rows', () => {
      let tableState = {
        rows: initialised,
        expanded: {},
      };
      const rowToOpen = initialised[0].children[0];
      const level1Parents = TreeTableUtils._getRowParents(rowToOpen);
      expect(tableState.rows).toHaveLength(3);
      tableState = TreeTableUtils._handleExpandAllParentsOfRow(rowToOpen, tableState);
      expect(tableState.rows).toHaveLength(4);
      level1Parents.forEach((parent) => expect(tableState.expanded[parent._rowId]).toBe(true));
    });
    it('should open second level rows', () => {
      let tableState = {
        rows: initialised,
        expanded: {},
      };
      const rowToOpen = initialised[0].children[0].children[0];
      const level2Parents = TreeTableUtils._getRowParents(rowToOpen);
      expect(tableState.rows).toHaveLength(3);
      tableState = TreeTableUtils._handleExpandAllParentsOfRow(rowToOpen, tableState);
      expect(tableState.rows).toHaveLength(5);
      level2Parents.forEach((parent) => expect(tableState.expanded[parent._rowId]).toBe(true));
    });
  });

  describe('_findRowFromTree', () => {
    const rows = TreeTableUtils.initialiseRootData(data, getRowKey);
    it('should return null if row doesnt exist', () => {
      const row = TreeTableUtils._findRowFromTree('___fake___', rows);
      expect(row).toBe(null);
    });
    it('should return root level row', () => {
      const rowToFind = rows[0];
      const row = TreeTableUtils._findRowFromTree(rowToFind._rowId, rows);
      expect(row).toBe(rowToFind);
    });
    it('should return level 1 row', () => {
      const rowToFind = rows[0].children[0];
      const row = TreeTableUtils._findRowFromTree(rowToFind._rowId, rows);
      expect(row).toBe(rowToFind);
    });
    it('should return level 2 row', () => {
      const rowToFind = rows[0].children[0].children[0];
      const row = TreeTableUtils._findRowFromTree(rowToFind._rowId, rows);
      expect(row).toBe(rowToFind);
    });
  });

  describe('handleExpandAllParentsOfRowById', () => {
    const initialised = TreeTableUtils.initialiseRootData(data, getRowKey);
    it('should not open anything since row does not exist', () => {
      const tableState = {
        rows: initialised,
        expanded: {},
      };
      const newTableState = TreeTableUtils.handleExpandAllParentsOfRowById('__fake__', tableState);
      expect(newTableState).toBe(tableState);
      expect(newTableState.rows).toBe(tableState.rows);
      expect(newTableState.expanded).toBe(tableState.expanded);
    });
    it('should not open all intermediate parents', () => {
      const tableState = {
        rows: initialised,
        expanded: {},
      };
      expect(tableState.rows).toHaveLength(3);
      const rowToOpen = initialised[0].children[0].children[0];
      const newTableState = TreeTableUtils.handleExpandAllParentsOfRowById(rowToOpen._rowId, tableState);
      const parents = TreeTableUtils._getRowParents(rowToOpen);
      parents.forEach((parent) => expect(newTableState.expanded[parent._rowId]).toBe(true));
      expect(newTableState.rows).toHaveLength(5);
    });
  });

  describe('functional tests', () => {

    it('should open one and then expand all correctly', () => {
      const rows = TreeTableUtils.initialiseRootData(data, getRowKey);
      let tableState = {
        rows,
        expanded: {},
      };
      expect(tableState.rows).toHaveLength(3);

      // open one row
      tableState = TreeTableUtils.handleRowExpandChange(rows[0], tableState);
      expect(tableState.rows).toHaveLength(4);

      // open another row
      tableState = TreeTableUtils.handleRowExpandChange(rows[1], tableState);
      expect(tableState.rows).toHaveLength(5);

      // open all and expect the correct number of rows to be there
      tableState = TreeTableUtils.handleAllRowExpansion(data, { expanded: {}, rows: data });
      // expect the two nested child rows to be shown
      expect(tableState.rows).toHaveLength(7);
      // expect to not have the rows without children to be "expanded"
      expect(Object.keys(tableState.expanded).sort()).toEqual([
        rows[0]._rowId,
        rows[0].children[0]._rowId,
        rows[1]._rowId,
        rows[1].children[0]._rowId,
      ].sort());

      // close one of the rows and expect the correct number of rows to be there
      tableState = TreeTableUtils.handleRowExpandChange(rows[1], tableState);
      expect(tableState.rows).toHaveLength(5);

      expect(Object.keys(tableState.expanded).sort()).toEqual([
        rows[0]._rowId,
        rows[0].children[0]._rowId,
      ].sort());
    });

  });

});
