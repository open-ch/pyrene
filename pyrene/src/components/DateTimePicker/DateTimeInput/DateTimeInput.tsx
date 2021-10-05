import React, { forwardRef } from 'react';
import clsx from 'clsx';

import { DateLength } from '../../../utils/DateUtils';

import Icon from '../../Icon/Icon';
import styles from './dateTimeInput.css';

const allowedValueCheck = (valueToCheck:string) : boolean => (/^[0-9.: APM]*$/.test(valueToCheck));

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
   * Function to call when valid value is entered
  */
  handleOn?: (dateString: string, timeString: string) => void
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

const DateTimeInput = forwardRef(({
  dateFormat = 'dd.MM.yyyy',
  dateOnly = false,
  dateValue = '',
  errorValue,
  handleOn,
  disabled,
  label = dateOnly ? 'Date' : 'Date & Time',
  name,
  onChange,
  onClick,
  onFocus,
  setDateValue,
  setTimeValue,
  timeFormat = ' HH:mm',
  timeValue = '',
}:DateTimeInputProps, ref:React.Ref<HTMLInputElement>) => {

  const handleDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const node = event.target as HTMLInputElement;

    if (allowedValueCheck(node.value)) {
      if (!dateOnly && node.value.length > DateLength.DATE_ONLY) {
        setDateValue?.(node.value.substring(0, DateLength.DATE_ONLY));
        setTimeValue?.(node.value.substring(DateLength.DATE_ONLY));

        if (node.value.substring(DateLength.DATE_ONLY).length === DateLength.TIME_VALUE) {
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
      onKeyUp={() => handleOn?.(dateValue, timeValue)}
    >
      <div className={styles.dateTimeFieldTitle}>{label}</div>
      <div className={clsx(styles.dateTimeInputArea, { [styles.dateTimeInputError]: errorValue })}>
        <div className={clsx(styles.iconInputContainer, styles.calendar)}>
          <Icon type="inline" name="calendar" color="neutral-500" />
          <input
            autoComplete="off"
            className={clsx(styles.input, dateOnly ? styles.dateInput : styles.dateTimeInput)}
            disabled={disabled}
            name={name && `${name}`}
            placeholder={dateOnly ? dateFormat.toUpperCase() : `${dateFormat.toUpperCase()}${timeFormat.toUpperCase()}`}
            maxLength={dateOnly ? DateLength.DATE_ONLY : DateLength.DATE_WITH_TIME}
            ref={ref}
            onClick={onClick}
            onFocus={onFocus}
            onChange={handleDateOnChange}
            value={`${dateValue}${timeValue}`}
          />
        </div>
      </div>
      <div className={styles.dateTimeInputErrorMsg}>
        {errorValue && errorValue}
      </div>
    </div>
  );
});

DateTimeInput.displayName = 'Date Input';

export default DateTimeInput;
