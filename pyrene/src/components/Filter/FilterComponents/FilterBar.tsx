/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/static-property-placement */
import React from 'react';

import styles from './FilterBar.css';
import FilterPopoverButton from '../FilterPopOverButton/FilterPopoverButton';
import FilterTag from './FilterTag';
import {
  FilterValues,
  Options,
  Filter,
  MultiselectValue,
  SingleSelectValue,
} from '../types';

export interface FilterBarProps {
  /**
   * Sets the available filters.
   * Type: [{ label: string (required), type: oneOf('singleSelect', 'multiSelect', 'text') (required), key: string (required), options: array of values from which user can choose in single/multiSelect}]
   */
  filters: Array<Filter>,
  /**
   * Filter values object.
   */
  filterValues: FilterValues,
  /**
   * True to enable the visual components to handle negated filters.
   */
  negatable: boolean,
  /**
   * Called when the user clicks on the apply button. Exposes two parameters: filterValues and negatedFilterKeys (contains an array of the keys of the filters that are negated).
   */
  onFilterSubmit?: (filterValues: FilterValues, negatedKeys: Array<Filter['id']>) => void,
}

interface FilterBarState {
  displayFilterPopover: boolean,
  unAppliedFilters: {
    values: FilterValues,
    negatedKeys: Array<Filter['id']>
  };
}

/**
 * The filter is there to display large amounts of data in manageable portions.
 *
 * The filter is mostly used in data tables.
 *
 * Structure:
 * Filter: wrapper for disabled and enabled filter
 *  |- FilterButton: only disabled filter button, placeholder
 *  |- FilterBar: enabled button together with tags incl clearAll button (if some results are filtered)
 *              : excepts filterValues from MC component, filterValues are either null or an object where each object property is a filtered id (if id is not used then the whole prop is null)
 *              : example: filterValues = null if nothing filtered (clear filter), filterValues = {city: 'Brno', country: {value: 'CZ', label: 'CZ'}} if all possible inputs are filtered, filterValues = {city: 'Brno'} if country is not filtered
 *    |- FilterTag: if input is filtered, tag (grey box) is displayed
 *    |- FilterPopoverButton: wrapper for opening/closing the Filter dropdown
 *      |- FilterPopover: the Filter dropdown
 *        |- FilterOptions: inputs, based on type (text/singleSelect/multiSelect) correct components (TextField, SingleSelect, MultiSelect) are rendered
 *                        : magic with converting values from/to null :)
 *                          : if filterValues are null or the id doesnt exist in the filterValues object, FilterOption passes to components correct empty type (for TextField '', for MultiSelect [])
 *                          : via filterOptions values from inputs are passed via onChange function up, handling of empty values is done here (if TextField is '' onChange returns null, if MultiSelect is [] onChange returns null instead as well)
 *          |- TextField: type of Filter input, expects string
 *          |- SingleSelect: type of Filter input, expects {value:, label: }
 *          |- MultiSelect: type of Filter input, expects [{value:, label: }, {valueX:, labelX: }...]
 */

export default class FilterBar extends React.Component<FilterBarProps, FilterBarState> {

  static displayName = 'FilterBar';

  constructor(props: FilterBarProps) {
    super(props);
    this.state = {
      displayFilterPopover: false,
      unAppliedFilters: this.createUnappliedFilters(props),
    };
  }

  // eslint-disable-next-line react/sort-comp
  toggleFilterPopover = () => {
    if (!this.state.displayFilterPopover) {
      this.setState({ unAppliedFilters: this.createUnappliedFilters(this.props) });
    }
    this.setState((prevState) => ({
      displayFilterPopover: !prevState.displayFilterPopover,
    }));
  };

  filterDidChange = (value: Options, negated: boolean, key: Filter['id']) => {
    this.setState((prevState) => ({
      unAppliedFilters: {
        values: { ...prevState.unAppliedFilters.values, [key]: value },
        negatedKeys: this.getNegatedFilterKeysForChange(prevState, negated, key),
      },
    }));
  };

  // Clear button in popover dropdown clears the users input
  clearFilter = () => this.setState({
    unAppliedFilters: {
      values: {},
      negatedKeys: [],
    },
  });

  createUnappliedFilters = (props: FilterBarProps) => {
    const negatedFiltersKeys = this.getNegatedFilterKeys(props, Object.keys(this.getValidFilterEntries(props.filterValues)));
    return {
      values: props.filterValues, // Object with keys equal to the id of the filter and value the value of the filter
      negatedKeys: negatedFiltersKeys, // Array of filtered keys to be negated
    };
  };

  getNegatedFilterKeys = (props: FilterBarProps, filteredKeys: Array<Filter['id']>) => props.filters
    .filter((filter) => filter.negated && filteredKeys.includes(filter.id))
    .map((filter) => filter.id);

  getNegatedFilterKeysForChange = (prevState: FilterBarState, negated: boolean, key: Filter['id']) => {
    let toReturn = prevState.unAppliedFilters.negatedKeys;
    if (negated && !toReturn.includes(key)) {
      toReturn.push(key);
    } else if (!negated && toReturn.includes(key)) {
      toReturn = toReturn.filter((currentKey) => currentKey !== key);
    }
    return toReturn;
  };

  // ignore all entries with null value - if input is empty, remove the whole entry (id: value) from object that is passed to parent component
  getValidFilterEntries = (filterValues: FilterValues): FilterValues => Object.entries(filterValues)
    .filter(([, value]) => value !== null)
    .reduce((merged, [key, value]) => ({ ...merged, [key]: value }), {});

  applyFilter = () => {
    const filtered = this.getValidFilterEntries(this.state.unAppliedFilters.values);

    const filteredKeys = Object.keys(filtered);

    const negatedFiltersKeys = this.state.unAppliedFilters.negatedKeys.filter((negatedKey) => filteredKeys.includes(negatedKey));

    this.setState({ displayFilterPopover: false }, () => this.props?.onFilterSubmit?.(filtered, negatedFiltersKeys));
  };

  // onFilterTagClose removes only one tag - only one filter entry from filters Object should be removed, other filters have to stay
  onFilterTagClose(filter: Filter) {
    const filtered = Object.entries(this.props.filterValues)
      .filter(([key]) => key !== filter.id)
      .reduce((merged, [key, value]) => ({ ...merged, [key]: value }), {});

    this.setState((prevState) => {
      const negatedFiltersKeys = prevState.unAppliedFilters.negatedKeys.filter((negatedKey) => negatedKey !== filter.id);
      return {
        unAppliedFilters: {
          values: filtered,
          negatedKeys: negatedFiltersKeys,
        },
        displayFilterPopover: false,
      };
    }, () => this.applyFilter());
  }

  // clearAll button next to tags resets the filter to default state
  onClearAll = () => this.setState({
    unAppliedFilters: {
      values: {},
      negatedKeys: [],
    },
    displayFilterPopover: false,
  }, () => this.applyFilter());


  getFilterTags() {
    const { filterValues, filters, negatable } = this.props;

    if (filterValues) {

      const tags = Object.entries(filterValues).map(([key, value]) => {
        if (value === undefined || value === null || (value as MultiselectValue).length === 0) {
          return null;
        }

        const filter = filters.find((f) => f.id === key);
        if (!filter) {
          return null;
        }

        switch (filter.type) {
          case 'text':
            return (
              <FilterTag
                key={filter.id}
                filterLabel={filter.label}
                filterText={value as string}
                negated={negatable && filter.negated}
                onClose={() => this.onFilterTagClose(filter)}
              />
            );
          case 'singleSelect':
            return (
              <FilterTag
                key={filter.id}
                filterLabel={filter.label}
                filterText={(value as SingleSelectValue).label}
                negated={negatable && filter.negated}
                onClose={() => this.onFilterTagClose(filter)}
              />
            );
          case 'multiSelect':
            if ((value as MultiselectValue).length > 0) {
              return (
                <FilterTag
                  key={filter.id}
                  filterLabel={filter.label}
                  filterText={(value as MultiselectValue).map((option) => option.label).join('; ')}
                  negated={negatable && filter.negated}
                  onClose={() => this.onFilterTagClose(filter)}
                />
              );
            }
            break;
          default:
            // eslint-disable-next-line no-console
            console.error('Unsupported filter type');
            return null;
        }

        return null;
      });

      if (tags.some((el) => el !== null)) {
        return (
          <div className={styles.filterTags}>
            <div className={styles.filterTagsValues}>{tags}</div>
            <div className={styles.clearAllTag} onClick={() => this.onClearAll()}>Clear All</div>
          </div>
        );

      }
    }
    return null;
  }

  render() {
    const [{ negatable, filters }, { displayFilterPopover, unAppliedFilters }] = [this.props, this.state];
    return (
      <div className={styles.filter}>
        <FilterPopoverButton
          label="Filter"
          displayPopover={displayFilterPopover}
          onClick={this.toggleFilterPopover}
          filters={filters}
          handleFilterChange={this.filterDidChange}
          negatable={negatable}
          filterValues={unAppliedFilters.values}
          filterNegatedKeys={unAppliedFilters.negatedKeys}
          onFilterClear={this.clearFilter}
          onFilterApply={this.applyFilter}
        />
        <div className={styles.filterTags}>
          {this.getFilterTags()}
        </div>
      </div>
    );
  }

}
