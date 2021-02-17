import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import './dateTimeInput.css';

export interface DateTimeInputProps{
  name?: string,
  timeStamp?: number,
  onChange?: (value: number | null) => void,
}

export type DateType = {
  day: number,
  month: number,
  year: number,
} | null;

export type TimeType = {
  minutes: number,
  hours: number,
} | null;

const allowedSeparatorCheck = (valueToCheck: string): boolean => (/[/.:]$/.test(valueToCheck));

export const getDateTypeFromddmmyyyyWithSep = (str: string): DateType => {
  if (allowedSeparatorCheck(str.charAt(2)) && allowedSeparatorCheck(str.charAt(5))) {
    return { day: +str.substr(0, 2), month: +str.substr(3, 2), year: +str.substr(6) };
  }
  return null;
};

export const getTimeTypeFromhhmmWithSep = (str: string): TimeType => {
  if (allowedSeparatorCheck(str.charAt(2))) {
    return { hours: +str.substr(0, 2), minutes: +str.substr(3) };
  }
  return null;
};

export const getTimeStamp = (date: DateType, time: TimeType): number | null => {
  if (!time || !date) {
    return null;
  }

  // Month shift : JS Date use 0 - 11 to count months
  const timeStamp = new Date(date.year, date.month - 1, date.day, time.hours, time.minutes);
  return timeStamp.valueOf() || null;
};

export const zeroLead = (str: string): string => (str.trim().length < 2 ? `0${str.trim()}` : str.trim());

export const standardEUDateformat = (dateStr: DateType): string => {
  if (dateStr) {
    const day = zeroLead(dateStr.day.toString());
    const month = zeroLead(dateStr.month.toString());
    const year = dateStr.year.toString();

    return `${day}.${month}.${year}`;
  }
  return '';
};

export const timeformat = (timeStr: TimeType): string => {
  if (timeStr) {
    const hours = zeroLead(timeStr.hours.toString());
    const minutes = zeroLead(timeStr.minutes.toString());

    return `${hours}:${minutes}`;
  }
  return '';
};

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  name,
  onChange,
  timeStamp,
}: DateTimeInputProps) => {

  let date: DateType;
  let time: TimeType;

  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  const dateChecker = () => {
    if (onChange) onChange(null);
  };

  const timeChecker = () => {
    let timestamp = null;
    if (dateValue.length === 10 && timeValue.length === 5) {
      date = getDateTypeFromddmmyyyyWithSep(dateValue);
      time = getTimeTypeFromhhmmWithSep(timeValue);

      timestamp = getTimeStamp(date, time);

      if (onChange && timestamp !== null && !Number.isNaN(timestamp)) {
        onChange(timestamp);
      } else if (onChange) onChange(null);
    } else if (onChange) onChange(timestamp);
  };

  const handleDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const node = event.target as HTMLInputElement;
    setDateValue(node.value);
  };

  const handleTimeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const node = event.target as HTMLInputElement;
    setTimeValue(node.value);
  };

  const setDateTimeFromTimeStamp = (timestamp: number) => {
    const dateObj = new Date(timestamp);

    if (!Number.isNaN(dateObj.valueOf())) {
      // Month shift : JS Date use 0 - 11 to count months
      const theDate: DateType = { day: dateObj.getDate(), month: dateObj.getMonth() + 1, year: dateObj.getFullYear() };

      const theTime: TimeType = { hours: dateObj.getHours(), minutes: dateObj.getMinutes() };
      setDateValue(standardEUDateformat(theDate));
      setTimeValue(timeformat(theTime));
    } else {
      setDateValue('');
      setTimeValue('');
    }
  };

  useEffect(() => {
    if (timeStamp) {
      setDateTimeFromTimeStamp(timeStamp);
    }
  }, [timeStamp]);

  return (
    <div styleName="dateTimeComponent" onBlur={timeChecker}>
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
            onKeyUp={dateChecker}
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
            onKeyUp={timeChecker}
          />
        </div>

      </div>
    </div>
  );
};

DateTimeInput.displayName = 'DateTime Input';

export default DateTimeInput;
