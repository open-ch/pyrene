import React from 'react';
import PropTypes from 'prop-types';

import './filterPopover.css';
import ButtonBar from '../../ButtonBar/ButtonBar';
import Button from '../../Button/Button';
import FilterOption from '../FilterOption/FilterOption';

const FilterPopover = props => (
  <div styleName={'filterPopover'}>
    <div styleName={'title'}>Select Filter</div>
    <div styleName={'filterOptions'}>
      {props.filters.map(filter =>
        <FilterOption {...filter} handleFilterChange={props.handleFilterChange} key={filter.filterKey} />
      )}
    </div>
    <ButtonBar
      rightButtonSectionElements={[
        <Button label={'Clear'} type={'ghost'} />,
        <Button label={'Cancel'} type={'secondary'} />,
        <Button label={'Apply'} type={'primary'} />,
      ]}
    />
  </div>
);


FilterPopover.displayName = 'FilterPopover';

FilterPopover.defaultProps = {};

FilterPopover.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
    key: PropTypes.string,
    options: PropTypes.array,
  })).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default FilterPopover;