import React, {
  useState,
} from 'react';
import ReactDatepicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../datePicker.css';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

export interface ReactDatePickerWrapperProps {
  shouldDisplayTimeColumn?: boolean,
}


const ReactDatePickerWrapper: React.FC<ReactDatePickerWrapperProps> = ({
  shouldDisplayTimeColumn = true,
}: ReactDatePickerWrapperProps) => {

  const nextIcon = <span className="pyreneIcon-chevronRight" />;
  const prevIcon = <span className="pyreneIcon-chevronLeft" />;

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );

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
        timeFormat="HH:mm aa"
        showPopperArrow={false}
        showTimeSelect={shouldDisplayTimeColumn}
        onChange={(date: Date) => setStartDate(date) }
        dateFormat={shouldDisplayTimeColumn ? 'dd.MM.yyyy HH:mm aa' : 'dd.MM.yyyy'}
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
        placeholderText="dd.MM.yyyy HH:mm aa"
      />
    </div>
  );
};

export default ReactDatePickerWrapper;
