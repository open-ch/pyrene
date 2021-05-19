import React from 'react';
import clsx from 'clsx';
import styles from './textArea.css';

export interface TextAreaProps {
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean,
  /**
   * Sets a label below the input field to display additional information for the user.
   */
  helperLabel?: string,
  /**
   * Sets the visual appearance, to signal that the input is invalid.
   */
  invalid?: boolean,
  /**
   * Sets the label displayed instead of the helperLabel when the input is invalid.
   */
  invalidLabel?: string,
  /**
   * Sets a maximum allowed number of characters.
   */
  maxLength?: number,
  /**
   * Sets the html name property of the form element.
   */
  name?: string,
  /**
   * Javascript event handler.
   */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void,
  /**
   * Javascript event handler.
   */
  onChange?: (updatedValue: string, event: React.FormEvent<HTMLTextAreaElement>) => void,
  /**
   * Javascript event handler.
   */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void,
  /**
   * Sets the placeholder label.
   */
  placeholder?: string,
  /**
   * Adds a visual indication to display that the field is required.
   */
  required?: boolean,
  /**
   * Whether the user can resize the text area's height.
   */
  resizeable?: boolean,
  /**
   * Sets a fixed height for the input field.
   */
  rows?: number,
  /**
   * Sets the title above the input field.
   */
  title?: string,
  /**
   * Sets the value of the input field.
   */
  value?: string,
  /**
   * Sets a fixed width (px) for the input field.
   */
  width?: number | string,
}

/**
 * Textareas allow the user to enter several lines of text.
 */
const TextArea: React.FC<TextAreaProps> = ({
  disabled = false,
  helperLabel = '',
  invalid = false,
  title = '',
  value = '',
  placeholder = '',
  invalidLabel = '',
  name = '',
  width = '100%',
  rows = 3,
  maxLength = 0,
  resizeable = false,
  required = false,
  onBlur = () => null,
  onChange = () => null,
  onFocus = () => null,
}: TextAreaProps) => {

  const characterCount = maxLength - (value !== null ? value.length : 0);
  const characterLimitReached = characterCount < 0;

  return (
    <div
      style={{ width: width }}
      className={clsx(
        styles.textAreaContainer,
        { [styles.disabled]: disabled },
        { [styles.invalid]: (invalid && !disabled) },
        { [styles.full]: (characterLimitReached && !disabled && maxLength > 0) },
      )}
    >
      <div className={styles.textAreaTitleBar}>
        {title && <span className={clsx(styles.textAreaTitle, { [styles.required]: (required && !disabled) })}>{title}</span>}
        {maxLength > 0 && <span className={styles.characterCounter}>{characterCount}</span>}
      </div>
      <textarea
        className={clsx(styles.textArea, { [styles.resizeable]: resizeable }, { [styles.filled]: value })}
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
        wrap="hard"
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value, event)}
        onFocus={onFocus}
      />

      {(invalid && invalidLabel && !disabled)
        ? (
          <div className={styles.invalidLabel}>
            <span className={clsx('pyreneIcon-errorOutline', styles.errorIcon)} />
            {invalidLabel}
          </div>
        )
        : (
          <>
            {helperLabel
          && (
            <div className={styles.textAreaHelper}>
              {helperLabel}
            </div>
          )}
          </>
        )}
    </div>
  );
};

TextArea.displayName = 'Textarea';

export default TextArea;
