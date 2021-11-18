import React, {
  useCallback, useEffect, useState,
} from 'react';

import ReactDatePickerWrapper from './ReactDatePickerWrapper/ReactDatePickerWrapper';
import DateTimeInput from './DateTimeInput/DateTimeInput';

import {
  customDateFormat, convertToUTCtime, convertToZoneTime, customStringToDate,
  getErrors, hasDateError, hasTimeError, getClientTimeZone, getFormat, DateTimeLocale, Format,
} from '../../utils/DateUtils';

type OnFunction = (value?: number) => void;

export interface DateTimePickerProps {
  /**
   * Boolean to toggle time display
   */
  dateOnly?: boolean,
  /**
   * Component is disabled
  */
  disabled?: boolean,
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
  selectsEnd?: boolean,
  /**
  * Input selects the start date of a range
  */
  selectsStart?: boolean,
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
  dateOnly = false,
  disabled,
  endDate,
  label,
  locale = 'eu',
  maxDateTime,
  minDateTime,
  name,
  onCalendarOpen,
  onChange,
  onClickOutside,
  openDate,
  required,
  selectsEnd,
  selectsStart,
  startDate,
  timeStamp,
  timeZone = getClientTimeZone(),
}: DateTimePickerProps) => {

  const format: Format = getFormat(locale);

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
      const zoneDate = convertToZoneTime(date, timeZone);
      const utcDate = convertToUTCtime(date, timeZone);
      setInternalDate(zoneDate);
      callback?.(utcDate.getTime());

      setCloseDrop(true);
    } else if (!dateOnly && !Number.isNaN(date.getTime()) && !Number.isNaN(time.getTime())) {
      const dateTime = customStringToDate(`${dateString}${timeString}`, `${format.dateFormat}${format.timeFormat}`);
      const zoneDateTime = convertToZoneTime(dateTime, timeZone);
      const utcDateTime = convertToUTCtime(dateTime, timeZone);
      setInternalDate(zoneDateTime);
      callback?.(utcDateTime.getTime());

      setCloseDrop(true);
    } else {
      setInternalDate(undefined);
      callback?.(undefined);

      setCloseDrop(undefined);
    }
  }, [dateOnly, timeZone, format]);

  const handleDateAndTimeChange = (customDateString?: string, customTimeString?: string) => {
    if (customTimeString) {
      setTimeValue(customTimeString);
    }

    if (customDateString) {
      setDateValue(customDateString);

      if (dateOnly) {
        handleCallback(customDateString, '', onChange);
      } else if (customTimeString) {
        handleCallback(customDateString, customTimeString, onChange);
      }
    }
  };

  // Handle changes from react datepicker
  const onChangeReactDP = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined): void => {
    if (date && (event?.type === 'click' || (event?.type === 'keydown' && (event as React.KeyboardEvent).key.length > 1))) {
      if (!Array.isArray(date)) {
        handleDateAndTimeChange(customDateFormat(date, format.dateFormat), timeValue);
      }
    } else if (event?.type === 'change') {
      // This gets triggered when typing in the DateTimeInput component attached to the reactdatepicker calendar
      const node = event?.target as HTMLInputElement;
      const formatLength = dateOnly ? format.dateFormat.length : (format.dateFormat.length + format.timeFormat.length);

      if (node.value.length === formatLength) {
        const dateString = customDateFormat(node.value.substring(0, format.dateFormat.length), format.dateFormat);
        const timeString = customDateFormat(node.value.substring(format.dateFormat.length), format.timeFormat);

        handleDateAndTimeChange(dateString, timeString);
      } else if (node.value.length === 0) {
        setInternalDate(undefined);
      }
    } else if (event === undefined && !Array.isArray(date) && date !== null) {
      /** reactdatepicker currently emits an undefined event when the time list is clicked on.
       * Here we are relying on the time click event being 'undefined' as a temporary means to access time value
      */
      handleDateAndTimeChange(dateValue || customDateFormat(date, format.dateFormat), customDateFormat(date, format.timeFormat));
    } else {
      setInternalDate(undefined);
    }
  };

  const getMaximumDate = useCallback(() => {
    if (selectsStart && endDate) {
      return endDate;
    }

    if (maxDateTime != null) {
      return convertToZoneTime(maxDateTime, timeZone);
    }

    return maxDateTime;
  }, [endDate, maxDateTime, selectsStart, timeZone]);

  const getMinimumDate = useCallback(() => {
    if (selectsEnd && startDate) {
      return startDate;
    }

    if (minDateTime != null) {
      return convertToZoneTime(minDateTime, timeZone);
    }

    return minDateTime;
  }, [minDateTime, selectsEnd, startDate, timeZone]);

  const resetOnClose = () => {
    if (`${dateValue}${timeValue}`.trim() === '') {
      setInternalDate(undefined);
    }
    setCloseDrop(undefined);
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
      minimumValue: getMinimumDate()?.getTime(),
      maximumValue: getMaximumDate()?.getTime(),
      timeZone: timeZone,
      dateFormat: format.dateFormat,
      timeString: timeValue,
      timeFormat: format.timeFormat,
    };
    setErrorValue(getErrors(dateValObj));
  }, [timeZone, dateValue, timeValue, format, getMinimumDate, getMaximumDate]);

  return (
    <ReactDatePickerWrapper
      closeDropdown={closeDrop}
      customInput={(
        <DateTimeInput
          dateFormat={format.dateFormat}
          dateOnly={dateOnly}
          dateValue={dateValue}
          disabled={disabled}
          errorValue={errorValue}
          label={label}
          name={name}
          setDateValue={setDateValue}
          setTimeValue={setTimeValue}
          timeFormat={format.timeFormat}
          timeValue={timeValue}
        />
      )}
      dateFormat={format.dateFormat}
      disabled={disabled}
      endDate={endDate}
      maxDate={getMaximumDate()}
      minDate={getMinimumDate()}
      onCalendarClose={resetOnClose}
      onCalendarOpen={onCalendarOpen}
      onChange={onChangeReactDP}
      onClickOutside={onClickOutside}
      openDate={openDate}
      required={required}
      selectedDate={internalDate}
      selectsEnd={selectsEnd}
      selectsStart={selectsStart}
      shouldDisplayTimeColumn={!dateOnly}
      startDate={startDate}
      timeFormat={format.timeFormat}
    />
  );
};

DateTimePicker.displayName = 'DateTime Picker';

export default DateTimePicker;
