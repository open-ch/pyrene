import React, {
  useState,
  FunctionComponent,
  useEffect,
  forwardRef,
} from 'react';
import ReactDatepicker, { ReactDatePickerProps } from 'react-datepicker';
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

const isValidDate = (date: string): boolean => {
  return date.length === 10;
};

type CustomTimeInputProps = { 
  placeholder?: string,
  ariaInvalid?: string,
  onClick?: (e: React.MouseEventHandler<HTMLInputElement>) => void,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
} & Pick<ReactDatePickerProps,
  'ariaDescribedBy' |
  'ariaLabelledBy' |
  'ariaRequired' |
  'autoComplete' |
  'autoFocus' |
  'className' |
  'disabled' |
  'id' |
  'name' |
  'onBlur' |
  'onFocus' |
  'onKeyDown' |
  'readOnly' |
  'required' |
  'tabIndex' |
  'title' |
  'value'
>;

const CustomTimeInput: FunctionComponent<CustomTimeInputProps> = forwardRef((props, ref) => {
  console.log('ExampleCustomTimeInput', props);
  const { onChange, value, ...rest } = props;

  const [inputValue, setInputValue] = useState(value);
  const [hasError, setHasError] = useState(false);

  // when the user select a date in the pop-up calendar, do update the date in the input
  useEffect( () => {
    setInputValue(value);
  }, [value]);

  // for the validation process
  useEffect( () => {
    if(inputValue && !isValidDate(inputValue) && value){
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
        onChange={(e) => {
          const enterredDate = e.target.value;
          setInputValue(enterredDate);
       
          // if enterred date is a valid date, then refect that one in the pop-up calendar
          if(isValidDate(enterredDate)){
            onChange?.(e);
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
        timeFormat='HH:mm'
        dateFormat={dateOnly ? 'dd.MM.yyyy' : 'dd.MM.yyyy HH:mm aa'}
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
        placeholderText={dateOnly ? "dd.mm.yyyy " : "dd.mm.yyyy hh:mm aa"}
        customInput={<CustomTimeInput />}
      />
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
