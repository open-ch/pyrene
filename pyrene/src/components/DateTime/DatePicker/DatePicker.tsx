import React, {
  ReactElement,
  useCallback,
  useEffect, useState,
} from 'react';
import clsx from 'clsx';
import ReactDatepicker, { 
  CalendarContainer, 
  registerLocale, 
  setDefaultLocale, 
  getDefaultLocale,
} from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';

import FwDateTimeInput, {
  DateTimeInputProps,
} from '../DateTimeInput/DateTimeInputForward';

import {
  DateType,
  TimeType,
  getFutureDate, standardEUDateFormat, standardEUTimeFormat,
  isValidDate, isValidTime, isValidTimeZone, convertToDateTypeObject, convertToTimeTypeObject,
  convertToUTCtime, convertToZoneTime, convertDateTypeToString, convertTimeTypeToString, getPastDate,
} from '../../../utils/DateUtils';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './datePicker.css';


registerLocale("en-GB2", { ...enGB, options: { ...enGB.options, weekStartsOn: 3 } });
setDefaultLocale("en-GB2");

export type OnFunction = (value?: Date | Date[] | null) => void;

export interface DatePickerProps{
  endDate?: Date,  
  /**
   * This is a timestamp that represents the maximum date allowed by the component
   */
  maxDate?: DateType,
  /**
   * This is a timestamp that represents the minimum date allowed by the component
   */
  minDate?: DateType,
  /**
   * Name that can be used to uniquely identify the component
   */
  name?: string,
  startDate?: Date,
  /**
   * This is a unix timestamp, which is the number of seconds that have elapsed since Unix epoch
   */
  timeStamp?: number | null,
  /**
   * This is must be a IANA time zone string
   */
  timeZone?: string,
  /**
   * Function to handle onBlur event
   */
  onBlur?: OnFunction,
  /**
   * Function to handle onChange event
   */
  onChange: OnFunction,
  value?: Date | Date[] | null,
}

// reactDatepicker.registerLocale("en-US2", { ...enUS, options: { weekStartsOn: 3 } });


const DatePicker: React.FC<DatePickerProps> = ({
  endDate,
  maxDate = convertToDateTypeObject(new Date(getFutureDate({ years: 1 }))),
  minDate = convertToDateTypeObject(new Date(getPastDate({ years: 1 }))),
  name,
  onBlur,
  onChange,
  startDate = new Date(),
  timeStamp,
  timeZone = 'Europe/Zurich',
}: DatePickerProps) => {

  interface calendarContainerProps {
    className?: string;
    children?: React.ReactNode;
    showPopperArrow?: boolean;
    arrowProps?: { [propName: string]: any };
  }

  const [internalDate, setInternalDate] = useState<Date>();
  const [sDate, setStartDate] = useState(startDate);

  useEffect(() => {
    const jihad = document.getElementsByClassName("react-datepicker__current-month");
    if (Array.isArray(jihad)) {
      const text = jihad[0].innerHTML;
      var year = text.match(/\d/g);
      var month = text.split(' ')[0];
      jihad[0].innerHTML = month + ' ' + '<span class="custom-year">' + year + '</span>';
    }
  }, []);  

  const change = (
    date: Date | [Date, Date] | /* for selectsRange */ null,
    event: React.SyntheticEvent<any> | undefined,
): void => {
  
  if(date) {
    if (Array.isArray(date)) {

    } else{
      setInternalDate(date)
    }
  }
  console.log(date, event);
};

  type Props = {onInputClick?():void, onFocus?(event: React.FocusEvent<HTMLInputElement>): void }

  const ref = React.createRef<HTMLInputElement>();
  // const ref = React.useRef<HTMLInputElement>(null);
  const calendarContainer = (props: calendarContainerProps) => (<CalendarContainer {...props} showPopperArrow={false} />);
  // const RdateTimeInput = <FwDateTimeInput<string> onChange={(date) => console.log(date)} className="ready" ref={ref}/>;

  const nextIcon = (<span className='pyreneIcon-chevronRight' />);
  const prevIcon = (<span className='pyreneIcon-chevronLeft' />);

  return (
    <div className={styles.wrapper}>
      <ReactDatepicker
        calendarContainer={calendarContainer}

        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div>
            <button
              aria-label="Previous Month"
              className={
                "react-datepicker__navigation react-datepicker__navigation--previous"
              }
              onClick={decreaseMonth}
            >
              {prevIcon}
            </button>
            <span className="react-datepicker__current-month">
              {date.toLocaleString("en-US", {
                month: "long"
              })}
              &nbsp;
              <span className="pyrene__current-year">
                {date.toLocaleString("en-US", {
                  year: "numeric",
                })} 
              </span>             
            </span>
            <button
              aria-label="Next Month"
              className={
                "react-datepicker__navigation react-datepicker__navigation--next"
              }
              onClick={increaseMonth}
            >
              {nextIcon}
            </button>
          </div>
        )}

        customInput={
          <FwDateTimeInput
            timeStamp={internalDate?.valueOf()}
            onChange={(date) => console.log(date)} 
            ref={ref} 
          />
        }
        selected={startDate}
        startDate={sDate}
        onChange={change}
        endDate={endDate}
        dateFormat="MMMM d, yyyy h:mm aa"
        showTimeSelect={false}
        nextMonthButtonLabel={nextIcon}
        formatWeekDay={nameOfDay => nameOfDay.substr(0,1)}
        locale={enGB}
      />
      {console.log(getDefaultLocale())}
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
