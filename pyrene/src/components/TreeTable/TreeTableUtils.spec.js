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
      expect(initialised[1]._rowId).toEqual(data[1].key);
      expect(initialised[2]._rowId).toBeTruthy();

      expect(initialised[0].children[0]._rowId).toBe(undefined);
      expect(initialised[0].children[0].children[0]._rowId).toBe(undefined);
    });

  });

  describe('_getRowChildren', () => {

    it('should get all nested children', () => {
      const children = TreeTableUtils._getRowChildren(data[0]);
      expect(children.includes(data[0].children[0])).toBeTruthy();
      expect(children.includes(data[0].children[0].children[0])).toBeTruthy();
    });

    it('should return empty array if no children', () => {
      const children = TreeTableUtils._getRowChildren(data[1]);
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
      expect(firstRow._treeDepth).toBe(0);
      expect(firstChild._rowId).toBe(undefined);
      expect(firstChild._treeDepth).toBe(undefined);

      // open the parent row
      tableState = TreeTableUtils.handleRowExpandChange(firstRow, tableState, getRowKey);
      expect(firstChild._rowId).toBeTruthy();
      expect(tableState.expanded[firstRow._rowId]).toBe(true);
      expect(tableState.expanded[firstChild._rowId]).toBe(undefined);
      expect(firstChild._treeDepth).toBe(1);
      expect(tableState.expanded[firstGrandChild._rowId]).toBe(undefined);
      expect(firstGrandChild._treeDepth).toBe(undefined);
      expect(tableState.rows.includes(firstChild)).toBe(true);
      expect(tableState.rows.includes(firstGrandChild)).toBe(false);
      // open the child row
      tableState = TreeTableUtils.handleRowExpandChange(firstChild, tableState, getRowKey);
      expect(tableState.expanded[firstRow._rowId]).toBe(true);
      expect(tableState.expanded[firstChild._rowId]).toBe(true);
      expect(tableState.expanded[firstGrandChild._rowId]).toBe(undefined);
      expect(firstGrandChild._treeDepth).toBe(2);
      expect(tableState.rows.includes(firstChild)).toBe(true);
      expect(tableState.rows.includes(firstGrandChild)).toBe(true);

      // close parent row, thus expect children to be removed as well
      tableState = TreeTableUtils.handleRowExpandChange(firstRow, tableState, getRowKey);
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
      tableState = TreeTableUtils.handleAllRowExpansion(rows, tableState, getRowKey);
      // expect the two nested child rows to be shown
      expect(tableState.rows).toHaveLength(5);
      // expect to not have the rows without children to be "expanded"
      expect(Object.keys(tableState.expanded).sort()).toEqual([rows[0]._rowId, rows[0].children[0]._rowId].sort());
    });

  });

});
