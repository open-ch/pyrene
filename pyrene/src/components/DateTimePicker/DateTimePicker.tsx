import React, {
  useCallback, useEffect, useState,
} from 'react';

import ReactDatePickerWrapper from './ReactDatePickerWrapper/ReactDatePickerWrapper';
import DateTimeInput from './DateTimeInput/DateTimeInput';

import {
  customDateFormat, convertToUTCtime, convertToZoneTime, customStringToDate,
  getErrors, hasDateError, hasTimeError, getClientTimeZone, getFormat, DateTimeLocale,
} from '../../utils/DateUtils';

type OnFunction = (value?: number) => void;

export interface DateTimePickerProps{
  /**
   * Calendar is opened on input component render
   */
  calendarOpened?: boolean,
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
   * Locale used by component for date and time
   */
  locale?: DateTimeLocale,
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

  const format = getFormat(locale);

  const [internalDate, setInternalDate] = useState<Date | undefined>();
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [errorValue, setErrorValue] = useState('');

  const [closeDrop, setCloseDrop] = useState<boolean>();

  // Sets internal date and passes validated value to parent
  const handleCallback = useCallback((dateString: string, timeString: string, callback?: OnFunction) => {
    const date = customStringToDate(dateString, format.dateFormat);
    const time = customStringToDate(timeString, format.timeFormat);

    if (dateOnly && !Number.isNaN(date.getTime())) {
      const validDate = convertToUTCtime(date, timeZone);
      setInternalDate(validDate);
      callback?.(validDate.getTime());

      setCloseDrop(true);
    } else if (!dateOnly && !Number.isNaN(date.getTime()) && !Number.isNaN(time.getTime())) {
      const validDate = convertToUTCtime(customStringToDate(`${dateString}${timeString}`, `${format.dateFormat}${format.timeFormat}`), timeZone);
      setInternalDate(validDate);
      callback?.(validDate.getTime());
    } else {
      setInternalDate(undefined);
      callback?.(undefined);

      setCloseDrop(true);
    }
  }, [dateOnly, timeZone, format]);

  const handleDateChange = (dateString?: string, timeString?: string) => {
    if (dateString && dateString.length === format.dateFormat.length) {
      if (customDateFormat(dateString, format.dateFormat)) {
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
    if (timeString && timeString.length === format.timeFormat.length) {
      if (customDateFormat(timeString, format.timeFormat)) {
        setTimeValue(timeString);

        if (dateString) {
          handleCallback(dateString, timeString, onChange);
        }
      }
    }
  };

  // Handle changes from react datepicker
  const onChangeReactDP = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined): void => {
    if (date && (event?.type === 'click' || (event?.type === 'keydown' && (event as React.KeyboardEvent).key.length > 1))) {
      if (!Array.isArray(date)) {
        handleDateChange(customDateFormat(date, format.dateFormat), timeValue);
      }
    } else if (event?.type === 'change') {
      // This gets triggered when typing in the DateTimeInput component attached to the reactdatepicker calendar
      const node = event?.target as HTMLInputElement;

      if (node.value.length === (format.dateFormat.length + format.timeFormat.length)) {
        const datetime = customStringToDate(node.value, `${format.dateFormat}${format.timeFormat}`);
        const d = customDateFormat(datetime, format.dateFormat);
        const t = customDateFormat(datetime, format.timeFormat);

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
      handleTimeChange(customDateFormat(date, format.timeFormat), dateValue || customDateFormat(date, format.dateFormat));
    } else {
      setInternalDate(undefined);
    }
  };

  const resetOnClose = () => {
    if (`${dateValue}${timeValue}`.trim() === '') {
      setInternalDate(undefined);
    }
  };

  // Update date and time string values if internal date object is changed
  useEffect(() => {
    if (internalDate) {
      const dateString = customDateFormat(internalDate, format.dateFormat);
      const timeString = customDateFormat(internalDate, format.timeFormat);

      if (dateString) {
        setDateValue(dateString);
        if (!dateOnly && timeString) {
          setTimeValue(timeString);
        }
      }
    }
  }, [dateOnly, format.dateFormat, format.timeFormat, internalDate]);

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
      isDateInvalid: hasDateError({ dateString: dateValue, dateFormat: format.dateFormat }),
      isTimeInvalid: hasTimeError(timeValue, format.timeFormat),
      minimumValue: minDateTime,
      maximumValue: maxDateTime,
      timeZone: timeZone,
      dateFormat: format.dateFormat,
      timeString: timeValue,
      timeFormat: format.timeFormat,
    };
    setErrorValue(getErrors(dateValObj));
  }, [maxDateTime, minDateTime, timeZone, dateValue, timeValue, format]);

  return (
    <ReactDatePickerWrapper
      closeDropdown={closeDrop}
      dateFormat={format.dateFormat}
      dateOnly={dateOnly}
      endDate={endDate}
      endRange={selectEnd}
      customInput={(
        <DateTimeInput
          dateFormat={format.dateFormat}
          dateOnly={dateOnly}
          dateValue={dateValue}
          timeValue={timeValue}
          errorValue={errorValue}
          label={label}
          name={name}
          setDateValue={setDateValue}
          setTimeValue={setTimeValue}
          timeFormat={format.timeFormat}
        />
      )}
      maxDate={maxDateTime != null ? convertToUTCtime(maxDateTime, timeZone) : maxDateTime}
      minDate={minDateTime != null ? convertToUTCtime(minDateTime, timeZone) : minDateTime}
      onCalendarClose={resetOnClose}
      onCalendarOpen={onCalendarOpen}
      onChange={onChangeReactDP}
      onClickOutside={onClickOutside}
      openDate={openDate}
      required={required}
      selectedDate={internalDate}
      shouldDisplayTimeColumn={!dateOnly}
      startDate={startDate}
      startRange={selectStart}
      timeFormat={format.timeFormat}
    />
  );
};

DateTimePicker.displayName = 'DateTime Picker';

export default DateTimePicker;
