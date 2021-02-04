import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import './dateTimeInput.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DateTimeInputProps{}

// eslint-disable-next-line no-empty-pattern
const DateTimeInput: React.FC<DateTimeInputProps> = ({ } : DateTimeInputProps) => (
  <div>
    <div styleName="dateTimeFieldTitle">Date &amp; Time</div>
    <div
      styleName="dateTimeInputArea"
    >
      <div styleName={classNames('centered')}>
        <Icon type="inline" name="calendar" color="neutral-500" />
        <input
          name=""
          placeholder="DD.MM.YYYY"
          styleName={classNames('dateInput')}
          maxLength={10}
        />
      </div>
      <div styleName={classNames('centered')}>
        <Icon type="inline" name="clock" color="neutral-500" />
        <input
          name=""
          placeholder="HH:MM"
          styleName={classNames('timeInput')}
          maxLength={5}
        />
      </div>

    </div>
  </div>
);

DateTimeInput.displayName = 'DateTimeInput';

export default DateTimeInput;
