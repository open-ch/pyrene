import React, { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './TextArea.module.css';

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
  /**
   * Whether the text area automatically adjusts to the content
   */
  adaptToContent?: boolean,
  /**
   * Min number of rows, useful when combined with adaptToContent prop
   */
  minRows?: number,
  /**
   * Max number of rows, useful when combined with adaptToContent prop
   */
  maxRows?: number,
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
  onBlur,
  onChange,
  onFocus,
  adaptToContent = false,
  minRows = 1,
  maxRows = 10,
}: TextAreaProps) => {

  const textAreaLineHeight = 16;
  const characterCount = maxLength - (value !== null ? value.length : 0);
  const characterLimitReached = characterCount < 0;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [currentRows, setCurrentRows] = useState(minRows);
  const [text, setText] = useState(value);

  useEffect(() => {
    if (adaptToContent && textAreaRef.current) {
      // eslint-disable-next-line no-bitwise
      const rowsFromHeight = Math.floor(textAreaRef.current.scrollHeight / textAreaLineHeight);
      if (rowsFromHeight >= maxRows) {
        setCurrentRows(maxRows);
      } else if (rowsFromHeight <= minRows) {
        setCurrentRows(minRows);
      } else {
        setCurrentRows(rowsFromHeight);
      }
    }
  }, [text, adaptToContent, maxRows, minRows]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (adaptToContent) {
      setCurrentRows(minRows); // we need to reset the row number to make sure we don't build up indefinitely
      setText(event.target.value);
    }
    onChange?.(event.target.value, event);
  };

  return (
    <div
      style={{ width }}
      className={clsx(
        styles.textAreaContainer,
        { [styles.disabled]: disabled },
        { [styles.invalid]: invalid && !disabled },
        { [styles.full]: characterLimitReached && !disabled && maxLength > 0 },
      )}
    >
      <div className={styles.textAreaTitleBar}>
        {title && <span className={clsx(styles.textAreaTitle, { [styles.required]: required && !disabled })}>{title}</span>}
        {maxLength > 0 && <span className={styles.characterCounter}>{characterCount}</span>}
      </div>
      <textarea
        ref={textAreaRef}
        style={{ lineHeight: `${textAreaLineHeight}px` }}
        className={clsx(styles.textArea, { [styles.resizeable]: resizeable }, { [styles.filled]: value })}
        name={name}
        placeholder={placeholder}
        rows={adaptToContent ? currentRows : Math.max(1, rows)}
        value={value}
        wrap="hard"
        onBlur={onBlur}
        onChange={(event) => onChangeHandler(event)}
        onFocus={onFocus}
      />
      {invalid && invalidLabel && !disabled
        ? (
          <div className={styles.invalidLabel}>
            <span className={clsx('pyreneIcon-errorOutline', styles.errorIcon)} />
            {invalidLabel}
          </div>
        ) : helperLabel && (
          <div className={styles.textAreaHelper}>
            {helperLabel}
          </div>
        )}
    </div>
  );
};

TextArea.displayName = 'TextArea';

export default TextArea;
