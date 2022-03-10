/* eslint-disable react/require-default-props */
import React, { FunctionComponent, useState } from 'react';
import clsx from 'clsx';
import Popover from '../Popover/Popover';
import OptionList from './OptionList';
import styles from './RadioPopover.module.css';
import { Option } from './types';

export interface RadioPopoverProps {
  /**
   * Sets the selected choice of the user.
   */
  onChange: (option: Option) => void;
  /**
   * Set the values that the user can choose from.
   */
  options: Array<Option>;
  /**
   * Render callback for the help section above the options
   */
  renderHelpSection?: () => JSX.Element;
  /**
   * Render callback for the label for custom formatting
   */
  renderLabel?: (option: Option) => string | undefined | JSX.Element;
  /**
   * selected value - should match the `value` key in one of the `options`
   */
  value?: number | string | null;
}

const RadioPopover: FunctionComponent<RadioPopoverProps> = ({
  onChange,
  renderHelpSection,
  options = [],
  renderLabel = (option) => option?.label,
  value = null,
}: RadioPopoverProps) => {
  const [displayPopover, setDisplayPopover] = useState(false);

  const togglePopover = () => setDisplayPopover((prevDisplayPopover) => !prevDisplayPopover);

  const closePopover = () => setDisplayPopover(false);

  const selectedValue = options.find((option) => option.value === value);

  return (
    <div className={styles.radioPopover}>
      <Popover
        preferredPosition={['bottom']}
        align="end"
        displayPopover={displayPopover}
        distanceToTarget={8}
        onClickOutside={closePopover}
        renderPopoverContent={() => (
          <OptionList
            options={options}
            onChange={(newValue) => {
              onChange(newValue);
              closePopover();
            }}
            renderHelpSection={renderHelpSection}
            selectedValue={selectedValue}
          />
        )}
      >
        <div
          className={clsx(styles.popoverTriggerButton, {
            [styles.popoverOpen]: displayPopover,
          })}
          onClick={togglePopover}
        >
          <div className={clsx(styles.buttonLabel, 'unSelectable')}>
            {selectedValue && renderLabel(selectedValue)}
          </div>
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

RadioPopover.displayName = 'RadioPopover';

export default RadioPopover;
