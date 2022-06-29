export type ActionActiveOption = 'single' | 'multi' | 'always' | 'disabled' | 'no_selection';
export const handleActionAvailability = (
  selectionLength: number,
  actionType: ActionActiveOption
): boolean => {
  if (actionType === 'disabled') {
    return false;
  }

  // enable actions based on selection length and actionType
  if (actionType === 'always') {
    return true;
  }
  if (selectionLength === 1 && actionType === 'single') {
    return true;
  }
  if (selectionLength >= 1 && actionType === 'multi') {
    return true;
  }

  if (selectionLength === 0 && actionType === 'no_selection') {
    return true;
  }

  return false;
};
