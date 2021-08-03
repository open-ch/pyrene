import React, {
  useState,
  FunctionComponent,
  useEffect,
  forwardRef,
} from 'react';
import ReactDatepicker from 'react-datepicker';
import clsx from 'clsx';
import { parse, isValid } from 'date-fns';
import { CustomTimeInputProps } from '../DatePickerSingle/types';
import styles from './datePickerMultiple.css';
import 'react-datepicker/dist/react-datepicker.css';

const DATE_FORMAT = 'dd.MM.yyyy';
const DATETIME_FORMAT = 'dd.MM.yyyy hh:mm aa';

export interface DatePickerMultipleProps {
  dateOnly?: boolean,
}

const isValidDate = (dateString: string, formatting: string) => isValid(parse(dateString, formatting, new Date()));

const CustomTimeInput: FunctionComponent<CustomTimeInputProps> = forwardRef((props, ref) => {
  const { onChange, value, dateOnly, className, ...rest } = props;

  const [inputValue, setInputValue] = useState(value);
  const [hasError, setHasError] = useState(false);

  const dateFormatting = dateOnly ? DATE_FORMAT : DATETIME_FORMAT;

  // when the user select a date in the pop-up calendar, do update the date in the input
  useEffect( () => {
    setInputValue(value);
  }, [value]);

  // do the validation each time the input is updated
  useEffect( () => {
    if(inputValue && !isValidDate(inputValue, dateFormatting)){
      setHasError(true);
    }
    else{
      setHasError(false);
    }
  }, [inputValue]);

  return (
    <div>
      <input
        {...rest as any}
        ref={ref as any}
        value={inputValue}
        className={clsx(className, { [styles.dateInvalidInput]: hasError })}
        onChange={(e) => {
          const enterredDate = e.target.value;
          setInputValue(enterredDate);

          // if enterred date is a valid date, then refect that one in the pop-up calendar
          if(isValidDate(enterredDate, dateFormatting)){
            onChange?.(e);
          }
        }}
      />
      <div className={styles.dateInvalidWrapper}>
          <span>{hasError ? 'issue in the formatting' : ''}</span>
      </div>
    </div>
  )
});

const DatePickerMultiple: FunctionComponent<DatePickerMultipleProps> = ({
  dateOnly=false,
}: DatePickerMultipleProps) => {

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

DatePickerMultiple.displayName = 'DatePickerMultiple';

export default DatePickerMultiple;
