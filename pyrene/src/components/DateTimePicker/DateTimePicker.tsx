import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import ReactDPWrapper from './ReactDatePickerWrapper/ReactDatePickerWrapper';
import DateTimeInput from './DateTimeInput/DateTimeInput';

import {
  getFutureDate, standardEUDateFormat, standardEUTimeFormat,
  isValidDate, isValidTime, isValidTimeZone, convertToDateTypeObject, convertToTimeTypeObject,
  convertToUTCtime, convertToZoneTime, convertDateTypeToString, convertTimeTypeToString, dateTypeToStandardEUDateFormat,
  getDateTypeFromddmmyyyyWithSep, getTimeTypeFromhhmmWithSep, getErrors, convertToJsDate,
  errorDateBool, errorTimeBool,
} from '../../utils/DateUtils';


type OnFunction = (value?: number) => void;

export interface DateTimeInputProps{
  /**
   * Boolean to control time display
   */
  dateOnly?: boolean,
  endDate?: Date,
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
  range?: boolean,
  /**
   * This is a unix timestamp, which is the number of seconds that have elapsed since Unix epoch
   */
  timeStamp?: number | [number, number] | null
  /**
   * This is must be a IANA time zone string
   */
  timeZone?: string,
  /**
   * Function to handle onBlur event
   */
  onBlur?: () => OnFunction,
  /**
   * Function to handle onChange event
   */
  onChange: OnFunction,
  selectStart?: boolean,
  selectEnd?: boolean,
  startDate?: Date,
  setStartDate?: (date: Date) => void,
  setEndDate?: (date: Date) => void,
}

const DateTimePicker: React.FC<DateTimeInputProps> = ({
  dateOnly = false,
  endDate,
  label,
  maxDateTime = getFutureDate({ years: 1 }),
  minDateTime = 0,
  name,
  onBlur,
  onChange,
  range = false,
  selectEnd,
  selectStart,
  setEndDate = () => {},
  setStartDate = () => {},
  startDate,
  timeStamp,
  timeZone = 'Europe/Zurich',
}: DateTimeInputProps) => {

  const [internalDate, setInternalDate] = useState<Date | undefined>();

  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');


  const [timeZoneValue, setTimeZoneValue] = useState(timeZone);

  const [invalidTimestamp, setInvalidTimestamp] = useState(false);
  const [invalidTimeZone, setInvalidTimeZone] = useState(false);

  const [errorValue, setErrorValue] = useState('');

  const handleOn = useCallback((dateString: string, timeString: string, onFunction?: OnFunction) => {
    const isDateLongEnough = dateString.length === 10;
    const isTimeLongEnough = timeString.length === 5;

    console.log('choice ', isDateLongEnough, ' ', isTimeLongEnough);

    if (isDateLongEnough && isTimeLongEnough) {
      const date = getDateTypeFromddmmyyyyWithSep(dateString);
      const time = getTimeTypeFromhhmmWithSep(timeString);

      const validDateState = isValidDate(date);
      const validTimeState = isValidTime(time);

      if (onFunction) {
        if (date && time && validDateState && validTimeState) {
          setInternalDate(convertToUTCtime(`${convertDateTypeToString(date)} ${convertTimeTypeToString(time)}`, timeZoneValue));
          onFunction(convertToUTCtime(`${convertDateTypeToString(date)} ${convertTimeTypeToString(time)}`, timeZoneValue).valueOf());
        } else {
          onFunction(undefined);
        }
      }
    } else {
      setInternalDate(undefined);

      if (onFunction) {
        onFunction(undefined);
      }
    }
  }, [timeZoneValue]);

  const onChangeReactDP = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined): void => {
    console.log(event?.type);
    console.log(date);


    if (date && (event?.type === 'click' || (event?.type === 'keydown' && (event as React.KeyboardEvent).key.length > 1))) {
      if (!Array.isArray(date)) {
        setDateValue(standardEUDateFormat(date));

        if (dateOnly) {
          handleOn(standardEUDateFormat(date), '00:00', onChange);
        } else if (timeValue && timeValue !== '') {
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
          } else if (timeValue && timeValue !== '') {
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

  useEffect(() => {
    if (typeof timeStamp === 'number') {
      const dateObj = new Date(timeStamp);
      if (!Number.isNaN(dateObj.valueOf())) {
        setInternalDate(convertToZoneTime(timeStamp, timeZoneValue));
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
  }, [timeStamp, timeZoneValue]);

  useEffect(() => {
    if (isValidTimeZone(timeZone)) {
      setTimeZoneValue(timeZone);
      setInvalidTimeZone(false);
    } else {
      setInvalidTimeZone(true);
    }
  }, [timeZone]);

  useEffect(() => {
    setErrorValue(getErrors(errorDateBool(dateValue), errorTimeBool(timeValue), dateValue, minDateTime, maxDateTime, timeZone));
  }, [invalidTimestamp, invalidTimeZone, maxDateTime, minDateTime, timeZone, dateValue, timeValue]);

  return (
    <>
      <ReactDPWrapper
        dateOnly={dateOnly}
        endDate={endDate}
        onChange={onChangeReactDP}
        startRange={selectStart}
        endRange={selectEnd}
        selectedDate={selectEnd ? endDate : startDate}
        shouldDisplayTimeColumn={!dateOnly}
        startDate={startDate}
        CustomInput={(
          <DateTimeInput
            dateValue={dateValue}
            // handleOn={handleOn}
            timeValue={timeValue}
            errorValue={errorValue}
            invalidTimestamp={invalidTimestamp}
            label={label}
            name={name}
            onBlur={onBlur}
            range={range}
            setDateValue={setDateValue}
            setTimeValue={setTimeValue}
            dateOnly={dateOnly}

          />
        )}
      />
    </>
  );
};

DateTimePicker.displayName = 'DateTime Picker';

export default DateTimePicker;
