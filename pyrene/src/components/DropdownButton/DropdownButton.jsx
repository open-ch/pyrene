import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover/Popover';
import Button from '../Button/Button';

import './dropdownButton.css';

/**
 * DropdownButtons
 */
const DropdownButton = (props) => {

  const [state, setState] = useState({
    displayActions: false,
  });

  const _getActionButtons = () => (
    <div styleName={'actionContainer'}>
      {props.actions.map((action) => (
        <Button
          label={action.label}
          onClick={action.onClick}
          type={props.type}
        />
      ))}
    </div>
  );

  return (
    <Popover
      displayPopover={state.displayActions}
      onClickOutside={() => setState({ displayActions: false })}
      renderPopoverContent={_getActionButtons}
      preferredPosition={['bottom']}
      distanceToTarget={4}
      align={'end'}
    >
      <Button
        label={props.primaryLabel}
        onClick={() => setState({ displayActions: !state.displayActions })}
        disabled={props.disabled}
        icon={props.icon}
        loading={props.loading}
        type={props.type}
      />
    </Popover>
  );
};

DropdownButton.displayName = 'Button';

DropdownButton.defaultProps = {
  icon: '',
  type: 'primary',
  loading: false,
  disabled: false,
  actions: [{ label: 'tbd', onClick: () => null }],
};

DropdownButton.propTypes = {
  /**
   * Array of action objects which consist of a Label and its associated Javascript event handler.
   */
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  })),
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Adds an icon to the element.
   */
  icon: PropTypes.string,
  /**
   * Sets the label displayed to the user.
   */
  loading: PropTypes.bool,
  /**
   * Disables the component and displays a loader inside of it.
   */
  primaryLabel: PropTypes.string.isRequired,
  /**
   * Sets the overall style.
   */
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost', 'action', 'admin']),
};

export default DropdownButton;
