import React from 'react';
import PropTypes from 'prop-types';
import Popover from '../../Popover/Popover';

import FilterPopover from '../FilterPopover/FilterPopover';
import FilterButton from '../FilterComponents/FilterButton';

const FilterPopoverButton = (props) => (
  <Popover
    align="start"
    distanceToTarget={8}
    displayPopover={props.displayPopover}
    preferredPosition={['bottom']}
    renderPopoverContent={() => (
      <FilterPopover
        filters={props.filters}
        handleFilterChange={props.handleFilterChange}
        filterValues={props.filterValues}
        onFilterClear={props.onFilterClear}
        onClose={props.onClick}
        onFilterApply={props.onFilterApply}
      />
    )}
  >
    <FilterButton disabled={false} displayPopover={props.displayPopover} label={props.label} noBorder={props.noBorder} onClick={props.onClick} />
  </Popover>
);

FilterPopoverButton.displayName = 'FilterPopoverButton';

FilterPopoverButton.defaultProps = {
  noBorder: false,
  displayPopover: false,
  onClick: () => null,
};

FilterPopoverButton.propTypes = {
  displayPopover: PropTypes.bool,
  filters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
    sorted: PropTypes.bool,
    type: PropTypes.string,
  })).isRequired,
  filterValues: PropTypes.shape().isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  noBorder: PropTypes.bool,
  onClick: PropTypes.func,
  onFilterApply: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired,
};

export default FilterPopoverButton;
