import React, {
  forwardRef,
  Ref,
} from 'react';
import clsx from 'clsx';

import Icon from '../../Icon/Icon';
import styles from './dateTimeInput.css';

export interface InputProps {
  autoFocus?: boolean,
  dateOnly?: boolean,
  dateValue: string,
  errorValue: string,
  handleOn?: (dateString: string, timeString: string, func: (event: any) => void) => void
  invalidTimestamp?: boolean,
  label?: string,
  name?: string,
  timeValue: string,
  value?: string,
  onBlur?: any,
}

const allowedValueCheck = (valueToCheck: string) => /^[0-9.:]*$/.test(valueToCheck);

const DateTimeInput = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  const {
    dateOnly = false,
    dateValue,
    errorValue,
    handleOn,
    invalidTimestamp = false,
    label,
    name = '',
    timeValue,
    onBlur,
  } = props;

  return (
    <div
      className={styles.dateTimeComponent}
      onBlur={() => handleOn?.(dateValue, dateOnly ? '00:00' : timeValue, onBlur)}
    >
      <div className={styles.dateTimeFieldTitle}>{label || dateOnly ? 'Date' : 'Date & Time'}</div>
      <div className={clsx(styles.dateTimeInputArea, { [styles.dateTimeInputError]: errorValue.length > 0 })}>
        <div className={clsx(styles.iconInputContainer, styles.calendar)}>
          <Icon type="inline" name="calendar" color="neutral-500" />
          <input
            {...props}
            name={name ? `${name}_date` : 'date_input'}
            placeholder={dateOnly ? 'DD.MM.YYYY' : 'DD.MM.YYYY HH:MM'}
            className={clsx(styles.input, styles.dateInput)}
            maxLength={dateOnly ? 10 : 16}
            disabled={invalidTimestamp}
            ref={ref}
            autoComplete="off"
          />
        </div>
        {/* !dateOnly && (
          <div className={clsx(styles.iconInputContainer, styles.clock)}>
            <Icon type="inline" name="clock" color="neutral-500" />
            <input
              autoComplete="off"
              name={name ? `${name}_time` : 'time_input'}
              placeholder="HH:MM"
              className={clsx(styles.input, styles.timeInput)}
              maxLength={5}
              disabled={invalidTimestamp}
              onChange={handleTimeOnChange}
              onClick={onClick}
              value={timeValue}
            />
          </div>
        ) */}
      </div>
      {errorValue.length > 0 && <div className={styles.dateTimeInputErrorMsg}>{errorValue}</div>}
    </div>
  );
});

DateTimeInput.displayName = 'Date Input';

export default DateTimeInput;
