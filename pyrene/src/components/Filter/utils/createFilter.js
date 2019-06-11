/* eslint-disable import/prefer-default-export */

const isNullFilter = (type, value) => {
  switch (type) {
    case 'text':
      return value === null || value === '';
    case 'singleSelect':
      return typeof value === 'undefined' || typeof value.value === 'undefined';
    case 'multiSelect':
      return typeof value === 'undefined' || value.length === 0;
    default:
      return true;
  }
};

const getSubstringFunc = accessor => (value, data) => typeof data[accessor] !== 'undefined' && data[accessor].toLowerCase().includes(value.toLowerCase());

const getEqualFunc = accessor => (value, data) => typeof data[accessor] !== 'undefined' && data[accessor] === value;

const getSingleFilterFunc = (filterDefinition, filterValue) => (data) => {
  switch (filterDefinition.type) {
    case 'text': {
      const filterFunc = filterDefinition.customFilter
        ? filterDefinition.customFilter
        : getSubstringFunc(filterDefinition.accessor);

      return filterFunc(filterValue, data);
    }
    case 'singleSelect': {

      const filterFunc = filterDefinition.customFilter
        ? filterDefinition.customFilter
        : getEqualFunc(filterDefinition.accessor);

      return filterFunc(filterValue.value, data);
    }
    case 'multiSelect': {
      const filterFunc = filterDefinition.customFilter
        ? filterDefinition.customFilter
        : getEqualFunc(filterDefinition.accessor);

      return filterValue.reduce((acc, currValue) => acc || filterFunc(currValue.value, data), false);
    }
    default:
      return data;
  }
};

const getCombinedFilterFunc = (filterDefinitions, filterValues) => data => filterDefinitions
  .filter(f => typeof filterValues[f.accessor] !== 'undefined')
  .filter(f => !isNullFilter(f.type, filterValues[f.accessor]))
  .reduce((acc, f) => acc && getSingleFilterFunc(f, filterValues[f.accessor])(data), true);

const filter = (filterDefinitions, filterValues, data) => {
  const combinedFilter = getCombinedFilterFunc(filterDefinitions, filterValues);
  return data.filter(d => combinedFilter(d));
};

const getOptionsFromData = (optionsAccessors, data) => {
  const uniqueValueLabels = data.reduce((a, c) => {
    const value = optionsAccessors.value(c);
    const label = optionsAccessors.label(c);
    return { ...a, [value]: label };
  }, {});
  return Object.entries(uniqueValueLabels).reduce((arr, [value, label]) => arr.concat({ value, label }), []);
};

const getFilterProps = (filterDefinitions, data) => filterDefinitions
  .filter(f => f.type !== null)
  .map(f => ({
    filterKey: f.accessor,
    label: f.label,
    type: f.type,
    options: f.options ? f.options : (f.optionsAccessors && data) ? getOptionsFromData(f.optionsAccessors, data) : undefined, // eslint-disable-line no-nested-ternary
    defaultValue: f.defaultValue,
  }));

export const createSimpleFilter = filterDefinitions => ({
  filterProps: getFilterProps(filterDefinitions),
  filterFunc: (filterValues, data) => filter(filterDefinitions, filterValues, data),
});

export const createDataFilter = (filterDefinitions, data) => ({
  filterProps: getFilterProps(filterDefinitions, data),
  filteredData: filterValues => filter(filterDefinitions, filterValues, data),
});
