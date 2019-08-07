import React from 'react';
import PropTypes from 'prop-types';

import './filterOption.css';
import SingleSelect from '../../SingleSelect/SingleSelect';
import TextField from '../../TextField/TextField';
import MultiSelect from '../../MultiSelect/MultiSelect';

export default class FilterOption extends React.Component {

    getFilterInterface = () => {

      const isValue = !!this.props.filterValues && !!this.props.filterValues[this.props.filterKey];

      switch (this.props.type) {
        case 'singleSelect':
          return (
            <SingleSelect
              name={this.props.filterKey}
              options={this.props.options}
              onChange={value => this.props.handleFilterChange(value, this.props.filterKey)}
              value={isValue ? this.props.filterValues[this.props.filterKey] : null}
              clearable
              searchable
            />
          );
        case 'multiSelect':
          return (
            <MultiSelect
              name={this.props.filterKey}
              options={this.props.options}
              // if is multiSelect empty = empty array, return null to filter instead []
              onChange={value => this.props.handleFilterChange(value.length === 0 ? null : value, this.props.filterKey)}
              // this.props.filterValues and this.props.filterValues[this.props.filterKey] cannot be null. Otherwise array.length should be always > 0
              value={isValue ? this.props.filterValues[this.props.filterKey] : []}
              selectedOptionsInDropdown
              keepMenuOnSelect
              clearable
            />
          );
        case 'text':
          return (
            <TextField
              name={this.props.filterKey}
              // if input is empty, return null instead of '' into the filter
              onChange={value => this.props.handleFilterChange(value === '' ? null : value, this.props.filterKey)}
              // if value is null, pass empty string - default value for input field
              value={isValue ? this.props.filterValues[this.props.filterKey] : ''}
            />
          );
        default:
          return null;
      }
    };

    render() {
      return (
        <div styleName="filterOption">
          <div styleName="label">
            {this.props.label}
          </div>
          <div styleName="interface">
            {this.getFilterInterface(this.props)}
          </div>
        </div>
      );
    }

}


FilterOption.displayName = 'FilterOption';

FilterOption.defaultProps = {
  options: [],
  filterValues: null,
};

FilterOption.propTypes = {
  filterKey: PropTypes.string.isRequired,
  filterValues: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object])),
  handleFilterChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  type: PropTypes.string.isRequired,
};
