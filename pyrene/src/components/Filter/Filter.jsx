import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './filter.css';
import FilterPopoverButton from './FilterPopOverButton/FilterPopoverButton';

const initDataType = (type) => {
  switch (type) {
    case 'select':
      return '';
    case 'text':
      return '';
    case 'multiSelect':
      return [];
    default:
      return null;
  }
};

const initFilterState = (filters) => {
  return filters.reduce((accumulator, currentValue) => {
    return {...accumulator, [currentValue.filterKey]: initDataType(currentValue.type)};
  }, {});
};

/**
 * We all look at things through the filter of our own experiences.
 */
export default class Filter extends React.Component {
  state = {
    displayFilterPopover: false,
    filterValues: initFilterState(this.props.filters),
    unAppliedValues: initFilterState(this.props.filters)
  };

  toggleFilterPopover = () => {
    this.setState((prevState, props) => ({
      unAppliedValues: prevState.filterValues,
      displayFilterPopover: !prevState.displayFilterPopover,
    }));
  };

  getValueFromInput = (target) => {
    switch(target.type) {
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
    this.setState((prevState, props) => ({
      unAppliedValues: {...prevState.unAppliedValues, [target.name]: this.getValueFromInput(target)},
    }));
  };

  clearFilter = () => {
    this.setState((prevState, props) => ({
      unAppliedValues: initFilterState(this.props.filters),
    }))
  };

  applyFilter = () => {
    this.setState((prevState, props) => ({
      filterValues: prevState.unAppliedValues,
      displayFilterPopover: false
    }),
    () => this.props.onFilterSubmit(this.state.filterValues));
  };

  render() {
    return (
      <div styleName={'tableFilter'}>
        {/* No Searchbar for now
        <div styleName={'filterSearchBar'}>
          <input
            styleName={'filterSearchBarInput'}
            type={'text'}
            placeholder={'Search'}
            onChange={() => null}
            onFocus={() => null}
          />
          <span className={'icon-search'} styleName={'searchIcon'} />
        </div>
        <div styleName="spacer" /> */}
        <FilterPopoverButton
          label={'Filter'}
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
   * Data input array for the displayed filters.
   * Type: [{ label: string (required), type: oneOf('singleSelect', 'multiSelect', 'text') (required), key: string (required), options: array }]
   */
  filters: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['singleSelect', 'multiSelect', 'text']).isRequired,
    filterKey: PropTypes.string.isRequired,
    options: PropTypes.array,
  })).isRequired,
  /**
   * Called when the user clicks on the apply button. Contains all the filter information as its argument.
   */
  onFilterSubmit: PropTypes.func,
};