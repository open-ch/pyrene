import React, {
  useState,
  FunctionComponent,
  useEffect,
} from 'react';
import ReactDatepicker from 'react-datepicker';
import clsx from 'clsx';

import isValid from 'date-fns/isValid';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import styles from './datePicker.css';
import 'react-datepicker/dist/react-datepicker.css';


const ExampleCustomTimeInput: FunctionComponent<any> = ({ date, value, onChange }) => {
  
  useEffect(()=>{
    console.log('ExampleCustomTimeInput new Rendering');
  });

  return (
    <input
      value={value}
      onChange={(e) => {
        const value = e.target.value;
        console.log('new value', value);
        onChange(value);
      }}
      style={{ border: "solid 1px pink" }}
    />
  );
};

export interface DatePickerProps {
  dateOnly?: boolean,
}

const DatePicker: FunctionComponent<DatePickerProps> = ({
  dateOnly,
}: DatePickerProps) => {

  const nextIcon = <span className="pyreneIcon-chevronRight" />;
  const prevIcon = <span className="pyreneIcon-chevronLeft" />;

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={styles.wrapper}>
      <ReactDatepicker
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div>
            {/* eslint-disable-next-line react/button-has-type */}
            <button
              aria-label="Previous Month"
              className="react-datepicker__navigation react-datepicker__navigation--previous"
              onClick={decreaseMonth}
            >
              {prevIcon}
            </button>
            <span className="react-datepicker__current-month">
              {date.toLocaleString('en-US', {
                month: 'long',
              })}
                &nbsp;
              <span className="pyrene__current-year">
                {date.toLocaleString('en-US', {
                  year: 'numeric',
                })}
              </span>
            </span>
            {/* eslint-disable-next-line react/button-has-type */}
            <button
              aria-label="Next Month"
              className="react-datepicker__navigation react-datepicker__navigation--next"
              onClick={increaseMonth}
            >
              {nextIcon}
            </button>
          </div>
        )}
        calendarStartDay={1}
        selected={startDate}
        showPopperArrow={false}
        showTimeSelect={!dateOnly}
        onChange={(date: Date) => setStartDate(date)}
        timeFormat='hh:mm'
        dateFormat={dateOnly ? 'dd.MM.yyyy' : 'dd.MM.yyyy hh:mm aa'}
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
        placeholderText="dd.MM.yyyy hh:mm"
        customTimeInput={<ExampleCustomTimeInput />}
      />
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
