import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './textField.css';

/**
 * Textfields are used primarily on ....
 */
const TextField = (props) => (
  <div styleName={classNames('textFieldContainer', { disabled: props.disabled }, { invalid: props.invalid && !props.disabled })} style={{ width: (props.width >= 0) ? `${props.width}px` : '100%' }}>
    {props.title && <div styleName={classNames('textFieldTitle', { required: props.required && !props.disabled })}>{props.title}</div>}
    <div styleName={'textFieldIconLayoutContainer'}>
      {/*{ hasIcon: props.icon }*/}
      <input
        styleName={classNames('textField', { filled: props.value })}
        type="text"
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
      {/* Future use of an api with predefined icons - <span className={`icon-${props.icon}`} styleName={'textFieldIcon'} />*/}
    </div>

    {props.invalid && props.invalidLabel && !props.disabled ?
      <div styleName={'invalidLabel'}>
        <span className={'icon-errorOutline'} styleName={'errorIcon'} />
        {props.invalidLabel}
      </div>
      :
      <React.Fragment>
        {props.helperLabel &&
        <div styleName={'textFieldHelper'}>
          {props.helperLabel}
        </div>}
      </React.Fragment>
    }
  </div>
);

TextField.displayName = 'Textfield';

TextField.defaultProps = {
  title: '',
  value: '',
  placeholder: '',
  helperLabel: '',
  invalidLabel: '',
  name: '',
  width: -1,
  required: false,
  disabled: false,
  invalid: false,
  onBlur: () => null,
  onChange: () => null,
  onFocus: () => null,
};

TextField.propTypes = {
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Helper text below the input field, also used to display error messages if prop invalid is set.
   */
  helperLabel: PropTypes.string,
  /**
   * Changes the fields and helpers visual appearance to indicate a validation error.
   */
  invalid: PropTypes.bool,
  /**
   * Displayed instead of the helperLabel if specified & invalid is set.
   */
  invalidLabel: PropTypes.string,
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
   * Event handler.
   */
  onFocus: PropTypes.func,
  /**
   * Changes what the text field placeholder says.
   */
  placeholder: PropTypes.string,
  /**
   * Adds a visual indication that the field is required..
   */
  required: PropTypes.bool,
  /**
   * Changes what the title says.
   */
  title: PropTypes.string,
  /**
   * Changes what the text field says.
   */
  value: PropTypes.string,
  /**
   * Changes the width of the input field in px. Use -1 to inherit parent width.
   */
  width: PropTypes.number,
};

export default TextField;