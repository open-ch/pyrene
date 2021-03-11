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

export interface DateTimeInputProps{
  maxDateTime?: number,
  minDateTime?: number,
  name?: string,
  timeStamp?: number,
  onBlur?: (value: number | null) => void,
  onChange: (value: number | null) => void,
}

type DateValidationObj = {
  dateValidity: boolean,
  timeValidity: boolean,
  tStamp: number | null
};

const allowedSeparatorCheck = (valueToCheck: string): boolean => (/[/.:]$/.test(valueToCheck));
const allowedValueCheck = (valueToCheck:string) : boolean => (/^[0-9.:]*$/.test(valueToCheck));

const invalidTimeStampError = 'Invalid timestamp';
const invalidDateFormat = 'Invalid date format';
const invalidTimeFormat = 'Invalid time format';
const invalidDateandTimeFormat = 'Invalid date & time format';
const lessThanMinDateTime = 'Less than minimum date.';
const greaterThanMaxDateTime = 'Larger than maximum date.';


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

const getValidityErrorMsg = (dateIsValid: boolean, timeIsValid:boolean): string => {
  if (!dateIsValid && !timeIsValid) {
    return invalidDateandTimeFormat;
  }

  if (!dateIsValid) {
    return invalidDateFormat;
  }

  if (!timeIsValid) {
    return invalidTimeFormat;
  }
  return '';
};

const getRangeError = (minimumValue: number, maximumValue: number, timeToCheck: number): string => {
  if (!Number.isNaN(minimumValue) && timeToCheck < minimumValue) {
    return lessThanMinDateTime;
  }

  if (!Number.isNaN(maximumValue) && timeToCheck > maximumValue) {
    return greaterThanMaxDateTime;
  }
  return '';
};

const displayError = (errorMsg: string) => (<div styleName="dateTimeInputErrorMsg">{errorMsg}</div>);

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  maxDateTime,
  minDateTime,
  name,
  onBlur,
  onChange,
  timeStamp,
}: DateTimeInputProps) => {

  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [maxDateTimeValue, setMaxDateTimeValue] = useState(0);
  const [minDateTimeValue, setMinDateTimeValue] = useState(0);

  const clearInputStateValues = () => {
    setDateValue('');
    setTimeValue('');
  };

  const setErrors = (values: DateValidationObj | false) => {
    if (!values) {
      setErrorValue('');
    } else {
      setErrorValue(getValidityErrorMsg(values.dateValidity, values.timeValidity));
      if (values.dateValidity && values.timeValidity && values.tStamp) {
        setErrorValue(getRangeError(minDateTimeValue, maxDateTimeValue, values.tStamp));
      }
    }
  };

  const validateInputString = (dateStr:string, timeStr:string) => {
    if (dateStr.length === 10 && timeStr.length === 5) {
      const date = getDateTypeFromddmmyyyyWithSep(dateStr);
      const time = getTimeTypeFromhhmmWithSep(timeStr);

      const validDate = isValidDate(date);
      const validTime = isValidTime(time);

      return { dateValidity: validDate, timeValidity: validTime, tStamp: (date && time && validDate && validTime) ? convertToTimeStamp(date, time) : null };
    }
    return false;
  };

  const getComponentValue = (values: DateValidationObj | false) => {
    if (!values) {
      return null;
    }
    if (values.dateValidity && values.timeValidity && values.tStamp) {
      const errMsg = getRangeError(minDateTimeValue, maxDateTimeValue, values.tStamp);
      if (errMsg.length > 0) {
        return null;
      }
      return values.tStamp;
    }
    return null;
  };

  const handleOnBlur = () => {
    if (onBlur) {
      const validObj = validateInputString(dateValue, timeValue);
      setErrors(validObj);
      onBlur(getComponentValue(validObj));
    }
  };

  const handleOnChange = (dateStr:string, timeStr:string) => {
    if (onChange) {
      const validObj = validateInputString(dateStr, timeStr);
      setErrors(validObj);
      onChange(getComponentValue(validObj));
    }
  };

  const handleDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const node = event.target as HTMLInputElement;
    if (!allowedValueCheck(node.value)) {
      return;
    }

    setDateValue(node.value);
    handleOnChange(node.value, timeValue);
  };

  const handleTimeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const node = event.target as HTMLInputElement;
    if (!allowedValueCheck(node.value)) {
      return;
    }

    setTimeValue(node.value);
    handleOnChange(dateValue, node.value);
  };

  const setDefaultDateTimeLimits = useCallback(() => {
    let dateTimeMin = minDateTime;
    let dateTimeMax = maxDateTime;

    if (typeof dateTimeMin === 'number' && !Number.isNaN(dateTimeMin)) {
      setMinDateTimeValue(dateTimeMin);
    } else {
      dateTimeMin = NaN;
      setMinDateTimeValue(dateTimeMin);
    }

    if (typeof dateTimeMax === 'number' && !Number.isNaN(dateTimeMax)) {
      setMaxDateTimeValue(dateTimeMax);
    } else {
      dateTimeMax = getFutureDate({ years: 1 });
      setMaxDateTimeValue(dateTimeMax);
    }

    return { dateTimeMin, dateTimeMax };
  }, [maxDateTime, minDateTime]);

  const setDefaultDateTimeValues = useCallback((values: { dateTimeMin: number, dateTimeMax: number}) => {
    if (typeof timeStamp === 'number') {
      const dateObj = new Date(timeStamp);

      if (!Number.isNaN(dateObj.valueOf())) {
        const date: DateType = convertToDateTypeObject(dateObj);
        const time: TimeType = convertToTimeTypeObject(dateObj);
        setDateValue(standardEUDateFormat(date));
        setTimeValue(timeFormat(time));

        setErrorValue(getRangeError(values.dateTimeMin, values.dateTimeMax, dateObj.valueOf()));
      } else {
        setErrorValue(invalidTimeStampError);
      }
    } else {
      clearInputStateValues();
    }
  }, [timeStamp]);

  useEffect(() => {
    setDefaultDateTimeValues(setDefaultDateTimeLimits());
  }, [setDefaultDateTimeLimits, setDefaultDateTimeValues]);

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
      {errorValue.length > 0 ? displayError(errorValue) : ''}
    </div>
  );
};

DateTimeInput.displayName = 'DateTime Input';

export default DateTimeInput;
