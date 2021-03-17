import React, {
  useCallback,
  useEffect, useState,
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

  // I guess these will be needed later for the selector ...
  // or am I wrong?
  const [internalDateObject, setInternalDateObject] = useState<DateType | undefined>(undefined);
  const [internalTimeObject, setInternalTimeObject] = useState<TimeType | undefined>(undefined);

  const [errorValue, setErrorValue] = useState('');

  const [invalidTimestamp, setInvalidTimestamp] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidTime, setInvalidTime] = useState(false);

  const [jsDateObject, setJsDateObject] = useState<Date | undefined>(undefined);

  const handleOn = (dateString:string, timeString:string, onFunction?: OnFunction) => {
    // I know we are doing this twice,
    // but it feels cleaner like this

    const isDateLongEnough = dateString.length === 10;
    const isTimeLongEnough = timeString.length === 5;

    if (isDateLongEnough && isTimeLongEnough) {
      const date = getDateTypeFromddmmyyyyWithSep(dateString);
      const time = getTimeTypeFromhhmmWithSep(timeString);

      setInternalDateObject(date);
      setInternalTimeObject(time);

      const validDateState = isValidDate(date);
      const validTimeState = isValidTime(time);
      setInvalidDate(!validDateState);
      setInvalidTime(!validTimeState);

      if (onFunction) {
        if (date && time && validDateState && validTimeState) {
          onFunction(convertToTimeStamp(date, time));
        } else {
          onFunction(null);
        }
      }
    } else {
      setInvalidDate(false);
      setInvalidTime(false);
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
    if (jsDateObject) {
      const date: DateType = convertToDateTypeObject(jsDateObject);
      const time: TimeType = convertToTimeTypeObject(jsDateObject);
      const dateString = standardEUDateFormat(date);
      const timeString = timeFormat(time);

      setInternalDateObject(date);
      setInternalTimeObject(time);

      setDateValue(dateString);
      setTimeValue(timeString);

      setInvalidDate(!isValidDate(date));
      setInvalidTime(!isValidTime(time));
    }
    if (invalidTimestamp) {
      // Reset value
      setDateValue('');
      setTimeValue('');
      setInvalidDate(false);
      setInvalidTime(false);
    }
  }, [jsDateObject, invalidTimestamp]);

  // handle timeStamp prop change
  useEffect(() => {
    if (timeStamp) {
      const dateObj = new Date(timeStamp);
      if (!Number.isNaN(dateObj.valueOf())) {
        setJsDateObject(dateObj);
        setInvalidTimestamp(false);
      } else {
        setJsDateObject(null);
        setInvalidTimestamp(true);
      }
    } else {
      // no time timeStamp
      setJsDateObject(null);
      setInvalidTimestamp(false);
    }
  }, [timeStamp]);

  useEffect(() => {
    if (timeStamp) {
      const dateObj = new Date(timeStamp);
      if (!Number.isNaN(dateObj.valueOf())) {
        setJsDateObject(dateObj);
        setInvalidTimestamp(false);
      } else {
        setJsDateObject(undefined);
        setInvalidTimestamp(true);
      }
    } else {
      // no time timeStamp
      setJsDateObject(undefined);
      setInvalidTimestamp(false);
    }
  }, [timeStamp]);

  // handle errors
  // not sure about this
  useEffect(() => {
    // This could be moved out
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
      if (minDateTime && maxDateTime && jsDateObject) {
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
  }, [invalidDate, invalidTime, invalidTimestamp, jsDateObject, maxDateTime, minDateTime]);

  return (
    <div
      styleName="dateTimeComponent"
      onBlur={() => handleOn(dateValue, timeValue, onBlur)}
    >
      <div styleName="dateTimeFieldTitle">Date &amp; Time</div>
      <div
        styleName={classNames(
          'dateTimeInputArea',
          { dateTimeInputError: errorValue.length > 0 },
        )}
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
