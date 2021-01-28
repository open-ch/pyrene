import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import './dateTime.css';

export interface DateTimeProps{};

const DateTime: React.FC<DateTimeProps> = ({} : DateTimeProps) => {

  const rand = Math.floor(Math.random() * 1e10);

  return(
    <div>
      <div styleName='dateFieldTitle'>Date &amp; Time</div>
      <div
        styleName='dateInputArea'
      >
        <div style={{display: 'inline-flex'}}>
          <div styleName={classNames('icon', 'passive', 'centered')}>
            <Icon type="inline" name="search" />
          </div>
          <input
            id={`date_${rand}`}
            value=''
            placeholder='DD.MM.YYYY'
            styleName={classNames('date')}
          />         
        </div>
        <div style={{display: 'inline-flex'}}>
          <div styleName={classNames('icon', 'passive', 'centered')}>
            <Icon type="inline" name="clock" />
          </div>
          <input
            id={`time_${rand}`}
            value=''
            placeholder='HH:MM'
            styleName={classNames('time')}
          />        
        </div>

      </div>
    </div>
  );
};

DateTime.displayName = 'DateTime';

export default DateTime;