import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import ReactDPWrapper from './ReactDatePickerWrapper/ReactDatePickerWrapper';
import DateTimeInput from './DateTimeInput/DateTimeInput';

import {
  getFutureDate, standardEUDateFormat, standardEUTimeFormat,
  isValidDate, isValidTime, convertToUTCtime, convertToZoneTime,
  convertDateTypeToString, convertTimeTypeToString, dateTypeToStandardEUDateFormat,
  getDateTypeFromddmmyyyyWithSep, getTimeTypeFromhhmmWithSep, getErrors,
  errorDateBool, errorTimeBool, getClientTimeZone,
} from '../../utils/DateUtils';


type OnFunction = (value?: number) => void;

export interface DateTimePickerProps{
  calendarOpened?: boolean,
  closeOnSelect?: boolean,
  customCalendar?: (props:{
    children: React.ReactNode[]
  }) => React.ReactNode,
  /**
   * Boolean to toggle time display
   */
  dateOnly?: boolean,
  /**
   * This is a Date object that represents the end date of the component
   */
  endDate?: Date,
  inline?: boolean,
  /**
   * This is a string that represents the label of the component
   */
  label?: string,
  /**
   * This is a timestamp that represents the maximum date allowed by the component
   */
  maxDateTime?: number,
  /**
   * This is a timestamp that represents the minimum date allowed by the component
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
  onCalendarOpen?: () => void,
  onClickOutside?(event: React.MouseEvent<HTMLDivElement>): void,
  /**
  * Function to handle onChange event
  */
  onChange: OnFunction,
  /**
   * This is a string array that represents the start and end labels of the component
   */
  range?: boolean,
  /**
   * Boolean to indicate if this input selects the end date of a range
   */
  selectEnd?: boolean,
  /**
  * Boolean to indicate if this input selects the start date of a range
  */
  selectStart?: boolean,
  /**
  * This is a Date object that represents the start date of the component
  */
  startDate?: Date,
  /**
   * This is a unix timestamp, which is the number of seconds that have elapsed since Unix epoch
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
  customCalendar,
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
    const date = getDateTypeFromddmmyyyyWithSep(dateString);
    const time = getTimeTypeFromhhmmWithSep(timeString);

    const validDateState = isValidDate(date);
    const validTimeState = isValidTime(time);

    if (dateOnly && date && validDateState) {
      setInternalDate(convertToUTCtime(`${convertDateTypeToString(date)}`, internaltTz));
      if (onFunction) {
        onFunction(convertToUTCtime(`${convertDateTypeToString(date)}`, internaltTz).valueOf());
      }
    } else if (!dateOnly && date && time && validDateState && validTimeState) {
      setInternalDate(convertToUTCtime(`${convertDateTypeToString(date)} ${convertTimeTypeToString(time)}`, internaltTz));
      if (onFunction) {
        onFunction(convertToUTCtime(`${convertDateTypeToString(date)} ${convertTimeTypeToString(time)}`, internaltTz).valueOf());
      }
    } else {
      setInternalDate(undefined);

      if (onFunction) {
        onFunction(undefined);
      }
    }
  }, [dateOnly, internaltTz]);

  const handleDateChange = (dateString: string) => {
    if (dateString.length >= 10) {
      const newdate = getDateTypeFromddmmyyyyWithSep(dateString || '');
      if (newdate) {
        setDateValue(dateTypeToStandardEUDateFormat(newdate));

        if (dateOnly) {
          handleOn(dateTypeToStandardEUDateFormat(newdate), '00:00', onChange);
        } else if (!dateOnly && timeValue !== '') {
          handleOn(dateTypeToStandardEUDateFormat(newdate), timeValue, onChange);
        }
      }
    }
  };

  const handleTimeChange = (timeString: string) => {
    if (timeString.length >= 5) {
      const newtime = getTimeTypeFromhhmmWithSep(timeString.trim() || '');

      if (newtime) {
        setTimeValue(convertTimeTypeToString(newtime));
        handleOn(dateValue, convertTimeTypeToString(newtime), onChange);
      }
    }
  };

  // Handle changes from react datepicker
  const onChangeReactDP = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined): void => {
    if (date && (event?.type === 'click' || (event?.type === 'keydown' && (event as React.KeyboardEvent).key.length > 1))) {
      if (!Array.isArray(date)) {
        handleDateChange(standardEUDateFormat(date));
      }
    } else if (event?.type === 'change') {
      // This gets triggered when typing in the DateTimeInput component attached to the reactdatepicker calendar
      const node = event?.target as HTMLInputElement;

      handleDateChange(node.value.substring(0, 10));
      handleTimeChange(node.value.substring(9));
    } else if (event === undefined && !Array.isArray(date) && date !== null) {
      /** reactdatepicker currently emits an undefined event when the time list is clicked on.
       * Here we are relying on the time click event being 'undefined' as a temporary means to access time value
      */
      handleTimeChange(standardEUTimeFormat(date));
    } else {
      setInternalDate(undefined);
    }
  };

  // Update date and time string values if internal date object is changed
  useEffect(() => {
    if (internalDate) {
      const dateString = standardEUDateFormat(internalDate);
      const timeString = standardEUTimeFormat(internalDate);

      setDateValue(dateString);
      if (!dateOnly) {
        setTimeValue(timeString);
      }
    }
  }, [dateOnly, internalDate]);

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
    setErrorValue(getErrors(errorDateBool(dateValue), errorTimeBool(timeValue), dateValue, minDateTime, maxDateTime, internaltTz));
  }, [maxDateTime, minDateTime, internaltTz, dateValue, timeValue]);

  return (
    <>
      <ReactDPWrapper
        closeOnSelect={closeOnSelect}
        customCalendar={customCalendar}
        dateOnly={dateOnly}
        endDate={endDate}
        endRange={selectEnd}
        CustomInput={(
          <DateTimeInput
            dateValue={dateValue}
            disabled={invalidTimestamp}
            handleOn={(datestring, timestring) => handleOn(datestring, timestring, onChange)}
            timeValue={timeValue}
            errorValue={errorValue}
            label={label}
            name={name}
            setDateValue={setDateValue}
            setTimeValue={setTimeValue}
            dateOnly={dateOnly}
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
      />
    </>
  );
};

DateTimePicker.displayName = 'DateTime Picker';

export default DateTimePicker;
