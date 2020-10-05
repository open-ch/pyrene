import * as React from 'react';
import classNames from 'classnames';
import './toggleButtonGroup.css';

export interface ToggleButtonGroupValue {
  /**
     * The displayed information about the option
     */
  label: string;
  /**
     * The value set when the action is toggled.
     */
  value: string;
}

export interface ToggleButtonGroupProps {
  /**
   * Disabling all buttons - no onClick and opacity 50%
   * */
  disabled?: boolean,
  /**
   * What happens when one value is toggled
   */
  onChange: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void,
  /**
   * All options that can be toggled.
   */
  options: ToggleButtonGroupValue[],
  /**
   * Sets the box style of the toggle group.
   */
  styling?: 'box' | 'shadow',
  /**
   * The selected value in the option list.
   */
  value: string,
}

/**
 * A group of toggle buttons that can be toggled one at a time.
 */
const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  disabled = false,
  onChange,
  options,
  styling = 'box',
  value,
}: ToggleButtonGroupProps) => (

  <div styleName={classNames('toggleButtonGroup', `box-${styling}`)}>
    {options.map((option) => (
      <button
        id={option.value}
        key={option.value}
        type="button"
        styleName={
          classNames(
            { disabled: disabled },
            { active: value === option.value },
          )
        }
        disabled={disabled}
        onClick={() => {
          if (value !== option.value) {
            onChange(option.value);
          }
        }}
      >
        <span>
          {option.label}
        </span>
      </button>
    ))}
  </div>
);

ToggleButtonGroup.displayName = 'Toggle Button Group';

export default ToggleButtonGroup;
