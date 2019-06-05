import React from 'react';
import PropTypes from 'prop-types';

import './filter.css';
import FilterPopoverButton from './FilterPopOverButton/FilterPopoverButton';
import FilterTag from './FilterTag';

const initDataType = (filter) => {
  switch (filter.type) {
    case 'singleSelect':
      return filter.defaultValue ? filter.options.filter(o => o.value === filter.defaultValue).pop() : null;
    case 'multiSelect':
      return filter.defaultValue ? filter.options.filter(option => filter.defaultValue.includes(option.value)) : [];
    case 'text':
      return filter.defaultValue ? filter.defaultValue : '';
    default:
      return null;
  }
};


const clearDataType = (filter) => {
  switch (filter.type) {
    case 'singleSelect':
      return null;
    case 'multiSelect':
      return [];
    case 'text':
      return '';
    default:
      return null;
  }
};

const initFilterState = filters => filters.reduce((accumulator, currentValue) => ({ ...accumulator, [currentValue.filterKey]: initDataType(currentValue) }), {});
const clearFilterState = filters => filters.reduce((accumulator, currentValue) => ({ ...accumulator, [currentValue.filterKey]: clearDataType(currentValue) }), {});

/**
 * The filter is there to display large amounts of data in manageable portions.
 *
 * The filter is mostly used in data tables.
 */
export default class Filter extends React.Component {

  state = {
    displayFilterPopover: false,
    filterValues: initFilterState(this.props.filters),
    unAppliedValues: initFilterState(this.props.filters),
  };

  toggleFilterPopover = () => {
    this.setState(prevState => ({
      unAppliedValues: prevState.filterValues,
      displayFilterPopover: !prevState.displayFilterPopover,
    }));
  };

  filterDidChange = (event) => {
    const target = event.target;
    this.setState(prevState => ({
      unAppliedValues: { ...prevState.unAppliedValues, [target.name]: target.value },
    }));
  };

  clearFilter = () => {
    this.setState(() => ({
      unAppliedValues: clearFilterState(this.props.filters),
    }));
  };

  applyFilter = () => {
    this.setState(prevState => ({
      filterValues: prevState.unAppliedValues,
      displayFilterPopover: false,
    }),
    () => this.props.onFilterSubmit(this.state.filterValues));
  };

  getSelectionButton(label, text) {
    return (
      <FilterTag filterLabel={label} filterText={text} onClose={(msg, a, b) => console.log(msg, a, b)} />
    );
  }

  getSelectionButtons(filterValues) {
    if (!filterValues[1]) { return null; }

    if (typeof filterValues[1] === 'string') {
      return this.getSelectionButton(this.getLabel(filterValues[0]), filterValues[1]);
    } else if (Array.isArray(filterValues[1])) {
      if (Object.values(filterValues[1]).length > 0) {
        return Object.values(filterValues[1]).map(propFilterItem => this.getSelectionButton(this.getLabel(filterValues[0]), propFilterItem.value));
      }
    } else if (Object.values(filterValues[1]).length > 0) {
      return this.getSelectionButton(this.getLabel(filterValues[0]), filterValues[1].value);
    }

    return null;
  }

  getLabel(filterKey) {
    return this.props.filters.find(filter => filter.filterKey === filterKey).label.toUpperCase();
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
        <div styleName="filterBoxes">
          {this.state.filterValues && Object.entries(this.state.filterValues).map(filterValue => (
            <div key={filterValue}>
              {this.getSelectionButtons(filterValue)}
            </div>

          ))}
        </div>
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
   * Type: [{ label: string (required), type: oneOf('singleSelect', 'multiSelect', 'text') (required), key: string (required), options: array of values from which user can choose in single/multiselect, defaultValue: string | arrayOf string (multiSelects) }]
   */
  filters: PropTypes.arrayOf(PropTypes.shape({
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    filterKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      /** key for manipulation */
      value: PropTypes.string.isRequired,
      /** text displayed to the user in the filter dropdown */
      label: PropTypes.string.isRequired,
    })),
    type: PropTypes.oneOf(['singleSelect', 'multiSelect', 'text']).isRequired,
  })).isRequired,
  /**
   * Called when the user clicks on the apply button. Contains all the filter information as its argument.
   */
  onFilterSubmit: PropTypes.func,
};
