import React from 'react';
import classNames from 'classnames';
import SVG from 'react-svg-inline';

import './radioSelection.css';

import iconNormal from './radio-blank.svg';
import iconNormalHover from './radio-hover.svg';
import iconSelected from './radio-selected.svg';
import iconSelectedHover from './radio-selected-hover.svg';
import iconInvalid from './radio-invalid.svg';
import iconInvalidHover from './radio-invalid-hover.svg';

export interface RadioButtonProps {
  /**
   * Sets the checked option of the radio button
   */
  checked?: boolean,
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean,
  /**
   * Javascript event handler.
   */
  hovered?: {[key: string]: boolean},
  /**
   * Sets the visual appearance, to signal that the radio button is invalid.
   */
  invalid?: boolean,
  /**
   * Sets ID of radio button
   */
  id?: string,
  /**
   * Sets the label of the radio button
   */
  label?: string,
  /**
   * Sets the name of the radio button
   */
  name?: string,
  /**
   * Javascript onchange event handler.
   */
  onChange?: (value: number | string, event: React.ChangeEvent<HTMLInputElement>) => void, // FixMe
  /**
   * Sets readonly property of radio button
   */
  readonly?: boolean,
  /**
   * Sets the value of the radio button.
   */
  value: number | string,
}


const iconMap = {
  normal: {
    default: iconNormal,
    hover: iconNormalHover,
  },
  checked: {
    default: iconSelected,
    hover: iconSelectedHover,
  },
  invalid: {
    default: iconInvalid,
    hover: iconInvalidHover,
  },
};

const getRadioIcon = (
  { checked, disabled, invalid }: {checked: boolean, disabled: boolean, invalid: boolean},
  hovered?: boolean,
) => {
  const iconKey = !disabled && hovered ? 'hover' : 'default';
  let icon = iconMap.normal[iconKey];
  if (invalid) {
    icon = iconMap.invalid[iconKey];
  } else if (checked) {
    icon = iconMap.checked[iconKey];
  }
  return <SVG svg={icon} />;
};

/**
 * Radio buttons allow the user to select an option from a set.
 * Use radio buttons if you need to see all available options.
 *
 * If the available options can be collapsed, you should use a drop-down menu instead because it takes up less space.
 */
const RadioButton: React.FC<RadioButtonProps> = ({
  checked = false,
  disabled = false,
  invalid = false,
  id = undefined,
  hovered = { '': false },
  label = '',
  name = '',
  readonly = false,
  value = '',
  onChange = () => null,
}: RadioButtonProps) => {

  const rand = Math.floor(Math.random() * 1e10);

  const key = `radio_${label}_${value}`;
  const htmlId = `${key}_${rand}`;

  return (
    <React.Fragment key={key}>
      <input
        styleName="radioInput"
        checked={checked}
        id={id != null ? id : htmlId}
        name={name}
        type="radio"
        value={value}
        disabled={disabled}
        readOnly={readonly}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value, event)}
      />

      <label
        htmlFor={id != null ? id : htmlId}
        styleName={
          classNames('radioLabel',
            { disabled: disabled })
        }
      >
        <span styleName="radioIcon">
          {getRadioIcon({
            checked: checked,
            disabled: disabled,
            invalid: invalid,
          }, hovered[key])}
        </span>
        {label}
      </label>
    </React.Fragment>
  );
};


RadioButton.displayName = 'Radio Button';

export default RadioButton;
