import React, { FunctionComponent } from 'react';
import FilterBar from './FilterComponents/FilterBar';
import FilterButton from './FilterComponents/FilterButton';
import styles from './Filter.module.css';
import { Filter as FilterType, Filters } from './types';

export interface FilterProps {
  /**
   * True if filter should be displayed but in disabled state (filters might be
   * still undefined)
   */
  disabled?: boolean;
  /**
   * Sets the available filters.
   * Type: [{
   *  label: string (required),
   *  type: oneOf('singleSelect', 'multiSelect', 'text') (required),
   *  key: string (required),
   *  options: array of values from which user can choose in single/multiSelect
   * }]
   */
  filters?: Array<FilterType>;
  /**
   * Filter values object, with:
   * keys: same as the `id` in filterDefinition
   * values: the users input; for single & multiSelect value contains of both
   * value and label! In case of multiSelect, value can consist of multiple
   * objects {value: , label: } in an array use {} for passing empty filterValues
   * */
  filterValues: Filters;
  /**
   * True to enable the visual components to handle negated filters. Defaults to false
   */
  negatable?: boolean;
  /**
   * Called when the user clicks on the apply button. Contains all the filter information as its argument.
   */
  onFilterSubmit?: (filterValues: Filters, filterNegatedKeys: Array<FilterType['id']>) => void;
}

/**
 * The filter is to display large amounts of data in manageable portions.
 * It is mostly used in data tables.
 */
// Structure:
// Filter: wrapper for disabled and enabled filter
//  |- FilterButton: only disabled filter button, placeholder
//  |- FilterBar: enabled button together with tags incl clearAll button (if some results are filtered)
//              : expects filterValues from MC component, filterValues are either null or an object where each object property is a filtered id (if id is not used then the whole prop is null)
//              : example: filterValues = null if nothing filtered (clear filter), filterValues = {city: 'Brno', country: {value: 'CZ', label: 'CZ'}} if all possible inputs are filtered, filterValues = {city: 'Brno'} if country is not filtered
//    |- FilterTag: if input is filtered, tag (grey box) is displayed
//    |- FilterPopoverButton: wrapper for opening/closing the Filter dropdown
//      |- FilterPopover: the Filter dropdown
//        |- FilterOptions: inputs, based on type (text/singleSelect/multiSelect) correct components (TextField, SingleSelect, MultiSelect) are rendered
//                        : magic with converting values from/to null :)
//                          : if filterValues are null or the id doesnt exist in the filterValues object, FilterOption passes to components correct empty type (for TextField '', for MultiSelect [])
//                          : via filterOptions values from inputs are passed via onChange function up, handling of empty values is done here (if TextField is '' onChange returns null, if MultiSelect is [] onChange returns null instead as well)
//          |- TextField: type of Filter input, expects string
//          |- SingleSelect: type of Filter input, expects {value:, label: }
//          |- MultiSelect: type of Filter input, expects [{value:, label: }, {valueX:, labelX: }...]
//
const Filter: FunctionComponent<FilterProps> = ({
  filterValues,
  disabled = false,
  filters = [],
  negatable = false,
  onFilterSubmit,
}) =>
  disabled ? (
    <div className={styles.filterButtonWrapper}>
      <FilterButton label="Filter" disabled />
    </div>
  ) : filters && filters.length ? (
    <FilterBar
      filters={filters}
      onFilterSubmit={onFilterSubmit}
      filterValues={filterValues}
      negatable={negatable}
    />
  ) : null;

Filter.displayName = 'Filter';

export default Filter;
export { createSimpleFilter, createDataFilter } from './utils/createFilter';
