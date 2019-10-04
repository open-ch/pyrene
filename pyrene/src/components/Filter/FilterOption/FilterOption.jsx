import React from 'react';
import PropTypes from 'prop-types';

import './filterOption.css';
import SingleSelect from '../../SingleSelect/SingleSelect';
import TextField from '../../TextField/TextField';
import MultiSelect from '../../MultiSelect/MultiSelect';

export default class FilterOption extends React.Component {

    getFilterInterface = () => {

      const isValue = !!this.props.value;

      switch (this.props.type) {
        case 'singleSelect':
          return (
            <SingleSelect
              name={this.props.id}
              options={this.props.options}
              onChange={value => this.props.handleFilterChange(value, this.props.id)}
              value={isValue ? this.props.value : null}
              sorted={this.props.sorted}
              clearable
              searchable
            />
          );
        case 'multiSelect':
          return (
            <MultiSelect
              name={this.props.id}
              options={this.props.options}
              // If multiSelect is empty (empty array) return null to filter instead of []
              onChange={value => this.props.handleFilterChange(value && value.length === 0 ? null : value, this.props.id)}
              // Pass empty array instead of null to multiSelect component if filterValues are null
              value={isValue ? this.props.value : []}
              sorted={this.props.sorted}
              selectedOptionsInDropdown
              keepMenuOnSelect
              clearable
            />
          );
        case 'text':
          return (
            <TextField
              name={this.props.id}
              // If textField is empty (empty string) return null instead of ''
              onChange={value => this.props.handleFilterChange(value === '' ? null : value, this.props.id)}
              // Pass empty string instead of null to textField component if filterValues are null
              value={isValue ? this.props.value : ''}
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
  value: null,
  sorted: true,
};

FilterOption.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  sorted: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
};
