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
              sorted={!this.props.disableSorting}
              clearable
              searchable
            />
          );
        case 'multiSelect':
          return (
            <MultiSelect
              name={this.props.filterKey}
              options={this.props.options}
              // If multiSelect is empty (empty array) return null to filter instead of []
              onChange={value => this.props.handleFilterChange(value && value.length === 0 ? null : value, this.props.filterKey)}
              // Pass empty array instead of null to multiSelect component if filterValues are null
              value={isValue ? this.props.filterValues[this.props.filterKey] : []}
              sorted={!this.props.disableSorting}
              selectedOptionsInDropdown
              keepMenuOnSelect
              clearable
            />
          );
        case 'text':
          return (
            <TextField
              name={this.props.filterKey}
              // If textField is empty (empty string) return null instead of ''
              onChange={value => this.props.handleFilterChange(value === '' ? null : value, this.props.filterKey)}
              // Pass empty string instead of null to textField component if filterValues are null
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
  disableSorting: false,
  options: [],
  filterValues: null,
};

FilterOption.propTypes = {
  disableSorting: PropTypes.bool,
  filterKey: PropTypes.string.isRequired,
  filterValues: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object])),
  handleFilterChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  type: PropTypes.string.isRequired,
};
