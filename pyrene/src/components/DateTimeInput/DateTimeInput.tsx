import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import './dateTimeInput.css';

export interface DateTimeInputProps{
  name?: string,
  timeStamp?: number,
  onBlur?: (value: number | null) => void,
  onChange: (value: number | null) => void,
}

export type DateType = {
  day: number,
  month: number,
  year: number,
};

export type TimeType = {
  minutes: number,
  hours: number,
};

const allowedSeparatorCheck = (valueToCheck: string): boolean => (/[/.:]$/.test(valueToCheck));

export const getDateTypeFromddmmyyyyWithSep = (str: string): DateType | null => {
  if (str.length === 10 && allowedSeparatorCheck(str.charAt(2)) && allowedSeparatorCheck(str.charAt(5))) {
    return { day: +str.substr(0, 2), month: +str.substr(3, 2), year: +str.substr(6) };
  }
  return null;
};

export const getTimeTypeFromhhmmWithSep = (str: string): TimeType | null => {
  if (str.length === 5 && allowedSeparatorCheck(str.charAt(2))) {
    return { hours: +str.substr(0, 2), minutes: +str.substr(3) };
  }
  return null;
};

export const getTimeStamp = (date: DateType, time: TimeType): number | null => {
  // Month shift : JS Date uses 0 - 11 to count months
  const tStamp = new Date(date.year, date.month - 1, date.day, time.hours, time.minutes);
  return tStamp.valueOf() || null;
};

export const zeroLead = (str: string): string => (str.trim().length < 2 ? `0${str.trim()}` : str.trim());

export const standardEUDateFormat = (dateStr: DateType): string => {
  const day = zeroLead(dateStr.day.toString());
  const month = zeroLead(dateStr.month.toString());
  const year = dateStr.year.toString();

  return `${day}.${month}.${year}`;
};

export const timeFormat = (timeStr: TimeType): string => {
  const hours = zeroLead(timeStr.hours.toString());
  const minutes = zeroLead(timeStr.minutes.toString());

  return `${hours}:${minutes}`;
};

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  name,
  onBlur,
  onChange,
  timeStamp,
}: DateTimeInputProps) => {

  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  const clearStateValues = () => {
    setDateValue('');
    setTimeValue('');
  };

  const processInputString = (dateStr:string, timeStr:string) => {
    let tStamp: number | null = null;
    if (dateStr.length === 10 && timeStr.length === 5) {
      const date = getDateTypeFromddmmyyyyWithSep(dateStr);
      const time = getTimeTypeFromhhmmWithSep(timeStr);

      tStamp = (date && time) ? getTimeStamp(date, time) : null;
    }

    return tStamp;
  };

  const handleOnBlur = () => {
    if (onBlur) {
      onBlur(processInputString(dateValue, timeValue));
    }
  };

  const handleOnChange = (dateStr:string, timeStr:string) => {
    if (onChange) {
      onChange(processInputString(dateStr, timeStr));
    }
  };

  const handleDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const node = event.target as HTMLInputElement;
    setDateValue(node.value);

    handleOnChange(node.value, timeValue);
  };

  const handleTimeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const node = event.target as HTMLInputElement;
    setTimeValue(node.value);

    handleOnChange(dateValue, node.value);
  };

  const setDateTimeFromTimeStamp = useCallback((tStamp: number) => {
    const dateObj = new Date(tStamp);

    if (!Number.isNaN(dateObj.valueOf())) {
      // Month shift : JS Date uses 0 - 11 to count months
      const date: DateType = { day: dateObj.getDate(), month: dateObj.getMonth() + 1, year: dateObj.getFullYear() };

      const time: TimeType = { hours: dateObj.getHours(), minutes: dateObj.getMinutes() };
      setDateValue(standardEUDateFormat(date));
      setTimeValue(timeFormat(time));
    } else {
      clearStateValues();
    }
  }, []);

  useEffect(() => {
    if (typeof timeStamp === 'number') {
      setDateTimeFromTimeStamp(timeStamp);
    } else {
      clearStateValues();
    }
  }, [timeStamp, setDateTimeFromTimeStamp]);

  return (
    <div styleName="dateTimeComponent" onBlur={handleOnBlur}>
      <div styleName="dateTimeFieldTitle">Date &amp; Time</div>
      <div
        styleName="dateTimeInputArea"
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
    </div>
  );
};

DateTimeInput.displayName = 'DateTime Input';

export default DateTimeInput;
