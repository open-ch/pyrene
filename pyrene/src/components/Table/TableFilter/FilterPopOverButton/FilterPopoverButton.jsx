import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popover from '../../../Popover/Popover';

import './filterPopoverButton.css';
import FilterPopover from '../FilterPopover/FilterPopover';

const FilterPopoverButton = props => {
  return (
    <Popover
      align={'start'}
      distanceToTarget={8}
      displayPopover={props.displayPopover}
      preferredPosition={['bottom']}
      renderPopoverContent={() => <FilterPopover />}
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
  label: PropTypes.string.isRequired,
  noBorder: PropTypes.bool,
  onClick: PropTypes.func,
};

export default FilterPopoverButton;