import React from 'react';
import Icon from '../Icon/Icon';
import './dateTimeInput.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DateTimeInputProps{}

// eslint-disable-next-line no-empty-pattern
const DateTimeInput: React.FC<DateTimeInputProps> = () => (
  <div styleName="dateTimeComponent">
    <div styleName="dateTimeFieldTitle">Date &amp; Time</div>
    <div
      styleName="dateTimeInputArea"
    >
      <div styleName="iconInputContainer">
        <Icon type="inline" name="calendar" color="neutral-500" />
        <input
          name=""
          placeholder="DD.MM.YYYY"
          styleName="dateInput"
          maxLength={10}
        />
      </div>
      <div styleName="iconInputContainer">
        <Icon type="inline" name="clock" color="neutral-500" />
        <input
          name=""
          placeholder="HH:MM"
          styleName="timeInput"
          maxLength={5}
        />
      </div>

    </div>
  </div>
);

DateTimeInput.displayName = 'DateTime Input';

export default DateTimeInput;
