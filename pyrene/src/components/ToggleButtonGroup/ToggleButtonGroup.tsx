import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './toggleButtonGroup.css';

export interface ToggleButtonGroupValue {
  label: string;
  value: string;
}

export interface ToggleButtonGroupProps {
  disabled?: boolean,
  onChange: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  options: ToggleButtonGroupValue[],
  styling?: 'box' | 'shadow'
}

/**
 * A group of toggle buttons that can be toggled one at a time.
 */
const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = (props) => (

  <div styleName={classNames('toggleButtonGroup', `box-${props.styling}`)}>
    {props.options.map((option) => (
      <button
        id={option.value}
        key={option.value}
        type="button"
        styleName={
          classNames(
            { disabled: props.disabled },
            { active: props.value === option.value },
          )
        }
        disabled={props.disabled}
        onClick={() => {
          if (props.value !== option.value) {
            props.onChange(option.value);
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

ToggleButtonGroup.defaultProps = {
  disabled: false,
  styling: 'box',
};

ToggleButtonGroup.propTypes = {
  /**
   * Disabling all buttons - no onClick and opacity 50%
   * */
  disabled: PropTypes.bool,
  /**
   * What happens when one value is toggled
   */
  onChange: PropTypes.func.isRequired,
  /**
   * All options that can be toggled.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    /**
     * The displayed information about the option
     */
    label: PropTypes.string.isRequired,
    /**
     * The value set when the action is toggled.
     */
    value: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  /**
   * Sets the box style of the toggle group.
   */
  styling: PropTypes.oneOf(['box', 'shadow']),
  /**
   * The selected value in the option list.
   */
  value: PropTypes.string.isRequired,
};

export default ToggleButtonGroup;
