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

export default class FilterBar extends React.Component {

  constructor(props) {
    super();
    this.state = {
      displayFilterPopover: false,
      unAppliedValues: props.filterValues,
    };
  }

  // eslint-disable-next-line react/sort-comp
  toggleFilterPopover = () => {
    if (!this.state.displayFilterPopover) {
      this.setState({ unAppliedValues: this.props.filterValues });
    }
    this.setState((prevState) => ({
      displayFilterPopover: !prevState.displayFilterPopover,
    }));
  };

  filterDidChange = (value, negated, key) => {
    this.setState((prevState) => ({
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

    // ignore all entries with null value - if input is empty, remove the whole entry (id: value) from object that is passed to parent component
    const filtered = Object.entries(this.state.unAppliedValues)
      .filter(([key, value]) => value !== null) // eslint-disable-line no-unused-vars
      .reduce((merged, [key, value]) => ({ ...merged, [key]: value }), {});

    const filteredKeys = Object.keys(filtered);

    const negatedFiltersKeys = this.props.filters.filter((filter) => filter.negated && filteredKeys.includes(filter.id))
      .map((filter) => filter.id)
      .reduce((negatedKeys, newKey) => {
        negatedKeys.push(newKey);
        return negatedKeys;
      }, []);

    this.setState(() => ({
      displayFilterPopover: false,
    }),
    () => this.props.onFilterSubmit(filtered, negatedFiltersKeys));
  };

  // onFilterTagClose removes only one tag - only one filter entry from filters Object should be removed, other filters have to stay
  onFilterTagClose(filter) {
    const filtered = Object.entries(this.props.filterValues)
      .filter(([key]) => key !== filter.id)
      .reduce((merged, [key, value]) => ({ ...merged, [key]: value }), {});
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

        const filter = this.props.filters.find((f) => f.id === key);
        if (!filter) {
          return null;
        }

        switch (filter.type) {
          case 'text':
            return <FilterTag key={filter.id} filterLabel={filter.label} filterText={value} negated={filter.negated} onClose={() => this.onFilterTagClose(filter)} />;
          case 'singleSelect':
            return <FilterTag key={filter.id} filterLabel={filter.label} filterText={value.label} negated={filter.negated} onClose={() => this.onFilterTagClose(filter)} />;
          case 'multiSelect':
            if (value.length > 0) {
              return <FilterTag key={filter.id} filterLabel={filter.label} filterText={value.map((option) => option.label).join('; ')} negated={filter.negated} onClose={() => this.onFilterTagClose(filter)} />;
            }
            break;
          default:
            // eslint-disable-next-line no-console
            console.error('Unsupported filter type');
        }

        return null;
      });

      if (tags.some((el) => el !== null)) {
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
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    negated: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
      /** text displayed to the user in the filter dropdown */
      label: PropTypes.string.isRequired,
      /** key for manipulation */
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    })),
    sorted: PropTypes.bool,
    type: PropTypes.oneOf(['singleSelect', 'multiSelect', 'text']).isRequired,
  })).isRequired,
  /**
   * Filter values object.
   * */
  filterValues: PropTypes.shape().isRequired,
  /**
   * Called when the user clicks on the apply button. Exposes two parameters: filterValues and negatedFilterKeys (contains an array of the keys of the filters that are negated).
   */
  onFilterSubmit: PropTypes.func,
};
