import React, {
  useState,
  FunctionComponent,
} from 'react';
import ReactDatepicker from 'react-datepicker';
import CustomTimeInput from '../DatePicker/CustomTimeInput';
import styles from './datePickerSingle.css';
import 'react-datepicker/dist/react-datepicker.css';

const DATE_FORMAT = 'dd.MM.yyyy';
const DATETIME_FORMAT = 'dd.MM.yyyy hh:mm aa';

export interface DatePickerSingleProps {
  dateOnly?: boolean,
}

const DatePickerSingle: FunctionComponent<DatePickerSingleProps> = ({
  dateOnly=false,
}: DatePickerSingleProps) => {

  const nextIcon = <span className="pyreneIcon-chevronRight" />;
  const prevIcon = <span className="pyreneIcon-chevronLeft" />;

  const [startDate, setStartDate] = useState<null | Date>(null);
  
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
        timeFormat="hh:mm"
        dateFormat={dateOnly ? DATE_FORMAT : DATETIME_FORMAT}
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
        placeholderText={dateOnly ? DATE_FORMAT.toLowerCase() : DATETIME_FORMAT.toLowerCase()}
        customInput={<CustomTimeInput dateOnly={dateOnly}/>}
      />
    </div>
  );
};

DatePickerSingle.displayName = 'DatePickerSingle';

export default DatePickerSingle;
