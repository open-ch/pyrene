import React, {
  forwardRef,
  useCallback,
  useEffect, useImperativeHandle, useRef, useState,
} from 'react';
import clsx from 'clsx';

import ReactDPWrapper from './ReactDatePickerWrapper/ReactDatePickerWrapper';
import Icon from '../Icon/Icon';
import {
  DateType,
  TimeType,
  getFutureDate, standardEUDateFormat, standardEUTimeFormat,
  isValidDate, isValidTime, isValidTimeZone, convertToDateTypeObject, convertToTimeTypeObject,
  convertToUTCtime, convertToZoneTime, convertDateTypeToString, convertTimeTypeToString, dateTypeToStandardEUDateFormat,
} from '../../utils/DateUtils';


import styles from './dateTimeInput.css';

type OnFunction = (value?: number | null) => void;

export interface DateTimeInputProps{
  /**
   * This is a timestamp that represents the maximum date allowed by the component
   */
  maxDateTime?: number,
  /**
   * This is a timestamp that represents the minimum date allowed by the component
   */
  minDateTime?: number,
  /**
   * Name that can be used to uniquely identify the component
   */
  name?: string,
  /**
   * This is a unix timestamp, which is the number of seconds that have elapsed since Unix epoch
   */
  timeStamp?: number | null,
  /**
   * This is must be a IANA time zone string
   */
  timeZone?: string,
  /**
   * Function to handle onBlur event
   */
  onBlur?: OnFunction,
  /**
   * Function to handle onChange event
   */
  onChange: OnFunction,
}

const allowedSeparatorCheck = (valueToCheck: string): boolean => (/[/.:]$/.test(valueToCheck));
const allowedValueCheck = (valueToCheck:string) : boolean => (/^[0-9.:]*$/.test(valueToCheck));

export const getDateTypeFromddmmyyyyWithSep = (str: string): DateType | undefined => {
  if (str.length === 10 && allowedSeparatorCheck(str.charAt(2)) && allowedSeparatorCheck(str.charAt(5))) {
    const date = { day: +str.substr(0, 2), month: +str.substr(3, 2), year: +str.substr(6) };
    if (!Number.isNaN(date.day) && !Number.isNaN(date.month) && !Number.isNaN(date.year)) {
      return date;
    }
  }
  return undefined;
};

export const getTimeTypeFromhhmmWithSep = (str: string): TimeType | undefined => {
  if (str.length === 5 && allowedSeparatorCheck(str.charAt(2))) {
    const time = { hours: +str.substr(0, 2), minutes: +str.substr(3) };
    if (!Number.isNaN(time.hours) && !Number.isNaN(time.minutes)) {
      return time;
    }
  }
  return undefined;
};

const inRange = (timestampToCheck: number, minimumValue: number, maximumValue: number): number => {
  if (timestampToCheck < minimumValue) {
    return -1;
  }
  if (timestampToCheck > maximumValue) {
    return 1;
  }
  return 0;
};

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  maxDateTime = getFutureDate({ years: 1 }),
  minDateTime = 0,
  name,
  onBlur,
  onChange,
  timeStamp,
  timeZone = 'Europe/Zurich',
}: DateTimeInputProps) => {

  const [internalDate, setInternalDate] = useState<Date | undefined>(undefined);

  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  const [timeZoneValue, setTimeZoneValue] = useState(timeZone);

  const [jsDateObject, setJsDateObject] = useState<Date | undefined>(undefined);

  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidTime, setInvalidTime] = useState(false);
  const [invalidTimestamp, setInvalidTimestamp] = useState(false);
  const [invalidTimeZone, setInvalidTimeZone] = useState(false);

  const [errorValue, setErrorValue] = useState('');

  const handleOn = useCallback((dateString:string, timeString:string, onFunction?: OnFunction) => {
    const isDateLongEnough = dateString.length === 10;
    const isTimeLongEnough = timeString.length === 5;

    if (isDateLongEnough && isTimeLongEnough) {
      const date = getDateTypeFromddmmyyyyWithSep(dateString);
      const time = getTimeTypeFromhhmmWithSep(timeString);

      const validDateState = isValidDate(date);
      const validTimeState = isValidTime(time);
      setInvalidDate(!validDateState);
      setInvalidTime(!validTimeState);

      if (onFunction) {
        if (date && time && validDateState && validTimeState) {
          onFunction(convertToUTCtime(`${convertDateTypeToString(date)} ${convertTimeTypeToString(time)}`, timeZoneValue).valueOf());
        } else {
          onFunction(null);
        }
      }
    } else {
      setInvalidDate(false);
      setInvalidTime(false);
      setJsDateObject(undefined);

      // setInternalDate(undefined);

      if (onFunction) {
        onFunction(null);
      }
    }
  }, [timeZoneValue]);




  // Old onchange function. It may be kept in case we allow for optional dropdown calendar
  const handleDateOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('help');
    const node = event.target as HTMLInputElement;
    if (allowedValueCheck(node.value)) {
      setDateValue(node.value);
      handleOn(node.value, timeValue, onChange);
    }
  }, [handleOn, onChange, timeValue]);

  const handleTimeOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const node = event.target as HTMLInputElement;
    if (allowedValueCheck(node.value)) {
      setTimeValue(node.value);
      handleOn(dateValue, node.value, onChange);
    }
  }, [dateValue, handleOn, onChange]);


  // This is needed for restricting the allowed input in the react-datepicker
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // If event key is not allowed and is not a special key
    if (!allowedValueCheck(event.key) && event.key.length === 1) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const onChanger = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined): void => {
    if (date && (event?.type === 'click' || (event?.type === 'keydown' && (event as React.KeyboardEvent).key.length > 1))) {
      if (!Array.isArray(date)) {
        setDateValue(standardEUDateFormat(date));
        setInternalDate(date);

        handleOn(standardEUDateFormat(date), timeValue, onChange);
      }
    } else if (event?.type === 'change') {
      const node = event?.target as HTMLInputElement;
      const isDateLongEnough = node?.value.length === 10;

      if (isDateLongEnough) {
        const newdate = getDateTypeFromddmmyyyyWithSep(node?.value || '');

        if (newdate) {
          setDateValue(dateTypeToStandardEUDateFormat(newdate));
          setInternalDate(convertToUTCtime(convertDateTypeToString(newdate), timeZoneValue));

          handleOn(dateTypeToStandardEUDateFormat(newdate), timeValue, onChange);
        }
      }
    } else if (event === undefined && !Array.isArray(date) && date !== null) { // This is relying on the time click event being 'undefined' temporary fix for access to time value
      setTimeValue(standardEUTimeFormat(date));
      handleOn(standardEUDateFormat(date), standardEUTimeFormat(date), onChange);
    } else {
      setInvalidDate(false);
      setInvalidTime(false);
      setJsDateObject(undefined);
      setInternalDate(undefined);
    }
  };

  useEffect(() => {
    if (jsDateObject) {
      const date: DateType = convertToDateTypeObject(jsDateObject);
      const time: TimeType = convertToTimeTypeObject(jsDateObject);
      const dateString = standardEUDateFormat(jsDateObject);
      const timeString = standardEUTimeFormat(jsDateObject);

      setDateValue(dateString);
      setTimeValue(timeString);

      setInvalidDate(!isValidDate(date));
      setInvalidTime(!isValidTime(time));
    }

    if (invalidTimestamp) {
      setDateValue('');
      setTimeValue('');
      setInvalidDate(false);
      setInvalidTime(false);
    }
  }, [jsDateObject, invalidTimestamp]);

  useEffect(() => {
    if (typeof timeStamp === 'number') {
      const dateObj = new Date(timeStamp);
      if (!Number.isNaN(dateObj.valueOf())) {
        setJsDateObject(convertToZoneTime(timeStamp, timeZoneValue));
        setInvalidTimestamp(false);
      } else {
        setJsDateObject(undefined);
        setInvalidTimestamp(true);
      }
    } else if (typeof timeStamp === 'undefined') {
      setJsDateObject(undefined);
      setInvalidTimestamp(false);

      setDateValue('');
      setTimeValue('');
      setInvalidDate(false);
      setInvalidTime(false);
    }
  }, [timeStamp, timeZoneValue]);

  useEffect(() => {
    if (isValidTimeZone(timeZone)) {
      setTimeZoneValue(timeZone);
      setInvalidTimeZone(false);
    } else {
      setInvalidTimeZone(true);
    }
  }, [timeZone]);

  useEffect(() => {
    const getError = () => {
      if (invalidTimestamp) {
        return 'Invalid timestamp';
      }
      if (invalidDate && invalidTime) {
        return 'Invalid date & time format';
      }
      if (invalidDate) {
        return 'Invalid date format';
      }
      if (invalidTime) {
        return 'Invalid time format';
      }
      if (maxDateTime && jsDateObject) {
        const rangePositon = inRange(jsDateObject.valueOf(), minDateTime, maxDateTime);
        if (rangePositon === -1) {
          return 'Less than minimum date.';
        }
        if (rangePositon === 1) {
          return 'Larger than maximum date.';
        }
      }

      if (invalidTimeZone) {
        const tz = 'Europe/Zurich';
        setTimeZoneValue(tz);
        return `Invalid time zone. ${tz} is being used.`;
      }
      return '';
    };

    setErrorValue(getError());
  }, [invalidDate, invalidTime, invalidTimestamp, invalidTimeZone, jsDateObject, maxDateTime, minDateTime]);

  interface InputProps {
    autoFocus?: boolean,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onClick?: () => void,
    onBlur?: () => void,
    onFocus?: () => void,
    value?: string
  }

  const DateInput = forwardRef((props:InputProps, ref:React.Ref<HTMLInputElement>) => (
    <>
      <div className={clsx(styles.iconInputContainer, styles.calendar)}>
        <Icon type="inline" name="calendar" color="neutral-500" />
        <input
          {...props}
          name={name ? `${name}_date` : 'date_input'}
          placeholder="DD.MM.YYYY"
          className={clsx(styles.input, styles.dateInput)}
          maxLength={10}
          disabled={invalidTimestamp}
          ref={ref}
          autoComplete="off"
        />
      </div>
    </>
  ));

  DateInput.displayName = 'Date Input';

  return (
    <div
      className={styles.dateTimeComponent}
      onBlur={() => handleOn(dateValue, timeValue, onBlur)}
    >
      <div className="dateTimeFieldTitle">Date &amp; Time</div>
      <div className={clsx(styles.dateTimeInputArea, { [styles.dateTimeInputError]: errorValue.length > 0 })}>
        <ReactDPWrapper onChange={onChanger} selectedDate={timeStamp ? jsDateObject : internalDate} CustomInput={<DateInput />} onKeyDown={handleKeyDown} /* shouldDisplayTimeColumn={false} */ />
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
            value={timeValue}
          />
        </div>
      </div>
      {errorValue.length > 0 && (
        <div className={styles.dateTimeInputErrorMsg}>{errorValue}</div>
      )}
    </div>
  );
};

DateTimeInput.displayName = 'DateTime Input';

export default DateTimeInput;
