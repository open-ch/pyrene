import React, {
  useCallback, useEffect, useState,
} from 'react';

import ReactDatePickerWrapper from './ReactDatePickerWrapper/ReactDatePickerWrapper';
import DateTimeInput from './DateTimeInput/DateTimeInput';

import {
  customDateFormat, convertToUTCtime, convertToZoneTime, customStringToDate,
  getErrors, hasDateError, hasTimeError, getClientTimeZone,
} from '../../utils/DateUtils';

type OnFunction = (value?: number) => void;

export interface DateTimePickerProps{
  /**
   * Calendar is opened on input component render
   */
  calendarOpened?: boolean,
  /**
   * Date format used by component
   */
  dateFormat?: string,
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
   * Date format used by component
   */
  timeFormat?: string,
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
  dateFormat = 'dd.MM.yyyy',
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
  selectEnd,
  selectStart,
  startDate,
  timeFormat = ' HH:mm',
  timeStamp,
  timeZone = getClientTimeZone(),
}: DateTimePickerProps) => {

  const [internalDate, setInternalDate] = useState<Date | undefined>();

  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  const [errorValue, setErrorValue] = useState('');

  const [closeDrop, setCloseDrop] = useState<boolean>();

  // Sets internal date and passes validated value to parent
  const handleCallback = useCallback((dateString: string, timeString: string, callback?: OnFunction) => {
    const date = customStringToDate(dateString, dateFormat);
    const time = customStringToDate(timeString, timeFormat);

    if (dateOnly && !Number.isNaN(date.getTime())) {
      const validDate = convertToUTCtime(date, timeZone);
      setInternalDate(validDate);
      callback?.(validDate.getTime());

      setCloseDrop(true);
    } else if (!dateOnly && !Number.isNaN(date.getTime()) && !Number.isNaN(time.getTime())) {
      const validDate = convertToUTCtime(customStringToDate(`${dateString}${timeString}`, `${dateFormat}${timeFormat}`), timeZone);
      setInternalDate(validDate);
      callback?.(validDate.getTime());

      setCloseDrop(true);
    } else {
      setInternalDate(undefined);
      callback?.(undefined);
    }
  }, [dateFormat, dateOnly, timeZone, timeFormat]);

  const handleDateChange = (dateString?: string, timeString?: string) => {
    if (dateString && dateString.length === dateFormat.length) {
      try {
        if (customDateFormat(dateString, dateFormat)) {
          setDateValue(dateString);

          if (timeString && (timeString.length + dateString.length) === (dateFormat.length + timeFormat.length)) {
            handleCallback(dateString, timeString, onChange);
          }
        }
      } catch (error) {
        setErrorValue('Error in date handler. Date value.');
      }
    }
  };

  const handleTimeChange = (timeString?: string, dateString?: string) => {
    if (timeString && timeString.length === timeFormat.length) {
      try {
        if (customDateFormat(timeString, timeFormat)) {
          setTimeValue(timeString);
        }

        if (dateString && (dateString.length + timeString.length) === (dateFormat.length + timeFormat.length)) {
          handleCallback(dateString, timeString, onChange);
        }
      } catch (error) {
        setErrorValue('Error in time handler.');
      }
    }
  };

  // Handle changes from react datepicker
  const onChangeReactDP = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined): void => {
    if (date && (event?.type === 'click' || (event?.type === 'keydown' && (event as React.KeyboardEvent).key.length > 1))) {
      if (!Array.isArray(date)) {
        handleDateChange(customDateFormat(date, dateFormat), timeValue);
      }
    } else if (event?.type === 'change') {
      // This gets triggered when typing in the DateTimeInput component attached to the reactdatepicker calendar
      const node = event?.target as HTMLInputElement;

      if (node.value.length === (dateFormat.length + timeFormat.length)) {
        const datetime = customStringToDate(node.value, `${dateFormat}${timeFormat}`);
        const d = customDateFormat(datetime, dateFormat);
        const t = customDateFormat(datetime, timeFormat);

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
      handleTimeChange(customDateFormat(date, timeFormat), dateValue);
    } else {
      setInternalDate(undefined);
    }
  };

  // Update date and time string values if internal date object is changed
  useEffect(() => {
    if (internalDate) {
      const dateString = customDateFormat(internalDate, dateFormat);
      const timeString = customDateFormat(internalDate, timeFormat);

      if (dateString) {
        setDateValue(dateString);
        if (!dateOnly && timeString) {
          setTimeValue(timeString);
        }
      }
    }
  }, [dateFormat, dateOnly, internalDate, timeFormat]);

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
      isDateInvalid: hasDateError({ dateString: dateValue, dateFormat: dateFormat }),
      isTimeInvalid: hasTimeError(timeValue, timeFormat),
      minimumValue: minDateTime,
      maximumValue: maxDateTime,
      timeZone: timeZone,
      dateFormat: dateFormat,
      timeString: timeValue,
      timeFormat: timeFormat,
    };
    setErrorValue(getErrors(dateValObj));
  }, [maxDateTime, minDateTime, timeZone, dateValue, timeValue, dateFormat, timeFormat]);

  return (
    <ReactDatePickerWrapper
      closeDropdown={closeDrop}
      dateFormat={dateFormat}
      dateOnly={dateOnly}
      endDate={endDate}
      endRange={selectEnd}
      customInput={(
        <DateTimeInput
          dateFormat={dateFormat}
          dateOnly={dateOnly}
          dateValue={dateValue}
          timeValue={timeValue}
          errorValue={errorValue}
          label={label}
          name={name}
          setDateValue={setDateValue}
          setTimeValue={setTimeValue}
          timeFormat={timeFormat}
        />
      )}
      isOpen={calendarOpened}
      maxDate={maxDateTime != null ? convertToUTCtime(maxDateTime, timeZone) : maxDateTime}
      minDate={minDateTime != null ? convertToUTCtime(minDateTime, timeZone) : minDateTime}
      onCalendarOpen={onCalendarOpen}
      onChange={onChangeReactDP}
      onClickOutside={onClickOutside}
      openDate={openDate}
      selectedDate={internalDate}
      shouldDisplayTimeColumn={!dateOnly}
      startDate={startDate}
      startRange={selectStart}
      timeFormat={timeFormat}
    />
  );
};

DateTimePicker.displayName = 'DateTime Picker';

export default DateTimePicker;
