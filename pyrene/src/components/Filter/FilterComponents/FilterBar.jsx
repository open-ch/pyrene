import React from 'react';
import PropTypes from 'prop-types';

import './FilterBar.css';
import FilterPopoverButton from '../FilterPopOverButton/FilterPopoverButton';
import FilterTag from './FilterTag';

/**
 * The filter is there to display large amounts of data in manageable portions.
 *
 * The filter is mostly used in data tables.
 */

export default class FilterBar extends React.Component {

  state = {
    displayFilterPopover: false,
    unAppliedValues: null,
  };

  // eslint-disable-next-line react/sort-comp
  toggleFilterPopover = () => {
    this.setState(prevState => ({
      displayFilterPopover: !prevState.displayFilterPopover,
    }));
  };

  filterDidChange = (value, key) => {
    if (!value) {
      // if the input is empty (no value) then delete the whole filter entry from filters Object
      let changedValues = { ...this.state.unAppliedValues };
      delete changedValues[key];
      // If there is no filter left, set unAppliedValues to default null state instead of empty Object
      if (Object.entries(changedValues).length === 0) { changedValues = null; }
      this.setState(() => ({
        unAppliedValues: changedValues,
      }));
    } else {
      this.setState(prevState => ({
        unAppliedValues: { ...prevState.unAppliedValues, [key]: value },
      }));
    }
  };

  // Clear button in popover dropdown clears the users input
  clearFilter = () => {
    this.setState(() => ({
      unAppliedValues: null,
    }));
  };

  applyFilter = () => {
    this.setState(() => ({
      displayFilterPopover: false,
    }),
    () => this.props.onFilterSubmit(this.state.unAppliedValues));
  };

  // onFilterTagClose removes only one tag - only one filter entry from filters Object should be removed, other filters have to stay
  onFilterTagClose(filter) {
    let changedValues = { ...this.props.filterValues };
    delete changedValues[filter.filterKey];
    if (Object.entries(changedValues).length === 0) { changedValues = null; }
    this.setState(() => ({
      unAppliedValues: changedValues,
      displayFilterPopover: false,
    }), () => this.applyFilter());

  }

  // clearAll button next to tags resets the filter to default state
  onClearAll = () => {
    this.setState(() => ({
      unAppliedValues: null,
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
   * */
  filterValues: PropTypes.arrayOf(PropTypes.shape({
    filterKey: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
  })).isRequired,
  /**
   * Called when the user clicks on the apply button. Contains all the filter information as its argument.
   */
  onFilterSubmit: PropTypes.func,
};
