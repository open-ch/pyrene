import React, {
  useState,
  FunctionComponent,
  useEffect,
} from 'react';
import ReactDatepicker from 'react-datepicker';
import clsx from 'clsx';

import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import styles from '../datePicker.css';
import 'react-datepicker/dist/react-datepicker.css';
export interface DatePickerProps {
  shouldDisplayTimeColumn?: boolean,
}

const DatePicker: FunctionComponent<DatePickerProps> = ({
  shouldDisplayTimeColumn = true,
}: DatePickerProps) => {

  const nextIcon = <span className="pyreneIcon-chevronRight" />;
  const prevIcon = <span className="pyreneIcon-chevronLeft" />;

  const [startDate, setStartDate] = useState(new Date());
  const [hasError, setHasError] = useState(false);

  useEffect(() =>{
    console.log('useEffect', startDate);
  }, [startDate]);

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
        showTimeSelect={shouldDisplayTimeColumn}
        onChange={(date: Date) => setStartDate(date)}
        dateFormat={shouldDisplayTimeColumn ? 'dd.MM.yyyy hh:mm aa' : 'dd.MM.yyyy'}
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
        placeholderText="dd.MM.yyyy hh:mm"
      />
      {hasError && <div>formatting issue</div>}
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
