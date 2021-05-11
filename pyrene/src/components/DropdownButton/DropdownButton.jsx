import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Popover from '../Popover/Popover';
import OptionsList from './OptionsList';
import Loader from '../Loader/Loader';

import styles from './dropdownButton.css';

/**
 * Dropdown Buttons are used primarily to group actions of a common topic.
 * They have the same appearance and behaviour as the regular Button.
 */
const DropdownButton = (props) => {

  const [state, setState] = useState({
    displayActions: false,
  });

  const onClose = () => setState({ displayActions: false });

  return (
    <Popover
      displayPopover={state.displayActions}
      onClickOutside={onClose}
      renderPopoverContent={() => <OptionsList actions={props.actions} onClick={onClose} />}
      preferredPosition={['bottom']}
      distanceToTarget={4}
      align={props.align}
    >
      <div className={styles.buttonContainer}>
        <button
          type="submit"
          className={
            clsx(styles.button,
              { [styles.disabled]: props.disabled },
              { [styles.loading]: props.loading },
              { [styles.openedDropdown]: state.displayActions })
          }
          disabled={props.disabled || props.loading}
          onClick={() => setState({ displayActions: !state.displayActions })}
        >
          {props.icon && <span className={clsx(styles.icon, `pyreneIcon-${props.icon}`)} />}

          <div className={styles.label}>
            <span>{props.label}</span>
            <span className={clsx('pyreneIcon-chevronDown', styles.arrow)} />
          </div>

        </button>
        {props.loading && <span className={styles.loader}><Loader size="small" styling="dark" /></span>}
      </div>
    </Popover>
  );
};

DropdownButton.displayName = 'Dropdown Button';

DropdownButton.defaultProps = {
  actions: [{ label: 'tbd', onClick: () => null }],
  align: 'start',
  disabled: false,
  icon: '',
  loading: false,
};

DropdownButton.propTypes = {
  /**
   * Array of action objects holding a Label, Icon and its associated Javascript event handler.
   */
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  })),
  /**
   * Sets the alignment of the dropdown relative to the button.
   */
  align: PropTypes.oneOf(['start', 'end']),
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
  label: PropTypes.string.isRequired,
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading: PropTypes.bool,
};

export default DropdownButton;
