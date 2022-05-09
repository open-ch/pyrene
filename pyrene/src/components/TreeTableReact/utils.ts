import { Row, Column } from 'react-table-7'

export const isFlatTree = (rows: Row[], getSubRowsKey?: (row: Row) => Row[]) => rows
  .every((row) => {
    const subRow = getSubRowsKey?.(row) ?? row?.subRows
    return !(subRow && subRow.length) && row.depth === 0
  })

export const prepareColumnToggle = (columns: Column[]): Column[] => columns.map((col, index) => {
  if (index === 0) {
    return { ...col };
  }
  return (
    { ...col, isVisible: col?.initiallyHidden }
  );
});

export const updateSubRowDetails = (row: Row) => {
  (row?.subRows).forEach((sr) => {
    //@ts-ignore
    sr.original._getParent = function () {
      return row?.original;
    };
    if (sr?.subRows) {
      updateSubRowDetails(sr);
    }
  });
}

export const initializeRootData = (row: Row
) => {
  if (row?.subRows) {
    updateSubRowDetails(row);
  }
  return row;
}

function getRowParents(rowId: string) {
  const bottomToTopParents = [];
  let checkedRowId = rowId
  const parentRowId = rowId.split('.').slice(0, -1).join('.'); // string
  while (parentRowId) {
    bottomToTopParents.push(parentRowId);
    checkedRowId = parentRowId;
  }
  return [...bottomToTopParents].reverse();
}

export function handleExpandAllParentsOfRowById(toggleRowExpanded: (id: string, value?: boolean | undefined) => void, rowId: string) {
  const rowParents = getRowParents(rowId);
  rowParents.forEach((parent) => {
    toggleRowExpanded(parent, true)
  });
}

export function getFirstLevelParentRowId(rowId: string) {
  return rowId.split('.')[0]
}

export const scrollbarWidth = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.setAttribute(
    'style',
    'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;'
  );
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};