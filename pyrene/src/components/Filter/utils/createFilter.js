/* eslint-disable import/prefer-default-export */

/*
 * Determines whether the value returned by a filter is to be ignored as it implies that the filter is not defined.
 */
export const isNullFilter = (type, value) => {
  switch (type) {
    case 'text':
      return value === null || value === '';
    case 'singleSelect':
      return !value;
    case 'multiSelect':
      return typeof value === 'undefined' || value.length === 0;
    default:
      return true;
  }
};

/*
 * Returns a function that filters datum.accessor for substrings (case-insensitive).
 */
export const getSubstringFunc = (accessor, negated) => (value, datum) => {
  if (typeof datum[accessor] !== 'undefined' && datum[accessor] !== null) {
    return negated ? !datum[accessor].toString().toLowerCase().includes(value.toString().toLowerCase())
      : datum[accessor].toString().toLowerCase().includes(value.toString().toLowerCase());
  }
  return false;
};

/*
 * Returns a function that filters datum.accessor.toString() for equal.
 * Value - from ui, keeps changing; datum - probably from backend, static, given in advance :)
 */
export const getEqualFunc = (accessor, negated) => (value, datum) => {

  const datumProp = typeof accessor === 'function' ? accessor(datum) : datum[accessor];

  switch (datumProp) {
    case undefined:
      // if the datum is not defined, I dont care about the value, just return false
      return false;
    case null:
    case 'null':
      // null equals 'null' no matter if comparing strings or primitive data types
      return (value === null || value === 'null');
    default:
      if (value === null || value === undefined || value === 'null') {
        return false;
      }

      // 0 === '0', 'true' === true etc. Reason for this is that url can handle only
      // strings and not other types and we want to pass filter values via url...
      return negated ? datumProp.toString() !== value.toString()
        : datumProp.toString() === value.toString();
  }
};

/*
 * Uses filter value and filter definition to create a filter based on accessor or customFilter.
 */
export const getSingleFilterFunc = (filterDefinition, filterValue) => (datum) => {
  switch (filterDefinition.type) {
    case 'text': {

      const filterFunc = filterDefinition.customFilter
        ? filterDefinition.customFilter
        : getSubstringFunc(filterDefinition.accessor, filterDefinition.negated);

      return filterFunc(filterValue, datum);
    }
    case 'singleSelect': {

      const filterFunc = filterDefinition.customFilter
        ? filterDefinition.customFilter
        : getEqualFunc(filterDefinition.accessor, filterDefinition.negated);

      return filterFunc(filterValue.value, datum);
    }
    case 'multiSelect': {
      const filterFunc = filterDefinition.customFilter
        ? filterDefinition.customFilter
        : getEqualFunc(filterDefinition.accessor, filterDefinition.negated);

      // Merges filterFunc by filter with or (starting with false), does at least one match?
      return filterValue.reduce((acc, currValue) => acc || filterFunc(currValue.value, datum), false);
    }
    default:
      return datum;
  }
};

/*
 * Merges all filter functions (per filter definition) into a combined function.
 */
export const getCombinedFilterFunc = (filterDefinitions, filterValues) => (datum) => {

  const filtersWithValues = filterDefinitions
    .filter((f) => typeof filterValues[f.id] !== 'undefined')
    .filter((f) => !isNullFilter(f.type, filterValues[f.id]));

  // Merges singleFilterFunc by filter with and (starting with true), do all match?
  return filtersWithValues.reduce((acc, f) => acc && getSingleFilterFunc(f, filterValues[f.id])(datum), true);
};

export const filter = (filterDefinitions, filterValues, data) => {
  if (filterValues) {
    const combinedFilter = getCombinedFilterFunc(filterDefinitions, filterValues);
    return data.filter((datum) => combinedFilter(datum));
  }
  return data;

};

/*
 * Goes through the data and gets the (unique) available options.
 */
export const getOptionsFromData = (optionsAccessors, data) => {
  // Find all {value: label:} in the data.
  const valueLabels = data.map((datum) => {
    const value = optionsAccessors.value(datum);
    const label = optionsAccessors.label(datum);

    return { value, label };
  });

  // Filter out valueLabels to only contain unique values
  return valueLabels.filter((elem, pos, arr) => arr.findIndex((e) => e.value === elem.value) === pos);
};


/*
 * Derives filter options from definition (they're very similar).
 * Optionally uses data to derive the options.
 */
export const getFilterProps = (filterDefinitions, data) => filterDefinitions
  .filter((f) => f.type !== null)
  .map((f) => ({
    id: f.id,
    label: f.label,
    type: f.type,
    sorted: f.sorted,
    negated: f.negated ? f.negated : undefined,
    options: f.options ? f.options : (f.optionsAccessors && data) ? getOptionsFromData(f.optionsAccessors, data) : undefined, // eslint-disable-line no-nested-ternary
  }));


/*
 * Creates a filter without data, returns filterProps and a function:
 * filterFunc(filterValues, data)
 */
export const createSimpleFilter = (filterDefinitions) => ({
  filterProps: getFilterProps(filterDefinitions),
  filterFunc: (filterValues, data) => filter(filterDefinitions, filterValues, data),
});

/*
 * Creates a filter based on data, returns filterProps and a function:
 * dataFilterFunc(filterValues)
 */
export const createDataFilter = (filterDefinitions, data) => ({
  filterProps: getFilterProps(filterDefinitions, data),
  dataFilterFunc: (filterValues) => filter(filterDefinitions, filterValues, data),
});
