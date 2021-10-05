import React, { useEffect, useRef } from 'react';
import ReactDatepicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../datePicker.css';

export { CalendarContainer } from 'react-datepicker';
export interface DatePickerProps{
  closeOnSelect?: boolean,
  /**
   * Replaces the input with any node, for example a button
   */
  CustomInput: React.ReactNode,
  customCalendar?(props: { children: React.ReactNode[] }): React.ReactNode,
  /**
   * Date format used by component
   */
  dateFormat?: string,
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
  /**
   * Callback for when user clicks outside component
   */
  onClickOutside?(event: React.MouseEvent<HTMLDivElement>): void,
  /**
   * Function to handle date select event
   */
  onSelect?(date: Date, event: React.SyntheticEvent<any> | undefined): void,
  /**
   * Move calender to specific date
   */
  openDate?: Date,
  /**
   * This is a Date object that represents the selected date of the datepicker
   */
  selectedDate?: Date,
  /**
   * Is calendar starting a range
   */
  startRange?: boolean,
  /**
   * Is calendar ending a range
   */
  endRange?: boolean,
  /**
   * Is calendar selecting a range
   */
  range?: boolean,
  /**
   * This is a Date object that represents the start date of a date range
   */
  startDate?: Date,
  /**
   * Time format used by component
   */
  timeFormat?: string,
  /**
   * Should display the Time column on the right-hand side
   */
  shouldDisplayTimeColumn?: boolean,
}

const ReactDPWrapper: React.FC<DatePickerProps> = ({
  closeOnSelect = true,
  customCalendar,
  dateFormat = 'dd.MM.yyyy',
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
  timeFormat = 'HH:mm',
}: DatePickerProps) => {

  const rangeRef = useRef<ReactDatepicker>(null);

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
        dateFormat={dateFormat}
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
        timeFormat={timeFormat}
      />
    </div>
  );
};

export default ReactDPWrapper;
