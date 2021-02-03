import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import './dateTime.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DateTimeProps{}

// eslint-disable-next-line no-empty-pattern
const DateTime: React.FC<DateTimeProps> = ({ } : DateTimeProps) => (
  <div>
    <div styleName="dateFieldTitle">Date &amp; Time</div>
    <div
      styleName="dateInputArea"
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

DateTime.displayName = 'DateTime';

export default DateTime;
