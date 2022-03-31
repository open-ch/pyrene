import React, {
  useCallback, useEffect, useState,
} from 'react';

import ReactDatePickerWrapper from './ReactDatePickerWrapper/ReactDatePickerWrapper';
import DateTimeInput from './DateTimeInput/DateTimeInput';

import {
  customDateFormat, convertToUTCtime, convertToZoneTime, customStringToDate,
  getErrors, hasDateError, hasTimeError, hasSeparatorError, getClientTimeZone, getFormat, DateTimeLocale, Format,
} from '../../utils/DateUtils';

type OnFunction = (value?: number) => void;
interface DateObject {
  dateString: string;
  separatorString: string;
  timeString: string;
}

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
  const [separatorValue, setSeparatorValue] = useState('');
  const [errorValue, setErrorValue] = useState('');

  const [closeDrop, setCloseDrop] = useState<boolean>();

  const containsSeparator = (s: string) => s.includes(format.separatorFormat);

  // Sets internal date and passes validated value to parent
  const handleCallback = useCallback((dateObj: DateObject, callback?: OnFunction) => {
    const date = customStringToDate(dateObj.dateString, format.dateFormat);
    const time = customStringToDate(dateObj.timeString, format.timeFormat);

    if (dateOnly && !Number.isNaN(date.getTime())) {
      const zoneDate = convertToZoneTime(date, timeZone);
      const utcDate = convertToUTCtime(date, timeZone);
      setInternalDate(zoneDate);
      callback?.(utcDate.getTime());

      setCloseDrop(true);
    } else if (!dateOnly && !Number.isNaN(date.getTime()) && !Number.isNaN(time.getTime())) {
      const dateTime = customStringToDate(`${dateObj.dateString}${dateObj.separatorString}${dateObj.timeString}`, `${format.dateFormat}${format.separatorFormat}${format.timeFormat}`);
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

  const handleDateAndTimeChange = (customDateString?: string, customSeparatorString?: string, customTimeString?: string) => {
    if (customTimeString && customSeparatorString) {
      setSeparatorValue(customSeparatorString);
      setTimeValue(customTimeString);
    }

    if (customDateString) {
      setDateValue(customDateString);
      if (dateOnly) {
        handleCallback({ dateString: customDateString, timeString: '', separatorString: '' }, onChange);
      } else if (customTimeString && format.timeRegex.test(customTimeString) && format.dateRegex.test(customDateString) && (customSeparatorString && !hasSeparatorError(customSeparatorString, format))) {
        handleCallback({ dateString: customDateString, timeString: customTimeString, separatorString: customSeparatorString }, onChange);
      }
    }
  };

  // Handle changes from react datepicker
  const onChangeReactDP = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined): void => {
    if (date && (event?.type === 'click' || (event?.type === 'keydown' && (event as React.KeyboardEvent).key.length > 1))) {
      if (!Array.isArray(date)) {
        const dateString = customDateFormat(date, format.dateFormat);
        const timeString = (!dateOnly && timeValue.length > 0 && customDateFormat(date, format.timeFormat)?.includes(timeValue)) ?  customDateFormat(date, format.timeFormat) : timeValue;
        handleDateAndTimeChange(dateString, format.separatorFormat, timeString);
      }
    } else if (event?.type === 'change') {
      // This gets triggered when typing in the DateTimeInput component attached to the reactdatepicker calendar
      const node = event?.target as HTMLInputElement;
      const formatLength = dateOnly ? format.dateFormat.length : (format.dateFormat.length + format.separatorFormat.length + format.timeFormat.length);

      if (node.value.length === formatLength) {
        const dateString = customDateFormat(node.value.substring(0, format.dateFormat.length), format.dateFormat);
        const timeString = customDateFormat(node.value.substring(format.dateFormat.length + format.separatorFormat.length), format.timeFormat);
        const separatorString = node.value.substring(format.dateFormat.length, format.dateFormat.length + format.separatorFormat.length);

        handleDateAndTimeChange(dateString, separatorString, timeString);
      } else if (node.value.length === 0) {
        setInternalDate(undefined);
      }
    } else if (event === undefined && !Array.isArray(date) && date !== null) {
      /** reactdatepicker currently emits an undefined event when the time list is clicked on.
       * Here we are relying on the time click event being 'undefined' as a temporary means to access time value
      */
      const separator = containsSeparator(dateValue) ? '' : format.separatorFormat;
      handleDateAndTimeChange(dateValue || customDateFormat(date, format.dateFormat), separator, customDateFormat(date, format.timeFormat));
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
      onChange?.(undefined);
    } else if (!dateOnly && !timeValue && customDateFormat(dateValue, format.dateFormat)) {
      const selectedDate = customDateFormat(dateValue, format.dateFormat);
      if (selectedDate) {
        const timeInput = customDateFormat(selectedDate, format.timeFormat);
        handleDateAndTimeChange(selectedDate, format.separatorFormat, timeInput || '00:00');
      } else if (!dateOnly && dateValue && timeValue && separatorValue) {
        handleDateAndTimeChange(dateValue, separatorValue, timeValue);
      }
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
          setSeparatorValue(format.separatorFormat);
          setTimeValue(timeString);
        }
      }
    }
  }, [dateOnly, format.separatorFormat, format.dateFormat, format.timeFormat, internalDate]);

  // Update date and time string values if timestamp is changed
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
      setSeparatorValue('');
      setTimeValue('');
    }
  }, [timeStamp, timeZone]);

  // Set error values on changes in component
  useEffect(() => {
    const minDateValue = getMinimumDate();
    const maxDateValue = getMaximumDate();
    const dateValObj = {
      dateString: dateValue,
      isDateInvalid: hasDateError({ dateString: dateValue, format: format }),
      isTimeInvalid: hasTimeError(timeValue, format),
      isSeparatorInvalid: hasSeparatorError(separatorValue, format),
      minimumValue: (minDateValue instanceof Date) ? minDateValue.getTime() : minDateValue,
      maximumValue: (maxDateValue instanceof Date) ? maxDateValue.getTime() : maxDateValue,
      separator: separatorValue,
      timeZone: timeZone,
      timeString: timeValue,
      format: format,
    };
    setErrorValue(getErrors(dateValObj));
  }, [timeZone, dateValue, timeValue, format, getMinimumDate, getMaximumDate, separatorValue]);

  return (
    <ReactDatePickerWrapper
      closeDropdown={closeDrop}
      customInput={(
        <DateTimeInput
          dateOnly={dateOnly}
          dateTimeFormat={format}
          dateValue={dateValue}
          disabled={disabled}
          errorValue={errorValue}
          label={label}
          name={name}
          separatorValue={separatorValue}
          setDateValue={setDateValue}
          setSeparatorValue={setSeparatorValue}
          setTimeValue={setTimeValue}
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
      timeFormat={`${format.separatorFormat}${format.timeFormat}`}
    />
  );
};

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
