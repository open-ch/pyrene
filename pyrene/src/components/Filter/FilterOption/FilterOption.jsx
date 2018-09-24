import React from 'react';
import PropTypes from 'prop-types';

import './filterOption.css';
import SingleSelect from '../../SelectElements/SingleSelect/SingleSelect';
import TextField from '../../FormElements/TextField/TextField';
import MultiSelect from '../../SelectElements/MultiSelect/MultiSelect';

const filterInterface = (filterProps) => {
  switch (filterProps.type) {
    case 'select':
      return <SingleSelect name={filterProps.filterKey} options={filterProps.options} onChange={filterProps.handleFilterChange} value={filterProps.filterValues[filterProps.filterKey].value} clearable />;
    case 'multiSelect':
      return <MultiSelect name={filterProps.filterKey} options={filterProps.options} onChange={filterProps.handleFilterChange} value={filterProps.filterValues[filterProps.filterKey]} selectedOptionsInDropdown keepMenuOnSelect clearable />;
    case 'text':
      return <TextField name={filterProps.filterKey} onChange={filterProps.handleFilterChange} placeholder={'Type'} value={filterProps.filterValues[filterProps.filterKey]} />;
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
      {filterInterface(props)}
    </div>
  </div>
);


FilterOption.displayName = 'FilterOption';

FilterOption.defaultProps = {};

FilterOption.propTypes = {};

export default FilterOption;