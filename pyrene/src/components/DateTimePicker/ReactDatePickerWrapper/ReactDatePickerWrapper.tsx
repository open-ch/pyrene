import React from 'react';
import ReactDatepicker from 'react-datepicker';

import {
  DateType,
} from '../../../utils/DateUtils';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../datePicker.css';

export interface DatePickerProps{
  /**
   * This is a Date object that represents the end date of a date range
   */
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
   * Function to handle date change event
   */
  // onChange?: (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined) => void,
  onChange?: (date: any) => void,
  /**
   * Name that can be used to uniquely identify the component
   */
  name?: string,
  /**
   * Exposed to have access to input events
   */
  onKeyDown?(event: React.KeyboardEvent<HTMLDivElement>): void;
  /**
   * Function to handle date select event
   */
  onSelect?(date: Date, event: React.SyntheticEvent<any> | undefined): void;
  /**
   * This is a Date object that represents the selected date of the datepicker
   */
  selectedDate?: Date,
  /**
   * This is a Date object that represents the start date of a date range
   */
  startDate?: Date,
  /**
   * This is a unix timestamp, which is the number of seconds that have elapsed since Unix epoch
   */
  timeStamp?: number | null,
  /**
   * This is must be a IANA time zone string
   */
  timeZone?: string,

  value?: string,
  /**
   * Should display the Time column on the right-hand side
   */
  shouldDisplayTimeColumn?: boolean,

  dateFormat?: string,

  timeFormat?: string,

  selected?: Date,

  placeholder?: string,
}


const ReactDPWrapper: React.FC<DatePickerProps> = ({
  onKeyDown,
  dateFormat,
  selectedDate = undefined,
  shouldDisplayTimeColumn = true,
  onChange = () => {},
  onSelect,
  selected,
  placeholder,
}: DatePickerProps) => {

  const nextIcon = <span className="pyreneIcon-chevronRight" />;
  const prevIcon = <span className="pyreneIcon-chevronLeft" />;

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
        onKeyDown={onKeyDown}
        onSelect={onSelect}
        selected={selected || selectedDate}
        timeFormat="HH:mm aa"
        showPopperArrow={false}
        showTimeSelect={shouldDisplayTimeColumn}
        onChange={onChange}
        dateFormat={dateFormat}
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
        placeholderText={placeholder}
      />
    </div>
  );
};

export default ReactDPWrapper;
