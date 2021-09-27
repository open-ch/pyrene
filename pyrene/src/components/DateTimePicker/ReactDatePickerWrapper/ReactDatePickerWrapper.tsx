import React, { useEffect, useRef } from 'react';
import ReactDatepicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../datePicker.css';

const DATE_FORMAT = 'dd.MM.yyyy';
const DATETIME_FORMAT = 'dd.MM.yyyy HH:mm';

export { CalendarContainer } from 'react-datepicker';
export interface DatePickerProps{
  closeOnSelect?: boolean,
  /**
   * Replaces the input with any node, for example a button
   */
  CustomInput: React.ReactNode,
  customCalendar?(props: { children: React.ReactNode[] }): React.ReactNode,
  /**
   * Boolean to toggle time display
   */
  dateOnly?: boolean,
  /**
   * This is a Date object that represents the end date of a date range
   */
  endDate?: Date,
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
   * Do something when calendar opens
   */
  onCalendarOpen?: () => void,
  /**
   * Function to handle date change event
   */
  onChange?: (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined) => void,
  /**
   * Name that can be used to uniquely identify the component
   */
  name?: string,
  onClickOutside?(event: React.MouseEvent<HTMLDivElement>): void,
  /**
   * Function to handle date select event
   */
  onSelect?(date: Date, event: React.SyntheticEvent<any> | undefined): void,
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
  tabNum?: number,
  /**
   * This is a unix timestamp, which is the number of seconds that have elapsed since Unix epoch
   */
  timeStamp?: number | null,
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
  endDate,
  maxDate,
  minDate,
  selectedDate,
  endRange = false,
  startRange = false,
  startDate,
  shouldDisplayTimeColumn = true,
  CustomInput = <input />,
  inline = false,
  isOpen,
  onCalendarOpen,
  onChange = () => {},
  onClickOutside,
  onSelect,
  openDate,
  range = false,
  tabNum,
  value,
}: DatePickerProps) => {

  const rangeRef = useRef<ReactDatepicker>(null);
  const dateFormatting = dateOnly ? DATE_FORMAT : DATETIME_FORMAT;

  useEffect(() => {
    if (isOpen) {
      rangeRef.current?.setOpen(isOpen);
      rangeRef.current?.setState({ preSelection: selectedDate });
    }
  }, [isOpen, selectedDate]);

  const nextIcon = <span className="pyreneIcon-chevronRight" />;
  const prevIcon = <span className="pyreneIcon-chevronLeft" />;

  return (
    <div className={styles.wrapper}>
      <ReactDatepicker
        calendarContainer={customCalendar}
        calendarStartDay={1}
        customInput={CustomInput}
        dateFormat={dateFormatting}
        endDate={endDate}
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
        inline={inline}
        maxDate={maxDate}
        minDate={minDate}
        onCalendarOpen={onCalendarOpen}
        onCalendarClose={() => isOpen && rangeRef.current?.setOpen(isOpen)}
        onChange={onChange}
        onClickOutside={onClickOutside}
        onSelect={onSelect}
        openToDate={openDate}
        ref={rangeRef}
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
        selected={selectedDate}
        selectsEnd={endRange}
        selectsRange={range}
        selectsStart={startRange}
        shouldCloseOnSelect={closeOnSelect}
        showPopperArrow={false}
        showTimeSelect={shouldDisplayTimeColumn}
        startDate={startDate || selectedDate}
        tabIndex={tabNum}
        timeFormat="HH:mm"
        value={value}
      />
    </div>
  );
};

export default ReactDPWrapper;
