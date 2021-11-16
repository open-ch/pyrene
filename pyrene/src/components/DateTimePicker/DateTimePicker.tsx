import React, {
  useCallback, useEffect, useState,
} from 'react';

import ReactDatePickerWrapper from './ReactDatePickerWrapper/ReactDatePickerWrapper';
import DateTimeInput from './DateTimeInput/DateTimeInput';

import {
  customDateFormat, convertToUTCtime, convertToZoneTime, customStringToDate,
  getErrors, hasDateError, hasTimeError, getClientTimeZone, DateTimeLocale, getFormat
} from '../../utils/DateUtils';

type OnFunction = (value?: number) => void;

export interface DateTimePickerProps {
  /**
   * Calendar is opened on input component render
   */
  calendarOpened?: boolean,
  /**
   * Locale used by component for date and time
   */
  locale?: DateTimeLocale,
  /**
   * Boolean to toggle time display
   */
  dateOnly?: boolean,
  /**
   * Date object that represents the end date of the component
   */
  endDate?: Date,
  /**
   * String label of the component
   */
  label?: string,
  /**
   * Unix timestamp that represents the maximum date allowed by the component
   */
  maxDateTime?: number,
  /**
   * Unix timestamp that represents the minimum date allowed by the component
   */
  minDateTime?: number,
  /**
   * Name that can be used to uniquely identify the component
   */
  name?: string,
  /**
   * Calendar opened callback
   */
  onCalendarOpen?: () => void,
  /**
   * Click outside component callback
   */
  onClickOutside?: (event: React.MouseEvent<HTMLDivElement>) => void,
  /**
  * Function to handle onChange event
  */
  onChange: OnFunction,
  /**
   * Move calender to specific date
   */
  openDate?: Date,
  /**
   * Component must be filled
   */
  required?: boolean,
  /**
   * Input selects the end date of a range
   */
  selectEnd?: boolean,
  /**
  * Input selects the start date of a range
  */
  selectStart?: boolean,
  /**
  * Date object that represents the start date of the component
  */
  startDate?: Date,
  /**
   * Unix timestamp to initialize component with
   */
  timeStamp?: number,
  /**
   * This is must be a IANA time zone string
   */
  timeZone?: string,
}

/**
 * A component for selecting date and time.
 */
const DateTimePicker: React.FC<DateTimePickerProps> = ({
  calendarOpened,
  locale = 'eu',
  dateOnly = false,
  endDate,
  label,
  maxDateTime,
  minDateTime,
  name,
  onCalendarOpen,
  onChange,
  onClickOutside,
  openDate,
  required,
  selectEnd,
  selectStart,
  startDate,
  timeStamp,
  timeZone = getClientTimeZone(),
}: DateTimePickerProps) => {

  const [internalDate, setInternalDate] = useState<Date | undefined>();

  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  const [errorValue, setErrorValue] = useState('');

  const [closeDrop, setCloseDrop] = useState<boolean>();
  const format = getFormat(locale);

  // Sets internal date and passes validated value to parent
  const handleCallback = useCallback((dateString: string, timeString: string, callback?: OnFunction) => {
    const date = customStringToDate(dateString, format.date);
    const time = customStringToDate(timeString, format.time);

    if (dateOnly && !Number.isNaN(date.getTime())) {
      const validDate = convertToUTCtime(date, timeZone);
      setInternalDate(validDate);
      callback?.(validDate.getTime());

      setCloseDrop(true);
    } else if (!dateOnly && !Number.isNaN(date.getTime()) && !Number.isNaN(time.getTime())) {
      const validDate = convertToUTCtime(customStringToDate(`${dateString}${timeString}`, `${format.date}${format.time}`), timeZone);
      setInternalDate(validDate);
      callback?.(validDate.getTime());

      setCloseDrop(true);
    } else {
      setInternalDate(undefined);
      callback?.(undefined);
    }
  }, [format, dateOnly, timeZone]);

  const handleDateChange = (dateString?: string, timeString?: string) => {
    if (dateString && dateString.length === format.date.length) {
      if (customDateFormat(dateString, format.date)) {
        setDateValue(dateString);

        if (dateOnly) {
          handleCallback(dateString, '', onChange);
        } else if (timeString) {
          handleCallback(dateString, timeString, onChange);
        }
      }
    }
  };

  const handleTimeChange = (timeString?: string, dateString?: string) => {
    if (timeString && timeString.length === format.time.length) {
      if (customDateFormat(timeString, format.time)) {
        setTimeValue(timeString);

        if (dateString) {
          handleCallback(dateString, timeString, onChange);
        }
      }
    }
  };

  // Handle changes from react datepicker
  const onChangeReactDP = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined): void => {
    if (date && event?.type === 'click') {
      if (!Array.isArray(date)) {
        handleDateChange(customDateFormat(date, format.date), timeValue);
      }
    } else if (event?.type === 'change') {
      // This gets triggered when typing in the DateTimeInput component attached to the reactdatepicker calendar
      const node = event?.target as HTMLInputElement;

      if (node.value.length === (format.date.length + format.time.length)) {
        const datetime = customStringToDate(node.value, `${format.date}${format.time}`);
        const d = customDateFormat(datetime, format.date);
        const t = customDateFormat(datetime, format.time);

        if (d) {
          handleDateChange(d, t);
        }

        if (t) {
          handleTimeChange(t, d);
        }
      } else if (node.value.length === 0) {
        setInternalDate(undefined);
      }

    } else if (event === undefined && !Array.isArray(date) && date !== null) {
      /** reactdatepicker currently emits an undefined event when the time list is clicked on.
       * Here we are relying on the time click event being 'undefined' as a temporary means to access time value
      */
      handleTimeChange(customDateFormat(date, format.time), dateValue || customDateFormat(date, format.date));
    } else {
      setInternalDate(undefined);
    }
  };

  // Update date and time string values if internal date object is changed
  useEffect(() => {
    if (internalDate) {
      const dateString = customDateFormat(internalDate, format.date);
      const timeString = customDateFormat(internalDate, format.time);

      if (dateString) {
        setDateValue(dateString);
        if (!dateOnly && timeString) {
          setTimeValue(timeString);
        }
      }
    }
  }, [format, dateOnly, internalDate]);

  // Update date and time string values if timstamp is changed
  useEffect(() => {
    if (timeStamp != null) {
      const dateObj = new Date(timeStamp);
      if (!Number.isNaN(dateObj.getTime())) {
        setInternalDate(convertToZoneTime(timeStamp, timeZone));
      } else {
        setInternalDate(undefined);
      }
    } else {
      setInternalDate(undefined);

      setDateValue('');
      setTimeValue('');
    }
  }, [timeStamp, timeZone]);

  // Set error values on changes in component
  useEffect(() => {
    const dateValObj = {
      dateString: dateValue,
      isDateInvalid: hasDateError({ dateString: dateValue, dateFormat: format.date }),
      isTimeInvalid: hasTimeError(timeValue, format.time),
      minimumValue: minDateTime,
      maximumValue: maxDateTime,
      timeZone: timeZone,
      dateFormat: format.date,
      timeString: timeValue,
      timeFormat: format.time,
    };
    setErrorValue(getErrors(dateValObj));
  }, [maxDateTime, minDateTime, timeZone, dateValue, timeValue, format]);

  return (
    <ReactDatePickerWrapper
      closeDropdown={closeDrop}
      dateFormat={format.date}
      dateOnly={dateOnly}
      endDate={endDate}
      endRange={selectEnd}
      customInput={(
        <DateTimeInput
          dateFormat={format.date}
          dateOnly={dateOnly}
          dateValue={dateValue}
          timeValue={timeValue}
          errorValue={errorValue}
          label={label}
          name={name}
          setDateValue={setDateValue}
          setTimeValue={setTimeValue}
          timeFormat={format.time}
        />
      )}
      isOpen={calendarOpened}
      maxDate={maxDateTime != null ? convertToUTCtime(maxDateTime, timeZone) : maxDateTime}
      minDate={minDateTime != null ? convertToUTCtime(minDateTime, timeZone) : minDateTime}
      onCalendarOpen={onCalendarOpen}
      onChange={onChangeReactDP}
      onClickOutside={onClickOutside}
      openDate={openDate}
      required={required}
      selectedDate={internalDate}
      shouldDisplayTimeColumn={!dateOnly}
      startDate={startDate}
      startRange={selectStart}
      timeFormat={format.time}
    />
  );
};

DateTimePicker.displayName = 'DateTime Picker';

export default DateTimePicker;
