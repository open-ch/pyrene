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

export default class Filter extends React.Component {
  state = {
    displayFilterPopover: false,
    filterValues: initFilterState(this.props.filters),
  };

  displayFilterPopover = () => {
    this.setState((prevState, props) => ({
      displayFilterPopover: !prevState.displayFilterPopover,
    }));
  };

  getValueFromInput = (target) => {
    switch(target.type) {
      case 'checkbox':
        return target.checked;
      case 'select':
        if (target.value == null) {
          return null;
        }
        return target.value.value;
      default:
        return target.value;
    }
  };

  filterDidChange = (event) => {
    const target = event.target;
    this.setState((prevState, props) => ({
      filterValues: {...prevState.filterValues, [target.name]: this.getValueFromInput(target)},
    }));
  };

  onFilterClear = () => {
    this.setState((prevState, props) => ({
      filterValues: initFilterState(this.props.filters),
    }))
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
        <FilterPopoverButton label={'Filter'} displayPopover={this.state.displayFilterPopover} onClick={this.displayFilterPopover} filters={this.props.filters} handleFilterChange={this.filterDidChange} filterValues={this.state.filterValues} onFilterClear={this.onFilterClear} />
      </div>
    );
  }
}


Filter.displayName = 'Filter';

Filter.defaultProps = {};

Filter.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
    key: PropTypes.string,
    options: PropTypes.array,
  })).isRequired,
};