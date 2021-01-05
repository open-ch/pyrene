import React, { useState } from 'react';
import classNames from 'classnames';
import SVG from 'react-svg-inline';
import Tooltip from '../Tooltip/Tooltip';
import './checkbox.css';

import iconNormal from './checkbox-blank.svg';
import iconNormalHover from './checkbox-hover.svg';
import iconSelected from './checkbox-selected.svg';
import iconSelectedHover from './checkbox-selected-hover.svg';
import iconInvalid from './checkbox-invalid.svg';
import iconInvalidHover from './checkbox-invalid-hover.svg';

export interface CheckboxProps {
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean,
  /**
   * Sets the visual appearance, to signal that the input is invalid.
   */
  invalid?: boolean,
  /**
   * Sets the label displayed to the user.
   */
  label?: string,
  /**
   * Sets the html name property of the form element.
   */
  name?: string,
  /**
   * Javascript event handler.
   */
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void,
  /**
   * Javascript event handler.
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void,
  /**
   * Adds a visual indication to display that the field is required.
   */
  required?: boolean,
  /**
   * Defines a text tooltip for the checkbox when hovered
   */
  tooltip?: string,
  /**
   * Sets whether the checkbox is checked.
   */
  value?: boolean,
}

type Option = {
  checked: boolean,
  invalid: boolean,
  disabled: boolean,
};

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

const getCheckboxIcon = (option: Option, hovered: boolean) => {
  const { checked, disabled, invalid } = option;
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
 * Checkboxes allow the user to select one or more items from a set.
 *
 * Checkboxes can also be used to turn an option on or off.
 */
const Checkbox: React.FC<CheckboxProps> = ({
  disabled = false,
  invalid = false,
  label = '',
  name = '',
  onBlur = () => null,
  onChange = () => null,
  required = false,
  tooltip = '',
  value = false,
}: CheckboxProps) => {
  const [hovered, setHovered] = useState(false);

  const option: Option = {
    checked: value,
    invalid: invalid && !value,
    disabled: disabled,
  };

  const rand = Math.floor(Math.random() * 1e10);

  const renderTooltipWrapper = () => {
    const labelChildren = (
      <div>
        <span styleName="checkboxIcon">{getCheckboxIcon(option, hovered)}</span>
        {label && <span styleName="checkboxLabelText">{label}</span>}
      </div>
    );
    if (tooltip) {
      return (
        <Tooltip
          label={tooltip}
          preferredPosition={['bottom', 'right']}
          maxWidth={176}
        >
          {labelChildren}
        </Tooltip>
      );
    }
    return labelChildren;
  };

  return (
    <div
      styleName="checkboxContainer"
      id={name}
      onBlur={onBlur}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        id={`checkbox_${label}_${rand}`}
        styleName="checkbox"
        type="checkbox"
        checked={value}
        onChange={!disabled ? (event) => onChange(event.target.checked, event) : () => {}}
        onClick={(e) => e.stopPropagation()}
        name={name}
      />
      <label
        className="unSelectable"
        styleName={classNames('checkboxLabel', { disabled: disabled, required: required })}
        htmlFor={`checkbox_${label}_${rand}`}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="checkbox"
        aria-checked={value}
      >
        {renderTooltipWrapper()}
      </label>
    </div>
  );

};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
