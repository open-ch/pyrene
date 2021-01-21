import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './textField.css';

/**
 * A text field allows the user to enter and edit text or numeric values in one line.
 * Use text fields in forms to allow enter, select, and search for text.
 * Text fields are typically found within a form but can also be part of a modal, dialog, search etc.
 *
 * Don’t use the text field to enter dates and times.
 * In this case, use the date picker, date range selection, or date/time picker. For entering long texts use the textarea component.
 */
const TextField = (props) => (
  <div styleName={classNames('textFieldContainer', { disabled: props.disabled }, { invalid: props.invalid && !props.disabled })} style={{ width: (props.width >= 0) ? `${props.width}px` : '100%' }}>
    {props.title && <div styleName={classNames('textFieldTitle', { required: props.required && !props.disabled })}>{props.title}</div>}
    <div styleName="textFieldIconLayoutContainer">

      <input
        styleName={classNames('textField', { filled: props.value })}
        type={props.secret ? 'password' : 'text'}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value, event)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && props.onSubmit) {
            props.onSubmit(props.value);
            return;
          }

          if (event.keyCode === 27 && props.onCancel) {
            props.onCancel();
          }
        }}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        autoFocus={props.autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
      />
      {/* Future use of an api with predefined icons - <span className={`pyreneIcon-${props.icon}`} styleName={'textFieldIcon'} /> */}
    </div>

    {props.invalid && props.invalidLabel && !props.disabled
      ? (
        <div styleName="invalidLabel">
          <span className="pyreneIcon-errorOutline" styleName="errorIcon" />
          {props.invalidLabel}
        </div>
      )
      : (
        <>
          {props.helperLabel
        && (
          <div styleName="textFieldHelper">
            {props.helperLabel}
          </div>
        )}
        </>
      )}
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
  secret: false,
  disabled: false,
  invalid: false,
  onBlur: () => null,
  onCancel: null,
  onChange: () => null,
  onFocus: () => null,
  onSubmit: null,
  autoFocus: false,
};

TextField.propTypes = {
  /**
    * Focus an element when it mounts.
    */
  autoFocus: PropTypes.bool,
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Sets a label below the input field to display additional information for the user.
   */
  helperLabel: PropTypes.string,
  /**
   * Sets the visual appearance, to signal that the input is invalid.
   */
  invalid: PropTypes.bool,
  /**
   * Sets the label displayed instead of the helperLabel when the input is invalid.
   */
  invalidLabel: PropTypes.string,
  /**
   * Sets the html name property of the form element.
   */
  name: PropTypes.string,
  /**
   * Javascript event handler.
   */
  onBlur: PropTypes.func,
  /**
   * Called when hitting Escape.
   */
  onCancel: PropTypes.func,
  /**
    * Javascript event handler.
    */
  onChange: PropTypes.func,
  /**
   * Javascript event handler.
   */
  onFocus: PropTypes.func,
  /**
   * Called when hitting enter
   */
  onSubmit: PropTypes.func,
  /**
   * Sets the placeholder label.
   */
  placeholder: PropTypes.string,
  /**
   * Adds a visual indication to display that the field is required.
   */
  required: PropTypes.bool,
  /**
   * Applies type 'password' to the input field, i.e. entered text will be obscured.
   */
  secret: PropTypes.bool,
  /**
   * Sets the title above the input field.
   */
  title: PropTypes.string,
  /**
   * Sets the value of the input field.
   */
  value: PropTypes.string,
  /**
   * Sets a fixed width (px) for the input field.
   */
  width: PropTypes.number,
};

export default TextField;
