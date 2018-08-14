import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popover from 'react-tiny-popover';

import './filterPopoverButton.css';

const FilterPopoverButton = props => {
  return (
    <Popover
      isOpen={props.displayPopover}
      position={['bottom']}
      align={'start'}
      padding={16}
      content={({ position, nudgedLeft, nudgedTop, targetRect, popoverRect }) => (
        <div>
          Test
        </div>
      )}
      containerStyle={{zIndex: 10}}
      disableReposition={true}
      onClickOutside={props.onClick}
    >
      <div styleName={classNames('filterButton', { noBorder: props.noBorder })} onClick={props.onClick}>
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