import React, { FunctionComponent, useState } from 'react';
import clsx from 'clsx';
import Popover from '../Popover/Popover';
import OptionsList from './OptionsList';
import Loader from '../Loader/Loader';
import './dropdownButton.css';

/**
 * Dropdown Buttons are used primarily to group actions of a common topic.
 * They have the same appearance and behaviour as the regular Button.
 */

export interface DropdownButtonProps {
  /**
   * Array of action objects holding a Label, Icon and its associated Javascript event handler.
   */
  actions?: Array<{
    label: string,
    onClick: () => void,
  }>,
  /**
   * Sets the alignment of the dropdown relative to the button.
   */
  align?: 'start' | 'end',
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean,
  /**
   * Adds an icon to the element.
   */
  icon?: string,
  /**
   * Sets the label displayed to the user.
   */
  label: string,
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading?: boolean,
}

const DropdownButton: FunctionComponent<DropdownButtonProps> = ({
  actions = [{ label: 'tbd', onClick: () => null }],
  align = 'start',
  disabled = false,
  icon = '',
  label,
  loading = false,
}: DropdownButtonProps) => {
  const [displayActions, setDisplayActions] = useState(false);
  const onClose = () => setDisplayActions(false);

  return (
    <Popover
      displayPopover={displayActions}
      onClickOutside={onClose}
      renderPopoverContent={() => <OptionsList actions={actions} onClick={onClose} />}
      preferredPosition={['bottom']}
      distanceToTarget={4}
      align={align}
    >
      <div className="buttonContainer">
        <button
          type="submit"
          styleName={
            clsx('button',
              { disabled: disabled },
              { loading: loading },
              { openedDropdown: displayActions })
          }
          disabled={disabled || loading}
          onClick={() => setDisplayActions((prevDisplayActions) => !prevDisplayActions)}
        >
          {icon && <span styleName="icon" className={`pyreneIcon-${icon}`} />}
          <div styleName="label">
            <span>{label}</span>
            <span className="pyreneIcon-chevronDown" styleName="arrow" />
          </div>
        </button>
        {loading && <span styleName="loader"><Loader size="small" styling="dark" /></span>}
      </div>
    </Popover>
  );
};

DropdownButton.displayName = 'Dropdown Button';

// defaultProps for compatibilty with kitchensink for pyrene documentation
DropdownButton.defaultProps = {
  align: 'start',
};

export default DropdownButton;
