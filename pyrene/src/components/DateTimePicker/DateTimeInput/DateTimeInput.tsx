import React, { forwardRef } from 'react';
import clsx from 'clsx';
import IconButton from '../../IconButton/IconButton';
import { allowedValueCheck, Format, getFormat } from '../../../utils/DateUtils';

import styles from './DateTimeInput.module.css';

export interface DateTimeInputProps {
  /**
   * Boolean to toggle time display
   */
  dateOnly?: boolean;
  /**
   * Input date value
   */
  dateValue?: string;
  /**
   * DateTime format
   */
  dateTimeFormat: Format;
  /**
   * Component is disabled
   */
  disabled?: boolean;
  /**
   * Input error
   */
  errorValue?: string;
  /**
   * Input field label
   */
  label?: string;
  /**
   * Input field name
   */
  name?: string;
  /**
   * Onchange from parent. Currently this handles onchange function passed from react-datepicker
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Onclick from parent. Currently this handles onclick function passed from react-datepicker
   */
  onClick?: () => void;
  /**
   * Onfocus from parent.
   */
  onFocus?: () => void;
  /**
   * Component must be filled
   */
  required?: boolean;
  /**
   * Input separator value
   */
  separatorValue?: string;
  /**
   * Callback to set Date value in parent
   */
  setDateValue?: (value: string) => void;
  /**
   * Callback to set Separator value in parent
   */
  setSeparatorValue?: (value: string) => void;
  /**
   * Callback to set Time value in parent
   */
  setTimeValue?: (value: string) => void;
  /**
   * Input time value
   */
  timeValue?: string;
}

const DateTimeInput = forwardRef<HTMLInputElement, DateTimeInputProps>(
  (
    {
      dateOnly = false,
      dateTimeFormat = getFormat('eu'),
      dateValue = '',
      disabled,
      errorValue,
      label,
      name,
      onChange,
      onClick,
      onFocus,
      required,
      separatorValue = '',
      setDateValue,
      setSeparatorValue,
      setTimeValue,
      timeValue = '',
    }: DateTimeInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const dateLength = dateTimeFormat.dateFormat.length;
    const dateAndSeparatorLength = dateLength + dateTimeFormat.separatorFormat.length;
    const dateTimeLength = dateAndSeparatorLength + dateTimeFormat.timeFormat.length;

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const node = event.target as HTMLInputElement;

      if (allowedValueCheck(node.value)) {
        if (!dateOnly && node.value.length > dateAndSeparatorLength) {
          setDateValue?.(node.value.substring(0, dateLength));
          setSeparatorValue?.(node.value.substring(dateLength, dateAndSeparatorLength));
          setTimeValue?.(node.value.substring(dateAndSeparatorLength));
        } else if (!dateOnly && node.value.length > dateLength) {
          setDateValue?.(node.value.substring(0, dateLength));
          setSeparatorValue?.(node.value.substring(dateLength, dateAndSeparatorLength));
          setTimeValue?.('');
        } else {
          setDateValue?.(node.value);
          setTimeValue?.('');
          setSeparatorValue?.('');
        }

        return onChange?.(event);
      }
      return null;
    };

    return (
      <div className={styles.dateTimeComponent}>
        {label && <div className={styles.dateTimeFieldTitle}>{label}</div>}
        <div
          className={clsx(styles.dateTimeInputArea, { [styles.dateTimeInputError]: errorValue })}
        >
          <div className={clsx(styles.iconInputContainer, styles.calendar)}>
            <IconButton icon="calendar" disabled={disabled} onClick={onClick} type="neutral" />
            <input
              autoComplete="off"
              className={clsx(styles.input, dateOnly ? styles.dateInput : styles.dateTimeInput)}
              disabled={disabled}
              maxLength={dateOnly ? dateLength : dateTimeLength}
              name={name && `${name}`}
              onChange={handleOnChange}
              onClick={onClick}
              onFocus={onFocus}
              placeholder={
                dateOnly
                  ? dateTimeFormat.dateFormat.toUpperCase()
                  : `${dateTimeFormat.dateFormat.toUpperCase()}${dateTimeFormat.separatorFormat.toUpperCase()}${dateTimeFormat.timeFormat.toUpperCase()}`
              }
              ref={ref}
              required={required}
              value={`${dateValue}${!dateOnly ? separatorValue : ''}${!dateOnly ? timeValue : ''}`}
            />
          </div>
        </div>
        {errorValue && <div className={styles.dateTimeInputErrorMsg}>{`${errorValue}`}</div>}
      </div>
    );
  }
);

DateTimeInput.displayName = 'DateInput';

export default DateTimeInput;
