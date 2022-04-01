import React, { FunctionComponent, useState } from 'react';
import { PopoverProps } from 'react-tiny-popover';
import clsx from 'clsx';

import Popover from '../Popover/Popover';
import CheckboxList, { CheckboxListProps } from './CheckboxList';
import styles from './CheckboxPopover.module.css';

export interface CheckboxPopoverProps {
  /** Label of the dropdown button. */
  buttonLabel: string;
  /** Whether the component is disabled or not. */
  disabled?: boolean;
  /**
   * Sets the alignment of the popover.
   */
  align?: PopoverProps['align'];
  /**
   * Items that can be checked or unchecked.
   * The value indicates whether the item is checked.
   *
   * Type: [{ id?: string, label?: string, value?: boolean }]
   */
  listItems: CheckboxListProps['listItems'];
  /**
   * Handles the event that one list item is checked/unchecked.
   */
  onItemClick: CheckboxListProps['onItemClick'];
  /**
   * Handles the event that the "Restore default" button is clicked.
   */
  onRestoreDefault: CheckboxListProps['onRestoreDefault'];
}

/**
 * A popover on a button that lets the user choose from multiple options by
 * checking or unchecking them.
 */
const CheckboxPopover: FunctionComponent<CheckboxPopoverProps> = ({
  onRestoreDefault,
  listItems,
  onItemClick,
  buttonLabel,
  disabled = false,
  align = 'end'
}) => {
  const [displayPopover, setDisplayPopover] = useState(false);

  const togglePopover = () => setDisplayPopover((prevDisplayPopover) => !prevDisplayPopover);

  return (
    <div className={clsx(styles.checkboxPopover, { [styles.disabled]: disabled })}>
      <Popover
        preferredPosition={['bottom']}
        align={align}
        displayPopover={displayPopover}
        distanceToTarget={8}
        onClickOutside={() => setDisplayPopover(false)}
        renderPopoverContent={() => (
          <CheckboxList
            listItems={listItems}
            onItemClick={onItemClick}
            onRestoreDefault={onRestoreDefault}
          />
        )}
      >
        <div
          className={clsx(styles.popoverTriggerButton, { [styles.popoverOpen]: displayPopover })}
          onClick={togglePopover}
        >
          <div className={clsx(styles.buttonLabel, 'unSelectable')}>{buttonLabel}</div>
          <div
            className={clsx(styles.arrowIcon, {
              'pyreneIcon-chevronUp': displayPopover,
              'pyreneIcon-chevronDown': !displayPopover,
            })}
          />
        </div>
      </Popover>
    </div>
  );
};

CheckboxPopover.displayName = 'CheckboxPopover';

export default CheckboxPopover;
