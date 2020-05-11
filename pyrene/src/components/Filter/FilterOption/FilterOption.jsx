import React from 'react';
import PropTypes from 'prop-types';

import './filterOption.css';
import SingleSelect from '../../SingleSelect/SingleSelect';
import TextField from '../../TextField/TextField';
import MultiSelect from '../../MultiSelect/MultiSelect';
import Checkbox from '../../Checkbox/Checkbox';

export default class FilterOption extends React.Component {

    isInterfaceSupportsNegate = () => {
      switch (this.props.type) {
        case 'text':
        case 'singleSelect':
        case 'multiSelect': return true;
        default: return false;
      }
    };

    getFilterInterface = () => {

      const isValue = !!this.props.value;

      switch (this.props.type) {
        case 'singleSelect':
          return (
            <SingleSelect
              name={this.props.id}
              options={this.props.options}
              onChange={(value) => this.props.handleFilterChange(value, this.props.negated, this.props.id)}
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
              onChange={(value) => this.props.handleFilterChange(value && value.length === 0 ? null : value, this.props.negated, this.props.id)}
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
              onChange={(value) => this.props.handleFilterChange(value === '' ? null : value, false, this.props.id)}
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
          <div styleName="filterOptionWrapper">
            <div styleName="label">
              {this.props.label}
            </div>
            <div styleName="interface">
              {this.getFilterInterface()}
            </div>
          </div>
          {this.props.isNegationEnabled && (
            <div styleName="negatedCheckbox">
              {this.isInterfaceSupportsNegate() && (
                <Checkbox
                  value={this.props.negated}
                  disabled={false}
                  onChange={(value) => this.props.handleFilterChange(this.props.value, value, this.props.id)}
                  tooltip="To negate the filter, check the box."
                />
              )}
            </div>
          )}
        </div>
      );
    }

}


FilterOption.displayName = 'FilterOption';

FilterOption.defaultProps = {
  negated: false,
  options: [],
  value: null,
  sorted: true,
};

FilterOption.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isNegationEnabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  negated: PropTypes.bool,
  options: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  sorted: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
};
