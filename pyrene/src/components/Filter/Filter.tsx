import React, { FunctionComponent } from 'react';
import FilterBar from './FilterComponents/FilterBar';
import FilterButton from './FilterComponents/FilterButton';
import styles from './Filter.css';
import { Filter as FilterType, Filters } from './types';

export interface FilterProps {
  /**
   * True if filter should be displayed but in disabled state (filters might be still undefined)
  * */
  disabled?: boolean,
  /**
  * Sets the available filters.
  * Type: [{ label: string (required), type: oneOf('singleSelect', 'multiSelect', 'text') (required), key: string (required), options: array of values from which user can choose in single/multiSelect }]
  */
  filters?: Array<FilterType>,
  /**
  * Filter values object, with:
  * keys: same as the `id` in filterDefinition
  * values: the users input; for single & multiSelect value contains of both value and label! In case of multiSelect, value can consist of multiple objects {value: , label: } in an array
  * use {} for passing empty filterValues
  * */
  filterValues: Filters,
  /**
  * True to enable the visual components to handle negated filters. Defaults to false
  */
  negatable?: boolean,
  /**
  * Called when the user clicks on the apply button. Contains all the filter information as its argument.
  */
  onFilterSubmit?: (filterValues: Filters, filterNegatedKeys: Array<FilterType['id']>) => void,
}

const Filter: FunctionComponent<FilterProps> = ({
  filterValues,
  disabled = false,
  filters = [],
  negatable = false,
  onFilterSubmit,
}: FilterProps) => {

  if (disabled) {
    return (
      <div className={styles.filterButtonWrapper}>
        <FilterButton label="Filter" disabled />
      </div>
    );
  }

  if (filters && filters.length > 0 && !disabled) {
    return (
      <FilterBar
        filters={filters}
        onFilterSubmit={onFilterSubmit}
        filterValues={filterValues}
        negatable={negatable}
      />
    );
  }

  return null;
};


Filter.displayName = 'Filter';

export { createSimpleFilter, createDataFilter } from './utils/createFilter';

export default Filter;
