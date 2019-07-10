import React from 'react';
import PropTypes from 'prop-types';

import './filter.css';
import FilterPopoverButton from './FilterPopOverButton/FilterPopoverButton';
import FilterTag from './FilterTag';

const initDataType = (filter) => {
  switch (filter.type) {
    case 'singleSelect': {
      return filter.defaultValue ? filter.options.filter(option => option.value === filter.defaultValue.value).pop() : null;
    }
    case 'multiSelect':
      return filter.defaultValue ? filter.options.filter(option => filter.defaultValue.some(defaultOption => defaultOption.value === option.value)) : [];
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

  componentDidMount() {
    this.props.onFilterSubmit(this.state.filterValues);
  }

  // eslint-disable-next-line react/sort-comp
  toggleFilterPopover = () => {
    this.setState(prevState => ({
      unAppliedValues: prevState.filterValues,
      displayFilterPopover: !prevState.displayFilterPopover,
    }));
  };

  filterDidChange = (value, key) => {
    this.setState(prevState => ({
      unAppliedValues: { ...prevState.unAppliedValues, [key]: value },
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

  onClearAll = () => {
    this.setState(() => ({
      unAppliedValues: clearFilterState(this.props.filters),
      displayFilterPopover: false,
    }), () => this.applyFilter());
  };


  getFilterTags() {
    const { filterValues } = this.state;

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
              return <FilterTag key={filter.filterKey} filterLabel={filter.label} filterText={value.map(option => option.label).join(', ')} onClose={() => this.onFilterTagClose(filter)} />;
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
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
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
   * Called when the user clicks on the apply button. Contains all the filter information as its argument.
   */
  onFilterSubmit: PropTypes.func,
};

export { createSimpleFilter, createDataFilter } from './utils/createFilter';
