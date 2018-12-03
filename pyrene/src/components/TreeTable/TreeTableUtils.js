export default class TreeTableUtils {

  static expandAllParentSectionsFor = (rowIndex) => {
    let i;
    const parentIndices = [];
    for (i = rowIndex.split('.').length; i > 1; i -= 1) {
      parentIndices.push(rowIndex.split('.').slice(-i).join('.'));
    }
    return parentIndices;
  };

  static prepareColumnToggle = columns => columns.map((col, index) => {
    if (index === 0) {
      return { ...col };
    }
    return (
      { ...col, hidden: col.initiallyHidden }
    );
  });

}
