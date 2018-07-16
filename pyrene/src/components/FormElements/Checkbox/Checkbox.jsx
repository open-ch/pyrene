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
    <div styleName={'checkboxContainer'}>
      <input
        id={`checkbox_${props.label}_${rand}`}
        styleName={'checkbox'}
        type={'checkbox'}
        checked={props.checked}
        onChange={props.onCheckBoxChange}
        name={props.name}
      />

      <label
        className={'unSelectable'}
        styleName={
          classNames('checkboxLabel',
            { checked: props.checked },
            { disabled: props.disabled },
            { invalid: props.invalid && !props.checked })}
        htmlFor={`checkbox_${props.label}_${rand}`}
      >
        <span styleName={'checkboxIcon'} />
        {props.label}
      </label>
    </div>
  );
};

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  disabled: false,
  checked: false,
  invalid: false,
  name: '',
  onCheckBoxChange: () => null,
};

Checkbox.propTypes = {
  /**
   * Pre-checks the checkbox.
   */
  checked: PropTypes.bool,
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
  onCheckBoxChange: PropTypes.func,
};

export default Checkbox;