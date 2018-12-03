export default class TreeTableUtils {
  static expandAllParentSectionsFor = (rowIndex) => {
    let i;
    const parentIndices = [];
    for (i = rowIndex.split('.').length; i > 1; i -= 1) {
      parentIndices.push(rowIndex.split('.').slice(-i).join('.'));
    }
    return parentIndices;
  };
}