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
  getDateTypeFromddmmyyyyWithSep, getTimeTypeFromhhmmWithSep,
} from '../../utils/DateUtils';


type OnFunction = (value?: number) => void;

export interface DateTimeInputProps{
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

const inRange = (timestampToCheck: number, minimumValue: number, maximumValue: number): number => {
  if (timestampToCheck < minimumValue) {
    return -1;
  }
  if (timestampToCheck > maximumValue) {
    return 1;
  }
  return 0;
};


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
  selectEnd = false,
  selectStart = false,
  setEndDate = () => {},
  setStartDate = () => {},
  startDate,
  timeStamp,
  timeZone = 'Europe/Zurich',
}: DateTimeInputProps) => {

  const [internalDate, setInternalDate] = useState<Date | undefined>(startDate);

  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');


  const [timeZoneValue, setTimeZoneValue] = useState(timeZone);

  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidTime, setInvalidTime] = useState(false);
  const [invalidTimestamp, setInvalidTimestamp] = useState(false);
  const [invalidTimeZone, setInvalidTimeZone] = useState(false);

  const [errorValue, setErrorValue] = useState('');

  const handleOn = useCallback((dateString: string, timeString: string, onFunction?: OnFunction) => {
    const isDateLongEnough = dateString.length === 10;
    const isTimeLongEnough = timeString.length === 5;

    if (isDateLongEnough && isTimeLongEnough) {
      const date = getDateTypeFromddmmyyyyWithSep(dateString);
      const time = getTimeTypeFromhhmmWithSep(timeString);

      const validDateState = isValidDate(date);
      const validTimeState = isValidTime(time);
      setInvalidDate(!validDateState);
      setInvalidTime(!validTimeState);

      if (onFunction) {
        if (date && time && validDateState && validTimeState) {
          setInternalDate(convertToUTCtime(`${convertDateTypeToString(date)} ${convertTimeTypeToString(time)}`, timeZoneValue));
          onFunction(convertToUTCtime(`${convertDateTypeToString(date)} ${convertTimeTypeToString(time)}`, timeZoneValue).valueOf());
        } else {
          onFunction(undefined);
        }
      }
    } else {
      setInvalidDate(false);
      setInvalidTime(false);
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
      setInvalidDate(false);
      setInvalidTime(false);
      setInternalDate(undefined);
    }
  };

  useEffect(() => {
    if (internalDate) {
      const date = convertToDateTypeObject(internalDate);
      const time = convertToTimeTypeObject(internalDate);
      const dateString = standardEUDateFormat(internalDate);
      const timeString = standardEUTimeFormat(internalDate);

      setDateValue(dateString);
      setTimeValue(timeString);

      setInvalidDate(!isValidDate(date));
      setInvalidTime(!isValidTime(time));
    }

    if (invalidTimestamp) {
      setDateValue('');
      setTimeValue('');
      setInvalidDate(false);
      setInvalidTime(false);
    }
  }, [internalDate, invalidTimestamp]);

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
      setInvalidDate(false);
      setInvalidTime(false);
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
    const getError = () => {
      if (invalidTimestamp) {
        return 'Invalid timestamp';
      }
      if (invalidDate && invalidTime) {
        return 'Invalid date & time format';
      }
      if (invalidDate) {
        return 'Invalid date format';
      }
      if (invalidTime) {
        return 'Invalid time format';
      }
      if (maxDateTime && internalDate) {
        const rangePositon = inRange(internalDate.valueOf(), minDateTime, maxDateTime);
        if (rangePositon === -1) {
          return 'Less than minimum date.';
        }
        if (rangePositon === 1) {
          return 'Larger than maximum date.';
        }
      }

      if (invalidTimeZone) {
        const tz = 'Europe/Zurich';
        setTimeZoneValue(tz);
        return `Invalid time zone. ${tz} is being used.`;
      }
      return '';
    };

    setErrorValue(getError());
  }, [invalidDate, invalidTime, invalidTimestamp, invalidTimeZone, internalDate, maxDateTime, minDateTime]);

  return (
    <>
      <ReactDPWrapper
        endDate={endDate}
        onChange={onChangeReactDP}
        startRange={selectStart}
        endRange={selectEnd}
        selectedDate={selectEnd ? endDate : internalDate}
        shouldDisplayTimeColumn={!dateOnly}
        startDate={internalDate}
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
