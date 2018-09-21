import React from 'react';
import PropTypes from 'prop-types';

import './filterOption.css';
import SingleSelect from '../../SelectElements/SingleSelect/SingleSelect';

const filterInterface = (filterProps) => {
  switch (filterProps.type) {
    case 'select':
      return <SingleSelect name={filterProps.filterKey} options={filterProps.options} onChange={filterProps.handleFilterChange} />;
    case 'multiSelect':
      return null;
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