import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './checkbox.css';

/**
 * Checkboxes are used primarily on ....
 */
const Checkbox = (props) => {
  const rand = Math.floor(Math.random() * 1e10);
  return (
    <div styleName={'checkboxContainer'} id={props.name} onBlur={props.onBlur} tabIndex={0}>
      <input
        id={`checkbox_${props.label}_${rand}`}
        styleName={'checkbox'}
        type={'checkbox'}
        checked={props.value}
        onChange={props.onChange}
        name={props.name}
      />

      <label
        className={'unSelectable'}
        styleName={
          classNames('checkboxLabel',
            {checked: props.value},
            {disabled: props.disabled},
            {invalid: props.invalid && !props.value})}
        htmlFor={`checkbox_${props.label}_${rand}`}
      >
        <span styleName={'checkboxIcon'}/>
        {props.label}
      </label>
    </div>
  );
};

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  disabled: false,
  value: false,
  invalid: false,
  name: '',
  onChange: () => null,
  onBlur: () => null,
};

Checkbox.propTypes = {
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Changes the visual appearance, to signal that the usage was invalid.
   */
  invalid: PropTypes.bool,
  /**
   * Displayed label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Sets the html name property of the form element.
   */
  name: PropTypes.string,
  /**
   * Event handler.
   */
  onBlur: PropTypes.func,
  /**
   * Event handler.
   */
  onChange: PropTypes.func,
  /**
   * Sets the Checkbox to either true or false.
   */
  value: PropTypes.bool,
};

export default Checkbox;