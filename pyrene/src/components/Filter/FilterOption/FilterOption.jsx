import React from 'react';
import PropTypes from 'prop-types';

import './filterOption.css';
import SingleSelect from '../../SelectElements/SingleSelect/SingleSelect';
import TextField from '../../FormElements/TextField/TextField';
import MultiSelect from '../../SelectElements/MultiSelect/MultiSelect';

export default class FilterOption extends React.Component {

    getFilterInterface = () => {
      switch (this.props.type) {
        case 'singleSelect':
          return (
            <SingleSelect
              name={this.props.filterKey}
              options={this.props.options}
              onChange={this.props.handleFilterChange}
              value={this.props.filterValues[this.props.filterKey] ? this.props.filterValues[this.props.filterKey].value : this.props.defaultValue}
              clearable
              searchable
            />
          );
        case 'multiSelect':
          return (
            <MultiSelect
              name={this.props.filterKey}
              options={this.props.options}
              onChange={this.props.handleFilterChange}
              value={this.props.filterValues[this.props.filterKey].length > 0 ? this.props.filterValues[this.props.filterKey] : null}
              defaultValues={this.props.defaultValue}
              selectedOptionsInDropdown
              keepMenuOnSelect
              clearable
            />
          );
        case 'text':
          return (
            <TextField
              name={this.props.filterKey}
              onChange={this.props.handleFilterChange}
              placeholder="Type"
              value={this.props.filterValues[this.props.filterKey] ? this.props.filterValues[this.props.filterKey] : this.props.defaultValue}
            />
          );
        default:
          return null;
      }
    }

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
  defaultValue: undefined,
};

FilterOption.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  filterKey: PropTypes.string.isRequired,
  filterValues: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.string])).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  type: PropTypes.string.isRequired,
};
