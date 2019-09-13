import React from 'react';
import PropTypes from 'prop-types';

import './FilterBar.css';
import FilterPopoverButton from '../FilterPopOverButton/FilterPopoverButton';
import FilterTag from './FilterTag';

/**
 * The filter is there to display large amounts of data in manageable portions.
 *
 * The filter is mostly used in data tables.
 *
 * Structure:
 * Filter: wrapper for disabled and enabled filter
 *  |- FilterButton: only disabled filter button, placeholder
 *  |- FilterBar: enabled button together with tags incl clearAll button (if some results are filtered)
 *              : excepts filterValues from MC component, filterValues are either null or an object where each object property is a filtered filterKey (if filterKey is not used then the whole prop is null)
 *              : example: filterValues = null if nothing filtered (clear filter), filterValues = {city: 'Brno', country: {value: 'CZ', label: 'CZ'}} if all possible inputs are filtered, filterValues = {city: 'Brno'} if country is not filtered
 *    |- FilterTag: if input is filtered, tag (grey box) is displayed
 *    |- FilterPopoverButton: wrapper for opening/closing the Filter dropdown
 *      |- FilterPopover: the Filter dropdown
 *        |- FilterOptions: inputs, based on type (text/singleSelect/multiSelect) correct components (TextField, SingleSelect, MultiSelect) are rendered
 *                        : magic with converting values from/to null :)
 *                          : if filterValues are null or the filterKey doesnt exist in the filterValues object, FilterOption passes to components correct empty type (for TextField '', for MultiSelect [])
 *                          : via filterOptions values from inputs are passed via onChange function up, handling of empty values is done here (if TextField is '' onChange returns null, if MultiSelect is [] onChange returns null instead as well)
 *          |- TextField: type of Filter input, expects string
 *          |- SingleSelect: type of Filter input, expects {value:, label: }
 *          |- MultiSelect: type of Filter input, expects [{value:, label: }, {valueX:, labelX: }...]
 */

export default class FilterBar extends React.Component {

  state = {
    displayFilterPopover: false,
    unAppliedValues: this.props.filterValues,
  };

  // eslint-disable-next-line react/sort-comp
  toggleFilterPopover = () => {
    if (!this.state.displayFilterPopover) {
      this.setState({ unAppliedValues: this.props.filterValues });
    }
    this.setState(prevState => ({
      displayFilterPopover: !prevState.displayFilterPopover,
    }));
  };

  filterDidChange = (value, key) => {
    this.setState(prevState => ({
      unAppliedValues: { ...prevState.unAppliedValues, [key]: value },
    }));

  };

  // Clear button in popover dropdown clears the users input
  clearFilter = () => {
    this.setState(() => ({
      unAppliedValues: {},
    }));
  };

  applyFilter = () => {

    // ignore all entries with null value - if input is empty, remove the whole entry (filterKey: value) from object that is passed to parent component
    const filtered = Object.entries(this.state.unAppliedValues)
      .filter(e => e[1] !== null)
      // eslint-disable-next-line no-return-assign,no-sequences
      .reduce((res, e) => (res[e[0]] = this.state.unAppliedValues[e[0]], res), {});

    this.setState(() => ({
      displayFilterPopover: false,
    }),
    () => this.props.onFilterSubmit(filtered));
  };

  // onFilterTagClose removes only one tag - only one filter entry from filters Object should be removed, other filters have to stay
  onFilterTagClose(filter) {
    const filtered = Object.entries(this.props.filterValues)
      .filter(e => e[0] !== filter.filterKey)
      // eslint-disable-next-line no-return-assign,no-sequences
      .reduce((res, e) => (res[e[0]] = this.props.filterValues[e[0]], res), {});
    this.setState(() => ({
      unAppliedValues: filtered,
      displayFilterPopover: false,
    }), () => this.applyFilter());

  }

  // clearAll button next to tags resets the filter to default state
  onClearAll = () => {
    this.setState(() => ({
      unAppliedValues: {},
      displayFilterPopover: false,
    }), () => this.applyFilter());
  };


  getFilterTags() {
    const { filterValues } = this.props;

    if (filterValues) {

      const tags = Object.entries(filterValues).map(([key, value]) => {
        if (value === undefined || value === null || value.length === 0) { return null; }

        const filter = this.props.filters.find(f => f.filterKey === key);
        if (!filter) {
          return null;
        }

        switch (filter.type) {
          case 'text':
            return <FilterTag key={filter.filterKey} filterLabel={filter.label} filterText={value} onClose={() => this.onFilterTagClose(filter)} />;
          case 'singleSelect':
            return <FilterTag key={filter.filterKey} filterLabel={filter.label} filterText={value.label} onClose={() => this.onFilterTagClose(filter)} />;
          case 'multiSelect':
            if (value.length > 0) {
              return <FilterTag key={filter.filterKey} filterLabel={filter.label} filterText={value.map(option => option.label).join('; ')} onClose={() => this.onFilterTagClose(filter)} />;
            }
            break;
          default:
            // eslint-disable-next-line no-console
            console.error('Unsupported filter type');
        }

        return null;
      });

      if (tags.some(el => el !== null)) {
        return (
          <div styleName="filterTags">
            <div styleName="filterTagsValues">{tags}</div>
            <div styleName="clearAllTag" onClick={() => this.onClearAll()}>Clear All</div>
          </div>
        );

      }
    }
    return null;
  }

  render() {

    return (
      <div styleName="filter">
        <FilterPopoverButton
          label="Filter"
          displayPopover={this.state.displayFilterPopover}
          onClick={this.toggleFilterPopover}
          filters={this.props.filters}
          handleFilterChange={this.filterDidChange}
          filterValues={this.state.unAppliedValues}
          onFilterClear={this.clearFilter}
          onFilterApply={this.applyFilter}
        />
        <div styleName="filterTags">
          {this.getFilterTags()}
        </div>
      </div>

    );
  }

}


FilterBar.displayName = 'FilterBar';

FilterBar.defaultProps = {
  onFilterSubmit: () => null,
};

FilterBar.propTypes = {
  /**
   * Sets the available filters.
   * Type: [{ label: string (required), type: oneOf('singleSelect', 'multiSelect', 'text') (required), key: string (required), options: array of values from which user can choose in single/multiSelect}]
   */
  filters: PropTypes.arrayOf(PropTypes.shape({
    disableSorting: PropTypes.bool,
    filterKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      /** text displayed to the user in the filter dropdown */
      label: PropTypes.string.isRequired,
      /** key for manipulation */
      value: PropTypes.any.isRequired,
    })),
    type: PropTypes.oneOf(['singleSelect', 'multiSelect', 'text']).isRequired,
  })).isRequired,
  /**
   * Passing the filter values from outside
   * @filterKey: same as filterKey in filters prop, it should be same as the `id` in filterDefinition
   * @value: the users input; for single & multiSelect value contains of both value and label! In case of multiSelect, value can consist of multiple objects {value: , label: } in an array
   * use {} for passing empty filterValues
   * */
  filterValues: PropTypes.shape({
    filterKey: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
  }).isRequired,
  /**
   * Called when the user clicks on the apply button. Contains all the filter information as its argument.
   */
  onFilterSubmit: PropTypes.func,
};
