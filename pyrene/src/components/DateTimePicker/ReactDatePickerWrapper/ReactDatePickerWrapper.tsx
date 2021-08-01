import React, { useEffect, useRef } from 'react';
import ReactDatepicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../datePicker.css';


const DATE_FORMAT = 'dd.MM.yyyy';
const DATETIME_FORMAT = 'dd.MM.yyyy HH:mm';

export interface CalendarProps {
  className?: string,
  children: React.ReactNode,
}


export { CalendarContainer } from 'react-datepicker';
export interface DatePickerProps{
  closeOnSelect?: boolean,
  /**
 * Replaces the input with any node, for example a button
9 */
  CustomInput: React.ReactNode,
  customCalendar?(props: { children: React.ReactNode[] }): React.ReactNode,
  /**
   * This is a Date object that represents the end date of a date range
   */
  endDate?: Date,
  dateOnly?: boolean,
  inline?: boolean,
  isOpen?: boolean,
  /**
   * This is a timestamp that represents the maximum date allowed by the component
   */
  maxDate?: Date,
  /**
   * This is a timestamp that represents the minimum date allowed by the component
   */
  minDate?: Date,
  /**
   * Function to handle date change event
   */
  onChange?: (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined) => void,
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
  openDate?: Date,
  /**
   * This is a Date object that represents the selected date of the datepicker
   */
  selectedDate?: Date,
  startRange?: boolean,
  endRange?: boolean,
  range?: boolean,
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
}


const ReactDPWrapper: React.FC<DatePickerProps> = ({
  closeOnSelect = true,
  customCalendar,
  dateOnly = false,
  endDate = undefined,
  maxDate,
  minDate,
  onKeyDown,
  selectedDate = undefined,
  endRange = false,
  startRange = false,
  startDate = undefined,
  shouldDisplayTimeColumn = true,
  CustomInput = <input />,
  inline = false,
  isOpen,
  onChange = () => {},
  onSelect,
  openDate,
  range = false,
  value = undefined,
}: DatePickerProps) => {

  const rangeRef = useRef<ReactDatepicker>(null);
  const dateFormatting = dateOnly ? DATE_FORMAT : DATETIME_FORMAT;

  useEffect(() => {
    rangeRef.current?.setOpen(false);
  }, [isOpen]);

  const nextIcon = <span className="pyreneIcon-chevronRight" />;
  const prevIcon = <span className="pyreneIcon-chevronLeft" />;

  return (
    <div className={styles.wrapper}>
      <ReactDatepicker
        endDate={endDate}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div>
            <button
              aria-label="Previous Month"
              className="react-datepicker__navigation react-datepicker__navigation--previous"
              onClick={decreaseMonth}
              type="button"
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
            <button
              aria-label="Next Month"
              className="react-datepicker__navigation react-datepicker__navigation--next"
              onClick={increaseMonth}
              type="button"
            >
              {nextIcon}
            </button>
          </div>
        )}
        customInput={CustomInput}
        calendarStartDay={1}
        calendarContainer={customCalendar}
        onKeyDown={onKeyDown}
        onSelect={onSelect}
        selected={selectedDate}
        startDate={startDate || selectedDate}
        timeFormat="HH:mm"
        showPopperArrow={false}
        showTimeSelect={shouldDisplayTimeColumn}
        onChange={onChange}
        maxDate={maxDate}
        minDate={minDate}
        dateFormat={dateFormatting}
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
        selectsStart={startRange}
        selectsEnd={endRange}
        selectsRange={range}
        openToDate={openDate}
        shouldCloseOnSelect={closeOnSelect}
        inline={inline}
        value={value}
        ref={rangeRef}
      />
    </div>
  );
};

export default ReactDPWrapper;
