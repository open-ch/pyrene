import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './textField.css';

interface TextFieldProps {
  /**
   * Focus an element when it mounts.
   */
  autoFocus?: boolean;
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean;
  /**
   * Sets a label below the input field to display additional information for the user.
   */
  helperLabel?: string;
  /**
   * Sets the visual appearance, to signal that the input is invalid.
   */
  invalid?: boolean;
  /**
   * Sets the label displayed instead of the helperLabel when the input is invalid.
   */
  invalidLabel?: string;
  /**
   * Sets the html name property of the form element.
   */
  name?: string;
  /**
   * Javascript event handler.
   */
  onBlur?: () => void;
  /**
   * Called when hitting Escape.
   */
  onCancel?: () => void;
  /**
   * Javascript event handler.
   */
  onChange?: () => void;
  /**
   * Javascript event handler.
   */
  onFocus?: () => void;
  /**
   * Called when hitting enter
   */
  onSubmit?: () => void;
  /**
   * Sets the placeholder label.
   */
  placeholder?: string;
  /**
   * Adds a visual indication to display that the field is required.
   */
  required?: boolean;
  /**
   * Applies type 'password' to the input field, i.e. entered text will be obscured.
   */
  secret?: boolean;
  /**
   * Sets the title above the input field.
   */
  title?: string;
  /**
   * Sets the value of the input field.
   */
  value?: string;
  /**
   * Sets a fixed width (px) for the input field.
   */
  width?: number;
}

/**
 * A text field allows the user to enter and edit text or numeric values in one line.
 * Use text fields in forms to allow enter, select, and search for text.
 * Text fields are typically found within a form but can also be part of a modal, dialog, search etc.
 *
 * Don’t use the text field to enter dates and times.
 * In this case, use the date picker, date range selection, or date/time picker. For entering long texts use the textarea component.
 */
const TextField: FunctionComponent<TextFieldProps> = ({
  title = '',
  value = '',
  placeholder = '',
  helperLabel = '',
  invalidLabel = '',
  name = '',
  width = -1,
  required = false,
  secret = false,
  disabled = false,
  invalid = false,
  onBlur = () => null,
  onCancel = null,
  onChange = () => null,
  onFocus = () => null,
  onSubmit = null,
  autoFocus = false,
}: TextFieldProps) => (
  <div
    className={clsx(styles.textFieldContainer, {
      [styles.disabled]: disabled,
      [styles.invalid]: invalid && !disabled,
    })}
    style={{ width: width >= 0 ? `${width}px` : '100%' }}
  >
    {title && (
      <div
        className={clsx(styles.textFieldTitle, {
          [styles.required]: required && !disabled,
        })}
      >
        {title}
      </div>
    )}
    <div className={styles.textFieldIconLayoutContainer}>
      <input
        className={clsx(styles.textField, { [styles.filled]: value })}
        type={secret ? 'password' : 'text'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value, event)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && onSubmit) {
            onSubmit(value);
            return;
          }

          if (event.keyCode === 27 && onCancel) {
            onCancel();
          }
        }}
        onBlur={onBlur}
        onFocus={onFocus}
        autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
      />
      {/* Future use of an api with predefined icons - <span className={clsx(`pyreneIcon-${props.icon}`, styles.textFieldIcon)} /> */}
    </div>

    {invalid && invalidLabel && !disabled ? (
      <div className={styles.invalidLabel}>
        <span className={clsx('pyreneIcon-errorOutline', styles.errorIcon)} />
        {invalidLabel}
      </div>
    ) : (
      <>
        {helperLabel && (
          <div className={styles.textFieldHelper}>{helperLabel}</div>
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

export default TextField;
