import React, {
  useState,
  FunctionComponent,
  useEffect,
  forwardRef,
} from 'react';
import ReactDatepicker from 'react-datepicker';
import clsx from 'clsx';

import {isExists} from 'date-fns';
import isValid from 'date-fns/isValid';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import styles from './datePicker.css';
import 'react-datepicker/dist/react-datepicker.css';

export interface DatePickerProps {
  dateOnly?: boolean,
}

export const isValidDate = (date: string): boolean => {
  return date.length === 10;
};

const allowedSeparatorCheck = (valueToCheck: string) => (/[/.:]$/.test(valueToCheck));

export const getDateTypeFromddmmyyyyWithSep = (str: string): any | undefined => {
  if (str.length === 10 && allowedSeparatorCheck(str.charAt(2)) && allowedSeparatorCheck(str.charAt(5))) {
    const date = { day: +str.substr(0, 2), month: +str.substr(3, 2), year: +str.substr(6) };
    if (!Number.isNaN(date.day) && !Number.isNaN(date.month) && !Number.isNaN(date.year)) {
      return date;
    }
  }
  return undefined;
};

const ExampleCustomTimeInput: FunctionComponent<any> = forwardRef(({ value, onChange, onClick, setStartDate }, ref) => {

  const [internalValue, setInternalValue] = useState(value);
  const [hasError, setHasError] = useState(false);

  console.log('internal', internalValue);

  return (
    <div>
      <input
        ref={ref as any}
        onClick={onClick}
        value={internalValue}
        onChange={(e) => {
          const enterredDate = e.target.value;
          console.log('new value', enterredDate);
          setInternalValue(enterredDate);

          if(!isValidDate(enterredDate)){
            console.log('NOT valid', enterredDate );
            setHasError(true);
          }
          else{
            console.log('IS valid', enterredDate );
            const dateFormatted = getDateTypeFromddmmyyyyWithSep(enterredDate);
           // setStartDate(new Date( dateFormatted.year + '-' + dateFormatted.month + '-' + dateFormatted.day));
            onChange(e);
            setHasError(false);
          }
        }}
        style={{ border: "solid 10px pink !important" }}
      />
      {hasError && <div>issue in the formatting</div>}
    </div>
  )
});

const DatePicker: FunctionComponent<DatePickerProps> = ({
  dateOnly,
}: DatePickerProps) => {

  const nextIcon = <span className="pyreneIcon-chevronRight" />;
  const prevIcon = <span className="pyreneIcon-chevronLeft" />;

  const [startDate, setStartDate] = useState(new Date());
  
  console.log('external', startDate);
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
        onChange={(date: Date) => useState(date)}
        timeFormat='hh:mm'
        dateFormat={dateOnly ? 'dd.MM.yyyy' : 'dd.MM.yyyy hh:mm aa'}
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
        placeholderText="dd.MM.yyyy hh:mm"
        customInput={<ExampleCustomTimeInput setStartDate={setStartDate}/>}
      />
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
