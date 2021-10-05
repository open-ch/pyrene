import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import ReactDPWrapper from './ReactDatePickerWrapper/ReactDatePickerWrapper';
import DateTimeInput from './DateTimeInput/DateTimeInput';

import {
  getFutureDate, customDateFormat,
  isValidDate, isValidTime, convertToUTCtime, convertToZoneTime,
  customStringToDate, getDateType, getTimeType, getErrors,
  hasDateError, hasTimeError, getClientTimeZone, DateLength,
} from '../../utils/DateUtils';


type OnFunction = (value?: number) => void;

export interface DateTimePickerProps{
  /**
   * Calendar is opened on input component render
   */
  calendarOpened?: boolean,
  /**
   * Close calendar on date select
   */
  closeOnSelect?: boolean,
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
   * Display the component inline
   */
  inline?: boolean,
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
   * Function to handle onBlur event
   */
  onBlur?: () => OnFunction,
  /**
   * Calendar open callback
   */
  onCalendarOpen?: () => void,
  /**
   * Click outside componet callback
   */
  onClickOutside?(event: React.MouseEvent<HTMLDivElement>): void,
  /**
  * Function to handle onChange event
  */
  onChange: OnFunction,
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
  timeStamp?: number | null
  /**
   * This is must be a IANA time zone string
   */
  timeZone?: string,
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  calendarOpened,
  closeOnSelect = true,
  dateFormat = 'dd.MM.yyyy',
  dateOnly = false,
  endDate,
  inline = false,
  label,
  maxDateTime = getFutureDate({ years: 1 }),
  minDateTime = 0,
  name,
  onCalendarOpen,
  onChange,
  onClickOutside,
  selectEnd,
  selectStart,
  startDate,
  timeFormat = ' HH:mm',
  timeStamp,
  timeZone,
}: DateTimePickerProps) => {

  const [internalDate, setInternalDate] = useState<Date | undefined>();

  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  const [invalidTimestamp, setInvalidTimestamp] = useState(false);
  const [errorValue, setErrorValue] = useState('');

  const [internaltTz, setTimezone] = useState('');

  useEffect(() => {
    setTimezone(timeZone || getClientTimeZone());
  }, [timeZone]);

  // Sets internal date and passes validated value to parent
  const handleOn = useCallback((dateString: string, timeString: string, onFunction?: OnFunction) => {
    const date = getDateType(dateString, dateFormat);
    const time = getTimeType(timeString, timeFormat);

    const validDateState = isValidDate(date);
    const validTimeState = isValidTime(time);

    if (dateOnly && date && validDateState) {
      setInternalDate(convertToUTCtime(customStringToDate(dateString, dateFormat), internaltTz));
      if (onFunction) {
        onFunction(convertToUTCtime(customStringToDate(dateString, dateFormat), internaltTz).valueOf());
      }
    } else if (!dateOnly && date && time && validDateState && validTimeState) {
      setInternalDate(convertToUTCtime(customStringToDate(`${dateString}${timeString}`, `${dateFormat}${timeFormat}`), internaltTz));
      if (onFunction) {
        onFunction(convertToUTCtime(customStringToDate(`${dateString}${timeString}`, `${dateFormat}${timeFormat}`), internaltTz).valueOf());
      }
    } else {
      setInternalDate(undefined);

      if (onFunction) {
        onFunction(undefined);
      }
    }
  }, [dateFormat, dateOnly, internaltTz, timeFormat]);

  const handleDateChange = (dateString: string) => {
    if (dateString.length === DateLength.DATE_ONLY) {
      const newdate = getDateType(dateString, dateFormat);
      if (newdate) {
        setDateValue(dateString);

        if (dateOnly) {
          handleOn(dateString, '00:00', onChange);
        } else if (!dateOnly && timeValue != null) {
          handleOn(dateString, timeValue, onChange);
        }
      }
    }
  };

  const handleTimeChange = (timeString: string) => {
    if (timeString.length === DateLength.TIME_VALUE) {
      const newtime = getTimeType(timeString, timeFormat);

      if (newtime) {
        setTimeValue(timeString);
        handleOn(dateValue, timeString, onChange);
      }
    }
  };

  // Handle changes from react datepicker
  const onChangeReactDP = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined): void => {
    if (date && (event?.type === 'click' || (event?.type === 'keydown' && (event as React.KeyboardEvent).key.length > 1))) {
      if (!Array.isArray(date)) {
        handleDateChange(customDateFormat(date, dateFormat));
      }
    } else if (event?.type === 'change') {
      // This gets triggered when typing in the DateTimeInput component attached to the reactdatepicker calendar
      const node = event?.target as HTMLInputElement;

      handleDateChange(node.value.substring(0, DateLength.DATE_ONLY));
      handleTimeChange(node.value.substring(DateLength.DATE_ONLY));
    } else if (event === undefined && !Array.isArray(date) && date !== null) {
      /** reactdatepicker currently emits an undefined event when the time list is clicked on.
       * Here we are relying on the time click event being 'undefined' as a temporary means to access time value
      */
      handleTimeChange(customDateFormat(date, timeFormat));
    } else {
      setInternalDate(undefined);
    }
  };

  // Update date and time string values if internal date object is changed
  useEffect(() => {
    if (internalDate) {
      const dateString = customDateFormat(internalDate, dateFormat);
      const timeString = customDateFormat(internalDate, timeFormat);

      setDateValue(dateString);
      if (!dateOnly) {
        setTimeValue(timeString);
      }
    }
  }, [dateFormat, dateOnly, internalDate, timeFormat]);

  // Update date and time string values if timstamp is changed
  useEffect(() => {
    if (typeof timeStamp === 'number') {
      const dateObj = new Date(timeStamp);
      if (!Number.isNaN(dateObj.valueOf())) {
        setInternalDate(convertToZoneTime(timeStamp, internaltTz));
        setInvalidTimestamp(false);
      } else {
        setInternalDate(undefined);
        setInvalidTimestamp(true);
      }
    } else if (typeof timeStamp === 'undefined') {
      setInternalDate(undefined);
      setInvalidTimestamp(false);

      setDateValue('');
      setTimeValue('');
    }
  }, [timeStamp, internaltTz]);

  // Set error values on changes in component
  useEffect(() => {
    const dateValObj = {
      dateString: dateValue,
      isDateInvalid: hasDateError({ dateString: dateValue, dateFormat: dateFormat }),
      isTimeInvalid: hasTimeError(timeValue, timeFormat),
      minimumValue: minDateTime,
      maximumValue: maxDateTime,
      timeZone: internaltTz,
      dateFormat: dateFormat,
    };
    setErrorValue(getErrors(dateValObj));
  }, [maxDateTime, minDateTime, internaltTz, dateValue, timeValue, dateFormat, timeFormat]);

  return (
    <>
      <ReactDPWrapper
        closeOnSelect={closeOnSelect}
        dateFormat={dateFormat}
        dateOnly={dateOnly}
        endDate={endDate}
        endRange={selectEnd}
        CustomInput={(
          <DateTimeInput
            dateFormat={dateFormat}
            dateOnly={dateOnly}
            dateValue={dateValue}
            disabled={invalidTimestamp}
            timeValue={timeValue}
            errorValue={errorValue}
            label={label}
            name={name}
            setDateValue={setDateValue}
            setTimeValue={setTimeValue}
            timeFormat={timeFormat}
          />
        )}
        inline={inline}
        isOpen={calendarOpened}
        maxDate={convertToUTCtime(maxDateTime, internaltTz)}
        minDate={convertToUTCtime(minDateTime, internaltTz)}
        onCalendarOpen={onCalendarOpen}
        onChange={onChangeReactDP}
        onClickOutside={onClickOutside}
        openDate={internalDate}
        selectedDate={internalDate}
        shouldDisplayTimeColumn={!dateOnly}
        startDate={startDate}
        startRange={selectStart}
        timeFormat={timeFormat}
      />
    </>
  );
};

DateTimePicker.displayName = 'DateTime Picker';

export default DateTimePicker;
