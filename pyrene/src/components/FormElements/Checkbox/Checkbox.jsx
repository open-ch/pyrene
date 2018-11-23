import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SVG from 'react-svg-inline';

import './checkbox.css';

import normal from './checkbox-blank.svg';
import normalHover from './checkbox-hover.svg';
import selected from './checkbox-selected.svg';
import selectedHover from './checkbox-selected-hover.svg';
import invalid from './checkbox-invalid.svg';
import invalidHover from './checkbox-invalid-hover.svg';

const iconMap = {
  normal: {
    default: normal,
    hover: normalHover,
  },
  checked: {
    default: selected,
    hover: selectedHover,
  },
  invalid: {
    default: invalid,
    hover: invalidHover,
  },
};

const getCheckboxIcon = (options, hovered) => {
  const { checked, invalid, disabled } = options;
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
 * Checkboxes are used primarily on ....
 */
class Checkbox extends Component {
  state = {
    hovered: false,
  };

  onMouseEnter = () => {
    this.setState({ hovered: true });
  };

  onMouseLeave = () => {
    this.setState({ hovered: false });
  };

  render() {
    const { props } = this;
    const options = {
      checked: props.value,
      invalid: props.invalid && !props.value,
      disabled: props.disabled,
    };
    const rand = Math.floor(Math.random() * 1e10);
    return (
      <div
        styleName={'checkboxContainer'}
        id={props.name}
        onBlur={props.onBlur}
        tabIndex={0}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <input
          id={`checkbox_${props.label}_${rand}`}
          styleName={'checkbox'}
          type={'checkbox'}
          checked={props.value}
          onChange={!props.disabled ? props.onChange : undefined}
          onClick={(e) => e.stopPropagation()}
          name={props.name}
        />

        <label
          className={'unSelectable'}
          styleName={
            classNames('checkboxLabel', { disabled: props.disabled, required: props.required })}
          htmlFor={`checkbox_${props.label}_${rand}`}
          role="checkbox"
          aria-checked={props.checked}
        >
          <span styleName={'checkboxIcon'}>
            {getCheckboxIcon(options, this.state.hovered)}
          </span>
          {props.label}
        </label>
      </div>
    )
}
};

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  disabled: false,
  value: false,
  invalid: false,
  required: false,
  name: '',
  label: '',
  onChange: () => null,
  onBlur: () => null,
};

Checkbox.propTypes = {
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Sets the visual appearance, to signal that the input is invalid.
   */
  invalid: PropTypes.bool,
  /**
   * Sets the label displayed to the user.
   */
  label: PropTypes.string,
  /**
   * Sets the html name property of the form element.
   */
  name: PropTypes.string,
  /**
   * Javascript event handler.
   */
  onBlur: PropTypes.func,
  /**
   * Javascript event handler.
   */
  onChange: PropTypes.func,
  /**
   * Adds a visual indication to display that the field is required.
   */
  required: PropTypes.bool,
  /**
   * Sets whether the checkbox is checked.
   */
  value: PropTypes.bool,
};

export default Checkbox;