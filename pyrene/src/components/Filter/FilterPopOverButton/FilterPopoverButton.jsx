import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popover from '../../Popover/Popover';

import './filterPopoverButton.css';
import FilterPopover from '../FilterPopover/FilterPopover';

const FilterPopoverButton = props => {
  return (
    <Popover
      align={'start'}
      distanceToTarget={8}
      displayPopover={props.displayPopover}
      preferredPosition={['bottom']}
      renderPopoverContent={() => <FilterPopover filters={props.filters} handleFilterChange={props.handleFilterChange} filterValues={props.filterValues} onFilterClear={props.onFilterClear} />}
      onClickOutside={props.onClick}
    >
      <div styleName={classNames('filterButton', { noBorder: props.noBorder }, { popoverOpen: props.displayPopover })} onClick={props.onClick}>
        <div styleName={'buttonLabel'}>
          {props.label}
        </div>
        <div styleName={'arrowIcon'} className={'icon-collapsDown'} />
      </div>
    </Popover>
  );
};

FilterPopoverButton.displayName = 'FilterPopoverButton';

FilterPopoverButton.defaultProps = {
  noBorder: false,
  displayPopover: false,
  onClick: () => null,
};

FilterPopoverButton.propTypes = {
  displayPopover: PropTypes.bool,
  filters: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
    key: PropTypes.string,
    options: PropTypes.array,
  })).isRequired,
  filterValues: PropTypes.object.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  noBorder: PropTypes.bool,
  onClick: PropTypes.func,
  onFilterClear: PropTypes.func.isRequired,
};

export default FilterPopoverButton;