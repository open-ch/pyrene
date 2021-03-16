import React, {
  useCallback, useEffect, useState,
} from 'react';
import classNames from 'classnames';

import Icon from '../Icon/Icon';
import {
  DateType,
  TimeType,
  convertToTimeStamp,
  getFutureDate,
  isValidDate, isValidTime, convertToDateTypeObject, convertToTimeTypeObject,
} from '../../utils/DateUtils';


import './dateTimeInput.css';

type OnFunction = (value: number | null) => void;

export interface DateTimeInputProps{
  maxDateTime?: number,
  minDateTime?: number,
  name?: string,
  timeStamp?: number,
  onBlur?: OnFunction,
  onChange: OnFunction,
}

type DateValidationObj = {
  dateValidity: boolean,
  timeValidity: boolean,
  tStamp: number | null
};

const allowedSeparatorCheck = (valueToCheck: string): boolean => (/[/.:]$/.test(valueToCheck));
const allowedValueCheck = (valueToCheck:string) : boolean => (/^[0-9.:]*$/.test(valueToCheck));

export const getDateTypeFromddmmyyyyWithSep = (str: string): DateType | null => {
  if (str.length === 10 && allowedSeparatorCheck(str.charAt(2)) && allowedSeparatorCheck(str.charAt(5))) {
    const date = { day: +str.substr(0, 2), month: +str.substr(3, 2), year: +str.substr(6) };
    if (!Number.isNaN(date.day) && !Number.isNaN(date.month) && !Number.isNaN(date.year)) {
      return date;
    }
  }
  return null;
};

export const getTimeTypeFromhhmmWithSep = (str: string): TimeType | null => {
  if (str.length === 5 && allowedSeparatorCheck(str.charAt(2))) {
    const time = { hours: +str.substr(0, 2), minutes: +str.substr(3) };
    if (!Number.isNaN(time.hours) && !Number.isNaN(time.minutes)) {
      return time;
    }
  }
  return null;
};

export const zeroFill = (num: string, length: number): string => (num.toString().padStart(length, '0'));

export const standardEUDateFormat = (date: DateType): string => {
  const day = zeroFill(date.day.toString(), 2);
  const month = zeroFill(date.month.toString(), 2);
  const year = zeroFill(date.year.toString(), 4);

  return `${day}.${month}.${year}`;
};

export const timeFormat = (time: TimeType): string => {
  const hours = zeroFill(time.hours.toString(), 2);
  const minutes = zeroFill(time.minutes.toString(), 2);

  return `${hours}:${minutes}`;
};

// -1 smaller than Range
// 1 bigger than Range
// 0 within Range
const inRange = (timestampToCheck: number, minimumValue: number, maximumValue: number): number => {
  if (timestampToCheck < minimumValue) {
    return -1;
  }
  if (timestampToCheck > maximumValue) {
    return 1;
  }
  return 0;
};

const isValidDateValue = (dateValue: string) => {
  if (dateValue.length === 10) {
    const date = getDateTypeFromddmmyyyyWithSep(dateValue);
    return isValidDate(date);
  }
  return false;
};

const isValidTimeValue = (timeValue: string) => {
  if (timeValue.length === 5) {
    const time = getTimeTypeFromhhmmWithSep(timeValue);
    return isValidTime(time);
  }
  return false;
};

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  maxDateTime = getFutureDate({ years: 1 }),
  minDateTime = 0,
  name,
  onBlur,
  onChange,
  timeStamp,
}: DateTimeInputProps) => {

  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [errorValue, setErrorValue] = useState('');

  const [jsDateObject, setJsDateObject] = useState(timeStamp ? new Date(timeStamp) : null);

  const handleOn = (dateStr:string, timeStr:string, onFunction: OnFunction) => {
    if (onFunction) {
      if (
        isValidDateValue(dateStr)
        && isValidTimeValue(timeStr)
        && jsDateObject
        && inRange(jsDateObject.valueOf(), minDateTime, maxDateTime)
      ) {
        onFunction(jsDateObject.valueOf());
      } else {
        onFunction(null);
      }
    }
  };

  const handleOnBlur = () => {
    if (onBlur) {
      handleOn(dateValue, timeValue, onChange);
    }
  };

  const handleDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const node = event.target as HTMLInputElement;
    if (allowedValueCheck(node.value)) {
      setDateValue(node.value);
      handleOn(node.value, timeValue, onChange);
    }
  };

  const handleTimeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const node = event.target as HTMLInputElement;
    if (allowedValueCheck(node.value)) {
      setTimeValue(node.value);
      handleOn(dateValue, node.value, onChange);
    }
  };

  // set date and time value
  useEffect(() => {
    if (jsDateObject !== null) {
      const date: DateType = convertToDateTypeObject(jsDateObject);
      const time: TimeType = convertToTimeTypeObject(jsDateObject);
      setDateValue(standardEUDateFormat(date));
      setTimeValue(timeFormat(time));
    }
  }, [jsDateObject]);

  // handle timeStamp prop change
  useEffect(() => {
    if (timeStamp) {
      const dateObj = new Date(timeStamp);
      if (!Number.isNaN(dateObj.valueOf())) {
        setJsDateObject(dateObj);
      } else {
        setJsDateObject(null);

        // reset values
        // wrong timestamp == no input
        setDateValue('');
        setTimeValue('');
      }
    } else {
      // no time timeStamp
      setJsDateObject(null);
    }
  }, [timeStamp]);

  // set errors
  useEffect(() => {
    const getError = () => {
      if (!timeStamp) {
        return '';
      }
      if (!jsDateObject && timeStamp) {
        return 'Invalid timestamp';
      }

      // yeah .... need help here
      const goodNameForIsValidDateValue = isValidDateValue(dateStr);
      const goodNameForIsValidTimeValue = isValidTimeValue(dateStr);
      if (goodNameForIsValidDateValue && goodNameForIsValidTimeValue) {
        return 'Invalid date & time format';
      }
      if (goodNameForIsValidDateValue) {
        return 'Invalid date format';
      }
      if (goodNameForIsValidTimeValue) {
        return 'Invalid time format';
      }

      if (minDateTime && maxDateTime && jsDateObject !== null) {
        const rangePositon = inRange(jsDateObject.valueOf(), minDateTime, maxDateTime);
        if (rangePositon === -1) {
          return 'Less than minimum date.';
        }
        if (rangePositon === 1) {
          return 'Larger than maximum date.';
        }
      }
      return '';
    };

    setErrorValue(getError());
  }, [jsDateObject, minDateTime, maxDateTime, timeStamp]);

  return (
    <div styleName="dateTimeComponent" onBlur={handleOnBlur}>
      <div styleName="dateTimeFieldTitle">Date &amp; Time</div>
      <div
        styleName={errorValue.length > 0 ? classNames('dateTimeInputError', 'dateTimeInputArea') : 'dateTimeInputArea'}
      >
        <div styleName={classNames('iconInputContainer', 'calendar')}>
          <Icon type="inline" name="calendar" color="neutral-500" />
          <input
            name={name ? `${name}_date` : 'date_input'}
            placeholder="DD.MM.YYYY"
            styleName={classNames('input', 'dateInput')}
            maxLength={10}
            onChange={handleDateOnChange}
            value={dateValue}
          />
        </div>
        <div styleName={classNames('iconInputContainer', 'clock')}>
          <Icon type="inline" name="clock" color="neutral-500" />
          <input
            name={name ? `${name}_time` : 'time_input'}
            placeholder="HH:MM"
            styleName={classNames('input', 'timeInput')}
            maxLength={5}
            onChange={handleTimeOnChange}
            value={timeValue}
          />
        </div>
      </div>
      {errorValue.length > 0 && (
        <div styleName="dateTimeInputErrorMsg">{errorValue}</div>
      )}
    </div>
  );
};

DateTimeInput.displayName = 'DateTime Input';

export default DateTimeInput;
