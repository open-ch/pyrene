import React, { forwardRef } from 'react';
import clsx from 'clsx';
import IconButton from '../../IconButton/IconButton';
import { allowedValueCheck } from '../../../utils/DateUtils';

import styles from './dateTimeInput.css';

export interface DateTimeInputProps {
  /**
   * Date format used by component
   */
  dateFormat?: string,
  /**
   * Boolean to toggle time display
  */
  dateOnly?: boolean,
  /**
   * Input date value
  */
  dateValue?: string,
  /**
   * Input error
  */
  errorValue?: string,
  /**
   * Component is disabled
  */
  disabled?: boolean,
  /**
   * Input field label
  */
  label?: string,
  /**
   * Input field name
  */
  name?: string,
  /**
   * Onchange from parent. Currently this handles onchange function passed from react-datepicker
  */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  /**
   * Onclick from parent. Currently this handles onclick function passed from react-datepicker
  */
  onClick?: () => void,
  /**
   * Onfocus from parent.
  */
  onFocus?: () => void,
  /**
   * Component must be filled
   */
  required?: boolean,
  /**
   * Callback to set Date value in parent
   */
  setDateValue?: (value: string) => void,
  /**
   * Callback to set Time value in parent
   */
  setTimeValue?: (value: string) => void,
  /**
   * Time format used by component
   */
  timeFormat?: string,
  /**
   * Input time value
  */
  timeValue?: string,
}

const DateTimeInput = forwardRef<HTMLInputElement, DateTimeInputProps>(({
  dateFormat = 'dd.MM.yyyy',
  dateOnly = false,
  dateValue = '',
  errorValue,
  disabled,
  label = dateOnly ? 'Date' : 'Date & Time',
  name,
  onChange,
  onClick,
  onFocus,
  required,
  setDateValue,
  setTimeValue,
  timeFormat = ' HH:mm',
  timeValue = '',
}:DateTimeInputProps, ref:React.Ref<HTMLInputElement>) => {

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const node = event.target as HTMLInputElement;

    if (allowedValueCheck(node.value)) {
      if (!dateOnly && node.value.length > dateFormat.length) {
        setDateValue?.(node.value.substring(0, dateFormat.length));
        setTimeValue?.(node.value.substring(dateFormat.length));

        if (node.value.length === (dateFormat.length + timeFormat.length)) {
          return onChange?.(event);
        }
      } else {
        setDateValue?.(node.value);
        setTimeValue?.('');

        return onChange?.(event);
      }
    }
    return null;
  };

  return (
    <div
      className={styles.dateTimeComponent}
    >
      <div className={styles.dateTimeFieldTitle}>{label}</div>
      <div className={clsx(styles.dateTimeInputArea, { [styles.dateTimeInputError]: errorValue })}>
        <div className={clsx(styles.iconInputContainer, styles.calendar)}>
          <IconButton type="neutral" icon="calendar" onClick={onClick} />
          <input
            autoComplete="off"
            className={clsx(styles.input, dateOnly ? styles.dateInput : styles.dateTimeInput)}
            disabled={disabled}
            name={name && `${name}`}
            placeholder={dateOnly ? dateFormat.toUpperCase() : `${dateFormat.toUpperCase()}${timeFormat.toUpperCase()}`}
            maxLength={dateOnly ? dateFormat.length : dateFormat.length + timeFormat.length}
            ref={ref}
            required={required}
            onFocus={onFocus}
            onChange={handleOnChange}
            onClick={onClick}
            value={`${dateValue}${!dateOnly ? timeValue : ''}`}
          />
        </div>
      </div>
      <div className={styles.dateTimeInputErrorMsg}>
        {errorValue && `${errorValue}`}
      </div>
    </div>
  );
});

DateTimeInput.displayName = 'Date Input';

export default DateTimeInput;
