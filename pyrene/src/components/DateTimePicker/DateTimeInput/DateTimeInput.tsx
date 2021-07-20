import React, { forwardRef, useState } from 'react';
import clsx from 'clsx';

import Icon from '../../Icon/Icon';
import styles from './dateTimeInput.css';

export interface InputProps {
  autoFocus?: boolean,
  dateOnly?: boolean,
  dateValue?: string,
  errorValue: string,
  handleOn?: (dateString: string, timeString: string, func: (event: any) => void) => void
  invalidTimestamp?: boolean,
  Key?: string
  label?: string,
  name?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void, // Handle change function passed from react-datepicker
  onClick?: () => void,
  onBlur?: () => void,
  onFocus?: () => void,
  range?: boolean,
  setDateValue?: (value: string) => void,
  setTimeValue?: (value: string) => void,
  timeValue?: string,
  value?: string
}

export interface InputProped {
  label: string,
  dateValue: string,
  timeValue: string,
}

const allowedValueCheck = (valueToCheck:string) : boolean => (/^[0-9.: APM]*$/.test(valueToCheck));

const DateTimeInput = forwardRef(({
  dateValue = '',
  dateOnly = false,
  errorValue,
  handleOn,
  invalidTimestamp = false,
  Key = '',
  label,
  name = '',
  onBlur = () => {},
  onChange = () => {},
  onClick = () => {},
  range = false,
  setDateValue = () => {},
  setTimeValue = () => {},
  timeValue = '',
}:InputProps, ref:React.Ref<HTMLInputElement>) => {

  const [internalDateValue, setInternalDateValue] = useState(dateValue);
  const [internalTimeValue, setInternalTimeValue] = useState(timeValue);

  const handleDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const node = event && event.target as HTMLInputElement;

    console.log(node.value.trim());
    if (allowedValueCheck(node.value.trim())) {
      console.log('entered');
      if (node.value.trim().length > 10) {
        console.log('big');

        const date = node.value.substring(0, 10).trim();
        const time = node.value.substring(10).trim();

        setDateValue(date);
        setInternalDateValue(date);
        setTimeValue(time);
        setInternalTimeValue(time);

        if (node.value.substring(10).trim().length >= 5) {
          return onChange(event);
        }
      } else {
        console.log('small');

        const date = node.value.trim();
        setDateValue(date);
        setInternalDateValue(date);
        setTimeValue('');
        setInternalTimeValue('');
        return onChange(event);
      }
    }
    return {};
  };

  const formattedTime = (tvalue: string) => {
    if (!dateOnly) {
      if (tvalue && tvalue !== '' && tvalue.length === 5) {
        if (tvalue.localeCompare('12:00') < 0) {
          return ' AM';
        }
        return ' PM';
      }
    }
    return '';
  };

  return (
    <div
      className={styles.dateTimeComponent}
      onBlur={() => handleOn?.(internalDateValue, dateOnly ? '00:00' : internalTimeValue, onBlur)}
    >
      <div className={styles.dateTimeFieldTitle}>{label || (dateOnly ? 'Date' : 'Date & Time')}</div>
      <div className={clsx(styles.dateTimeInputArea, { [styles.dateTimeInputError]: errorValue.length > 0 })}>
        <div className={clsx(styles.iconInputContainer, styles.calendar)} key={Key}>
          <Icon type="inline" name="calendar" color="neutral-500" />
          <input
            autoComplete="off"
            className={clsx(styles.input, dateOnly ? styles.dateInput : styles.dateTimeInput)}
            disabled={invalidTimestamp}
            name={name ? `${name}_date` : 'date_input'}
            placeholder={dateOnly ? 'DD.MM.YYYY' : 'DD.MM.YYYY HH:MM'}
            maxLength={dateOnly ? 10 : 19}
            ref={ref}
            onClick={onClick}
            onChange={handleDateOnChange}
            value={`${internalDateValue}${internalTimeValue && ` ${internalTimeValue}`}${formattedTime('')}`}
          />
        </div>
      </div>
      {errorValue.length > 0 && <div className={styles.dateTimeInputErrorMsg}>{errorValue}</div>}
    </div>
  );
});

DateTimeInput.displayName = 'Date Input';

export default DateTimeInput;
