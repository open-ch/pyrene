import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popover from 'react-tiny-popover';

import './filterPopoverButton.css';
import FilterPopover from '../FilterPopover/FilterPopover';

const FilterPopoverButton = props => {
  return (
    <Popover
      isOpen={props.displayPopover}
      position={['bottom']}
      align={'start'}
      padding={8}
      content={({ position, nudgedLeft, nudgedTop, targetRect, popoverRect }) => (
        <FilterPopover />
      )}
      containerClassName={'filterPopover'}
      onClickOutside={props.onClick}
      disableReposition
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