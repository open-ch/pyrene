export default class TreeTableUtils {

  static prepareColumnToggle = columns => columns.map((col, index) => {
    if (index === 0) {
      return { ...col };
    }
    return (
      { ...col, hidden: col.initiallyHidden }
    );
  });

}
