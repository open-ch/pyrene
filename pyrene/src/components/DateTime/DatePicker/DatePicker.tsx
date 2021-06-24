import React, {
  useState,
  useRef,
} from 'react';
import ReactDatepicker, {
  CalendarContainer,
  registerLocale,
  setDefaultLocale,
  getDefaultLocale,
} from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';

import FwDateTimeInput from '../DateTimeInput/DateTimeInputForward';

import {
  DateType,
} from '../../../utils/DateUtils';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './datePicker.css';
registerLocale('en-GB2', { ...enGB, options: { ...enGB.options, weekStartsOn: 3 } });
setDefaultLocale('en-GB2');

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
  /**
   * Should display the Time column on the right-hand side
   */
  shouldDisplayTimeColumn?: boolean,
}

interface CalendarContainerProps {
  className?: string;
  children?: React.ReactNode;
  showPopperArrow?: boolean;
  arrowProps?: { [propName: string]: any };
}

const DatePicker: React.FC<DatePickerProps> = ({
  endDate,
  startDate = new Date(),
  shouldDisplayTimeColumn,
}: DatePickerProps) => {

  const [internalDate, setInternalDate] = useState<Date>();
  const ref = useRef<HTMLInputElement | null>(null);

  const change = (
    date: Date | [Date, Date] | /* for selectsRange */ null,
    event: React.SyntheticEvent<any> | undefined,
  ): void => {
    if (date) {
      if (!Array.isArray(date)) {
        setInternalDate(date);
      }
    }
    console.log(date, event);
  };

  const calendarContainer = (props: CalendarContainerProps) => (<CalendarContainer {...props} showPopperArrow={false} />);

  const nextIcon = (<span className="pyreneIcon-chevronRight" />);
  const prevIcon = (<span className="pyreneIcon-chevronLeft" />);

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
        customInput={(
          <FwDateTimeInput
            timeStamp={internalDate?.valueOf()}
            onChange={(date) => console.log(date)}
            ref={ref}
          />
        )}
        selected={startDate}
        startDate={startDate}
        onChange={change}
        endDate={endDate}
        dateFormat="MMMM d, yyyy h:mm aa"
        showTimeSelect={shouldDisplayTimeColumn}
        nextMonthButtonLabel={nextIcon}
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
        locale={enGB}
      />
      {console.log(getDefaultLocale())}
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
