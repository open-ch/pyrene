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
  getFutureDate, standardEUDateFormat, standardEUTimeFormat,
  isValidDate, isValidTime, convertToDateTypeObject, convertToTimeTypeObject,
} from '../../utils/DateUtils';


import './dateTimeInput.css';

type OnFunction = (value?: number | null) => void;

export interface DateTimeInputProps{
  maxDateTime?: number,
  minDateTime?: number,
  name?: string,
  timeStamp?: number | null,
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
  timeStamp = 1809631860000,
}: DateTimeInputProps) => {

  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  const [errorValue, setErrorValue] = useState('');

  const [invalidTimestamp, setInvalidTimestamp] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidTime, setInvalidTime] = useState(false);

  const [jsDateObject, setJsDateObject] = useState<Date | undefined>(undefined);

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
          onFunction(convertToTimeStamp(date, time));
        } else {
          onFunction(null);
        }
      }
    } else {
      setInvalidDate(false);
      setInvalidTime(false);
      setJsDateObject(undefined);

      if (onFunction) {
        onFunction(null);
      }
    }
  }, []);

  const handleDateOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
        setJsDateObject(dateObj);
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
  }, [timeStamp]);

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
            disabled={invalidTimestamp}
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
            disabled={invalidTimestamp}
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
