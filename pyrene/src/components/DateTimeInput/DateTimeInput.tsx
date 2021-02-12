import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import './dateTimeInput.css';

export interface DateTimeInputProps{
  name?: string,
  timeStamp?: number,
  onChange?: (value: number | null) => void,
}

type DateType = {
  day: number,
  month: number,
  year: number,
} | undefined;

type TimeType = {
  minutes: number,
  hours: number,
} | undefined;

export const getTimeStamp = (date:DateType, time:TimeType): number | null => {
  if (time === undefined || date === undefined) {
    return null;
  }

  const timeStamp = new Date(date.year, date.month, date.day, time.hours, time.minutes);
  return timeStamp.valueOf();
};

export const getDate = (date:DateType): number | null => {
  if (date === undefined) {
    return null;
  }
  return new Date(date.year, date.month, date.day).valueOf();
};

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  name,
  onChange,
} : DateTimeInputProps) => {

  let date: DateType;
  let time: TimeType;

  const [dValue, setDateValue] = useState('');
  const [tValue, setTimeValue] = useState('');

  const allowedSeparatorCheck = (valueToCheck:string) : boolean => (/[/.:]$/.test(valueToCheck));

  const ddmmyyyyWithSep = (str:string): DateType => {
    if (allowedSeparatorCheck(str.charAt(2)) && allowedSeparatorCheck(str.charAt(5))) {
      return { day: +dValue.substr(0, 2), month: +dValue.substr(3, 2), year: +dValue.substr(6) };
    }
    return undefined;
  };

  const hhmmWithSep = (str:string): TimeType => {
    if (allowedSeparatorCheck(str.charAt(2))) {
      return { hours: +tValue.substr(0, 2), minutes: +tValue.substr(3) };
    }
    return undefined;
  };

  const dateChecker = () => {
    let timestamp = null;
    if (dValue.length === 10) {
      timestamp = getDate(ddmmyyyyWithSep(dValue));
    }
    console.log('Date', timestamp);
  };

  const timeChecker = () => {
    let timestamp = null;
    if (dValue.length === 10 && tValue.length === 5) {
      date = ddmmyyyyWithSep(dValue);
      time = hhmmWithSep(tValue);

      timestamp = getTimeStamp(date, time);


      if (onChange) {
        onChange(timestamp);
        console.log('Parent Called with, ', timestamp);
      }
    }

    console.log('Time', timestamp);
  };

  const defOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const node = event.target as HTMLInputElement;

    if (node.className.includes('dateInput')) {
      setDateValue(node.value);
    } else if (node.className.includes('timeInput')) {
      setTimeValue(node.value);
    }
  };

  return (
    <div styleName="dateTimeComponent">
      <div styleName="dateTimeFieldTitle">Date &amp; Time</div>
      <div
        styleName="dateTimeInputArea"
      >
        <div styleName="iconInputContainer">
          <Icon type="inline" name="calendar" color="neutral-500" />
          <input
            name={name ? `${name}-date` : ''}
            placeholder="DD.MM.YYYY"
            styleName="dateInput"
            maxLength={10}
            onChange={defOnChange}
            value={dValue}
            onKeyUp={dateChecker}
          />
        </div>
        <div styleName="iconInputContainer">
          <Icon type="inline" name="clock" color="neutral-500" />
          <input
            name={name ? `${name}-time` : ''}
            placeholder="HH:MM"
            styleName="timeInput"
            maxLength={5}
            onChange={defOnChange}
            value={tValue}
            onKeyUp={timeChecker}
          />
        </div>

      </div>
    </div>
  );
};

DateTimeInput.displayName = 'DateTime Input';

export default DateTimeInput;
