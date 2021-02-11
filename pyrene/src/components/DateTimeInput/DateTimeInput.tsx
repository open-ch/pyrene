import React, { RefObject, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import './dateTimeInput.css';

export interface DateTimeInputProps{
  name?: string,
  timeStamp?: number,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  name,
  onChange,
} : DateTimeInputProps) => {

  const [dValue, setDateValue] = useState('');
  const [tValue, setTimeValue] = useState('');

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
            onChange={onChange || defOnChange}
            value={dValue}
          />
        </div>
        <div styleName="iconInputContainer">
          <Icon type="inline" name="clock" color="neutral-500" />
          <input
            name={name ? `${name}-time` : ''}
            placeholder="HH:MM"
            styleName="timeInput"
            maxLength={5}
            onChange={onChange || defOnChange}
            value={tValue}
          />
        </div>

      </div>
    </div>
  );
};

DateTimeInput.displayName = 'DateTime Input';

export default DateTimeInput;
