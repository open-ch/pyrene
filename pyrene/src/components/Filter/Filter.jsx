import React from 'react';
import PropTypes from 'prop-types';

import './filter.css';
import FilterPopoverButton from './FilterPopOverButton/FilterPopoverButton';

const initDataType = (type) => {
  switch (type) {
    case 'singleSelect':
      return '';
    case 'text':
      return '';
    case 'multiSelect':
      return [];
    default:
      return null;
  }
};

const initFilterState = filters => filters.reduce((accumulator, currentValue) => ({ ...accumulator, [currentValue.filterKey]: initDataType(currentValue.type) }), {});

/**
 * The filter is there to display large amounts of data in manageable portions.
 *
 * The filter is mostly used in data tables.
 */
export default class Filter extends React.Component {

  state = {
    displayFilterPopover: false,
    defaultValues: initFilterState(this.props.filters), // eslint-disable-line react/no-unused-state
    filterValues: initFilterState(this.props.filters),
    unAppliedValues: initFilterState(this.props.filters),
  };

  toggleFilterPopover = () => {
    this.setState(prevState => ({
      unAppliedValues: prevState.filterValues,
      displayFilterPopover: !prevState.displayFilterPopover,
    }));
  };

  getValueFromInput = (target) => {
    switch (target.type) {
      case 'checkbox':
        return target.checked;
      case 'singleSelect':
        if (target.value === null) {
          return [];
        }
        return target.value;
      default:
        return target.value;
    }
  };

  filterDidChange = (event) => {
    const target = event.target;
    this.setState(prevState => ({
      unAppliedValues: { ...prevState.unAppliedValues, [target.name]: this.getValueFromInput(target) },
    }));
  };

  clearFilter = () => {
    this.setState(() => ({
      unAppliedValues: initFilterState(this.props.filters),
    }));
  };

  applyFilter = () => {
    this.setState(prevState => ({
      filterValues: prevState.unAppliedValues,
      displayFilterPopover: false,
    }),
    () => this.props.onFilterSubmit(this.state.filterValues));
  };

  render() {
    return (
      <div styleName="filter">
        {/* No Searchbar for now
        <div styleName={'filterSearchBar'}>
          <input
            styleName={'filterSearchBarInput'}
            type={'text'}
            placeholder={'Search'}
            onChange={() => null}
            onFocus={() => null}
          />
          <span className={'pyreneIcon-search'} styleName={'searchIcon'} />
        </div>
        <div styleName="spacer" /> */}
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
      </div>
    );
  }

}


Filter.displayName = 'Filter';

Filter.defaultProps = {
  onFilterSubmit: () => null,
};

Filter.propTypes = {
  /**
   * Sets the available filters.
   * Type: [{ label: string (required), type: oneOf('singleSelect', 'multiSelect', 'text') (required), key: string (required), options: array, defaultValue: string | arrayOf string (multiSelects) }]
   */
  filters: PropTypes.arrayOf(PropTypes.shape({
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    filterKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array,
    type: PropTypes.oneOf(['singleSelect', 'multiSelect', 'text']).isRequired,
  })).isRequired,
  /**
   * Called when the user clicks on the apply button. Contains all the filter information as its argument.
   */
  onFilterSubmit: PropTypes.func,
};

export { createSimpleFilter, createDataFilter } from './utils/createFilter';
