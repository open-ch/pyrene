import React from 'react';
import PropTypes from 'prop-types';

import './filterOption.css';
import SingleSelect from '../../SelectElements/SingleSelect/SingleSelect';
import TextField from '../../FormElements/TextField/TextField';
import MultiSelect from '../../SelectElements/MultiSelect/MultiSelect';

const getFilterInterface = (props) => {
  switch (props.type) {
    case 'singleSelect':
      return (
        <SingleSelect
          name={props.filterKey}
          options={props.options}
          onChange={props.handleFilterChange}
          value={props.filterValues[props.filterKey] ? props.filterValues[props.filterKey].value : props.defaultValue}
          clearable
          searchable
        />
      );
    case 'multiSelect':
      return (<MultiSelect
        name={props.filterKey}
        options={props.options}
        onChange={props.handleFilterChange}
        value={props.filterValues[props.filterKey].length > 0 ? props.filterValues[props.filterKey] : null}
        defaultValues={props.defaultValue}
        selectedOptionsInDropdown
        keepMenuOnSelect
        clearable
      />);
    case 'text':
      return (
        <TextField
          name={props.filterKey}
          onChange={props.handleFilterChange}
          placeholder={'Type'}
          value={props.filterValues[props.filterKey] ? props.filterValues[props.filterKey] : props.defaultValue}
        />
      );
    default:
      return null;
  }
};

const FilterOption = props => (
  <div styleName={'filterOption'}>
    <div styleName={'label'}>
      {props.label}
    </div>
    <div styleName={'interface'}>
      {getFilterInterface(props)}
    </div>
  </div>
);


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
  options: PropTypes.array,
  type: PropTypes.string.isRequired,
};

export default FilterOption;