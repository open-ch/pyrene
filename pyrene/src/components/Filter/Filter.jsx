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

  onFilterTagClose(filter) {

    this.setState(prevState => ({
      unAppliedValues: { ...prevState.unAppliedValues, [filter.filterKey]: clearDataType(filter) },
      displayFilterPopover: false,
    }), () => this.applyFilter());

  }

  getFilterTag(label, text, filter) {
    return (
      <FilterTag key={filter.key + text} filterLabel={label} filterText={text} onClose={() => this.onFilterTagClose(filter)} />
    );
  }

  getLabel(filterKey) {
    return this.props.filters.find(filter => filter.filterKey === filterKey).label.toUpperCase();
  }

  getFilterTags() {
    const { filterValues } = this.state;
    if (filterValues) {
      return Object.entries(filterValues).map(([key, value]) => {
        const _this = this;
        if (!value || value.length === 0) { return null; }

        const filter = this.props.filters.find(f => f.filterKey === key);
        if (!filter) {
          return null;
        }

        switch (filter.type) {
          case 'text':
            return _this.getFilterTag(_this.getLabel(key), value, filter);
          case 'singleSelect':
            return _this.getFilterTag(_this.getLabel(key), value.label, filter);
          case 'multiSelect':
            if (Object.values(value).length > 0) {
              return _this.getFilterTag(_this.getLabel(key), Object.values(value).map(option => option.label).join(', '), filter);
            }
            break;
          default:
            console.error('Unsupported filter type');
        }

        return null;
      });
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
