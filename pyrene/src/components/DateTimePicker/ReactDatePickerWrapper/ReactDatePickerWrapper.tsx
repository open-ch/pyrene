import React, { useEffect, useRef } from 'react';
import ReactDatepicker from 'react-datepicker';
import Icon from '../../Icon/Icon';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../datePicker.css';

export interface DatePickerProps{
  /**
   * Close the calendar dropdown on date select
   */
  closeOnSelect?: boolean,
  /**
   * Replaces the input with any node, for example a button
   */
  customInput: React.ReactNode,
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
  /**
   * Display the component inline
   */
  inline?: boolean,
  /**
   * Calendar is opened on input component render
   */
  isOpen?: boolean,
  /**
   * This is a Date object that represents the maximum date allowed by the component
   */
  maxDate?: Date,
  /**
   * This is a Date object that represents the minimum date allowed by the component
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
   * Callback for when user clicks outside component
   */
  onClickOutside?: (event: React.MouseEvent<HTMLDivElement>) => void,
  /**
   * Function to handle date select event
   */
  onSelect?: (date: Date, event: React.SyntheticEvent<any> | undefined) => void,
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

const ReactDatePickerWrapper: React.FC<DatePickerProps> = ({
  closeOnSelect = true,
  dateFormat = 'dd.MM.yyyy',
  endDate,
  maxDate,
  minDate,
  selectedDate,
  endRange = false,
  startRange = false,
  startDate,
  shouldDisplayTimeColumn = true,
  customInput = <input />,
  inline = false,
  isOpen,
  onCalendarOpen,
  onChange = () => {},
  onClickOutside,
  onSelect,
  openDate,
  range = false,
  timeFormat = ' HH:mm',
}: DatePickerProps) => {

  const rangeRef = useRef<ReactDatepicker>(null);

  useEffect(() => {
    if (isOpen) {
      rangeRef.current?.setOpen(isOpen);
      rangeRef.current?.setState({ preSelection: selectedDate });
    }
  }, [isOpen, selectedDate]);

  return (
    <div className={styles.wrapper}>
      <ReactDatepicker
        calendarStartDay={1}
        customInput={customInput}
        dateFormat={`${dateFormat}${timeFormat}`}
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
              <Icon type="inline" name="chevronLeft" color="neutral-500" />
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
              <Icon type="inline" name="chevronRight" color="neutral-500" />
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

export default ReactDatePickerWrapper;
