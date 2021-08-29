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
  errorDateBool, errorTimeBool,
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
  tabNum?: number,
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
  range = false,
  selectEnd,
  selectStart,
  startDate,
  tabNum,
  timeStamp,
  timeZone = 'Europe/Zurich',
}: DateTimePickerProps) => {

  const [internalDate, setInternalDate] = useState<Date | undefined>();

  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  const [invalidTimestamp, setInvalidTimestamp] = useState(false);
  const [errorValue, setErrorValue] = useState('');

  // Sets internal date and passes validated value to parent
  const handleOn = useCallback((dateString: string, timeString: string, onFunction?: OnFunction) => {
    const date = getDateTypeFromddmmyyyyWithSep(dateString);
    const time = getTimeTypeFromhhmmWithSep(timeString);

    const validDateState = isValidDate(date);
    const validTimeState = isValidTime(time);


    if (dateOnly && date && validDateState) {
      setInternalDate(convertToUTCtime(`${convertDateTypeToString(date)}`, timeZone));
      if (onFunction) {
        onFunction(convertToUTCtime(`${convertDateTypeToString(date)}`, timeZone).valueOf());
      }
    } else if (!dateOnly && date && time && validDateState && validTimeState) {
      setInternalDate(convertToUTCtime(`${convertDateTypeToString(date)} ${convertTimeTypeToString(time)}`, timeZone));
      if (onFunction) {
        onFunction(convertToUTCtime(`${convertDateTypeToString(date)} ${convertTimeTypeToString(time)}`, timeZone).valueOf());
      }
    } else {
      setInternalDate(undefined);

      if (onFunction) {
        onFunction(undefined);
      }
    }
  }, [dateOnly, timeZone]);

  // Handle changes from react datepicker
  const onChangeReactDP = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined): void => {
    if (date && (event?.type === 'click' || (event?.type === 'keydown' && (event as React.KeyboardEvent).key.length > 1))) {
      if (!Array.isArray(date)) {
        setDateValue(standardEUDateFormat(date));

        if (dateOnly) {
          handleOn(standardEUDateFormat(date), '00:00', onChange);
        } else if (!dateOnly && timeValue && timeValue !== '') {
          handleOn(standardEUDateFormat(date), timeValue, onChange);
        }
      }
    } else if (event?.type === 'change') {
      const node = event?.target as HTMLInputElement;
      const isDateLongEnough = node?.value.length >= 10;
      const isTimeLongEnough = node?.value.length >= 16;

      if (isDateLongEnough) {
        const newdate = getDateTypeFromddmmyyyyWithSep(node?.value.substring(0, 10) || '');

        if (newdate) {
          setDateValue(dateTypeToStandardEUDateFormat(newdate));

          if (dateOnly) {
            handleOn(dateTypeToStandardEUDateFormat(newdate), '00:00', onChange);
          } else if (!dateOnly && timeValue && timeValue !== '') {
            handleOn(dateTypeToStandardEUDateFormat(newdate), timeValue, onChange);
          }
        }
      }

      if (!dateOnly && isTimeLongEnough) {
        const newdate = getDateTypeFromddmmyyyyWithSep(node?.value.substring(0, 10) || '');
        const newtime = getTimeTypeFromhhmmWithSep(node?.value.substring(10).trim() || '');

        if (newdate && newtime) {
          setTimeValue(convertTimeTypeToString(newtime));
          handleOn(dateValue, convertTimeTypeToString(newtime), onChange);
        }
      }
    } else if (event === undefined && !Array.isArray(date) && date !== null) { // This is relying on the time click event being 'undefined' temporary fix for access to time value
      setTimeValue(standardEUTimeFormat(date));

      const ldate = getDateTypeFromddmmyyyyWithSep(dateValue);
      if (ldate) {
        handleOn(dateTypeToStandardEUDateFormat(ldate), standardEUTimeFormat(date), onChange);
      }
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
        setInternalDate(convertToZoneTime(timeStamp, timeZone));
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
  }, [timeStamp, timeZone]);

  // Set error values on changes in component
  useEffect(() => {
    setErrorValue(getErrors(errorDateBool(dateValue), errorTimeBool(timeValue), dateValue, minDateTime, maxDateTime, timeZone));
  }, [maxDateTime, minDateTime, timeZone, dateValue, timeValue]);

  const selectedDate = () => {
    if (selectEnd) {
      return endDate;
    }
    if (startDate) {
      return startDate;
    }
    return internalDate;
  };

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
            handleOn={(datestring, timestring) => handleOn(datestring, timestring, onChange)}
            timeValue={timeValue}
            errorValue={errorValue}
            invalidTimestamp={invalidTimestamp}
            label={label}
            name={name}
            range={range}
            setDateValue={setDateValue}
            setTimeValue={setTimeValue}
            tabNum={tabNum}
            dateOnly={dateOnly}
          />
        )}
        inline={inline}
        isOpen={calendarOpened}
        maxDate={convertToUTCtime(maxDateTime, timeZone)}
        minDate={convertToUTCtime(minDateTime, timeZone)}
        onCalendarOpen={onCalendarOpen}
        onChange={onChangeReactDP}
        onClickOutside={onClickOutside}
        selectedDate={selectedDate()}
        shouldDisplayTimeColumn={!dateOnly}
        startDate={startDate}
        startRange={selectStart}
      />
    </>
  );
};

DateTimePicker.displayName = 'DateTime Picker';

export default DateTimePicker;
