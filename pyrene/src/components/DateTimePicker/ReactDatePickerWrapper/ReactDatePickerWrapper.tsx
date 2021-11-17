import React, { useEffect, useRef, useState } from 'react';
import ReactDatepicker, { ReactDatePickerProps } from 'react-datepicker';
import clsx from 'clsx';
import IconButton from '../../IconButton/IconButton';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../datePicker.css';

export interface DatePickerProps{
  /**
   * Trigger close of calendar dropdown
   */
  closeDropdown?: boolean,
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
  onCalendarClose?: () => void,
  /**
   * Do something when calendar opens
   */
  onCalendarOpen?: () => void,
  /**
   * Function to handle date change event
   */
  onChange?: ReactDatePickerProps['onChange'],
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
   * Component must be filled
   */
  required?: boolean,
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
  closeDropdown,
  dateFormat = 'dd.MM.yyyy',
  endDate,
  maxDate,
  minDate,
  selectedDate,
  endRange = false,
  startRange = false,
  startDate,
  shouldDisplayTimeColumn = true,
  customInput,
  onCalendarClose,
  onCalendarOpen,
  onChange = () => {},
  onClickOutside,
  onSelect,
  openDate,
  required,
  timeFormat = ' HH:mm',
}: DatePickerProps) => {

  const rangeRef = useRef<ReactDatepicker>(null);
  const [hasInput, setHasInput] = useState<boolean>(false);

  const handleChangeRaw = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event?.target.value !== '') {
      setHasInput(true);
    } else {
      setHasInput(false);
    }
  };

  useEffect(() => {
    if (closeDropdown) {
      rangeRef.current?.setOpen(false);
    }
  }, [selectedDate, closeDropdown]);

  return (
    <div className={clsx(styles.wrapper, { [styles.noneselected]: !hasInput })}>
      <ReactDatepicker
        calendarStartDay={1}
        customInput={customInput}
        dateFormat={`${dateFormat}${timeFormat}`}
        endDate={endDate}
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
        maxDate={maxDate}
        minDate={minDate}
        onCalendarOpen={onCalendarOpen}
        onCalendarClose={onCalendarClose}
        onChange={onChange}
        onChangeRaw={handleChangeRaw}
        onClickOutside={onClickOutside}
        onSelect={onSelect}
        openToDate={openDate}
        popperPlacement="bottom-start"
        popperModifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 2],
            },
          },
        ]}
        ref={rangeRef}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div className="pyrene_datepicker_nav_bar">
            <div className="react-datepicker__navigation--previous">
              <IconButton type="neutral" icon="chevronLeft" onClick={decreaseMonth} aria-label="Previous Month" />
            </div>
            <div className="react-datepicker__current-month">
              {date.toLocaleString('en-US', {
                month: 'long',
              })}
              &nbsp;
              <span className="pyrene__current-year">
                {date.toLocaleString('en-US', {
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="react-datepicker__navigation--next">
              <IconButton type="neutral" icon="chevronRight" onClick={increaseMonth} aria-label="Next Month" />
            </div>
          </div>
        )}
        required={required}
        selected={selectedDate}
        selectsEnd={endRange}
        selectsStart={startRange}
        showPopperArrow={false}
        showTimeSelect={shouldDisplayTimeColumn}
        startDate={startDate}
        timeFormat={timeFormat}
        shouldCloseOnSelect
      />
    </div>
  );
};

export default ReactDatePickerWrapper;
