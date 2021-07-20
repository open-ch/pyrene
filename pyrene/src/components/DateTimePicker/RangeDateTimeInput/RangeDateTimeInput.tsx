import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  convertDateTypeToString,
  convertTimeTypeToString,
  convertToDateTypeObject,
  convertToTimeTypeObject,
  convertToUTCtime,
  convertToZoneTime,
  DateType,
  dateTypeToStandardEUDateFormat,
  getDateTypeFromddmmyyyyWithSep,
  getFutureDate,
  getTimeTypeFromhhmmWithSep,
  isValidDate, isValidTime, isValidTimeZone, standardEUDateFormat, standardEUTimeFormat, TimeType,
} from '../../../utils/DateUtils';
import DateTimeInput from '../DateTimeInput/DateTimeInput';

import styles from './RangeDateTimeRangeInput.css';

type OnFunction = (value?: number | [number, number] | null) => void;

export interface RangeProps {
  startDate?: Date,
  startDateValue?: string,
  endDateValue?: string,
  startTimeValue?: string,
  endTimeValue?: string,
  labels?: [string, string],
  dateOnly?: boolean,
  errorValue?: string,
  handleOn?: () => void,
  invalidTimestamp?: boolean,
  name?: string,
  onBlur?: () => void,
  // onChange?: (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined, rangePos?: string) => void,
  onChange?: OnFunction,
  setEndDateValue?: () => void,
  setEndTimeValue?: () => void,
  setStartDateValue?: () => void,
  setStartTimeValue?: () => void,
  setFocusedRef?: (ref: React.RefObject<HTMLInputElement>) => void,
  /**
   * This is a unix timestamp, which is the number of seconds that have elapsed since Unix epoch
   */
  timeStamps?: [number, number] | null,
  timeZone?: string,
  /**
   * This is a timestamp that represents the maximum date allowed by the component
   */
  maxDateTime?: number,
  /**
   * This is a timestamp that represents the minimum date allowed by the component
   */
  minDateTime?: number,
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

const RangeDateTimeRangeInput: React.FC<RangeProps> = ({
  name = '',
  labels = ['Von', 'Bis'],
  onBlur = () => {},
  onChange = () => {},
  dateOnly = false,
  timeStamps,
  timeZone = 'Europe/Zurich',
  maxDateTime = getFutureDate({ years: 1 }),
  minDateTime = 0,
}: RangeProps) => {

  const [focusedInput, setFocusedInput] = useState<React.RefObject<HTMLInputElement>>();

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);


  const [startDateValue, setStartDateValue] = useState('');
  const [startTimeValue, setStartTimeValue] = useState('');

  const [endDateValue, setEndDateValue] = useState('');
  const [endTimeValue, setEndTimeValue] = useState('');

  const [timeZoneValue, setTimeZoneValue] = useState(timeZone);

  const [jsDateObject, setJsDateObject] = useState<Date | undefined>(undefined);

  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidTime, setInvalidTime] = useState(false);
  const [invalidTimestamp, setInvalidTimestamp] = useState(false);
  const [invalidTimeZone, setInvalidTimeZone] = useState(false);

  const [errorValue, setErrorValue] = useState('');

  const handleOn = useCallback((dateString:string, timeString:[string, string], onFunction?: OnFunction) => {
    const isDateLongEnough = dateString.length === 10;
    const isStartTimeLongEnough = timeString[0].length === 5;
    const isEndTimeLongEnough = timeString[1].length === 5;

    if (isDateLongEnough && isStartTimeLongEnough && isEndTimeLongEnough) {
      const date = getDateTypeFromddmmyyyyWithSep(dateString);
      const starttime = getTimeTypeFromhhmmWithSep(timeString[0]);
      const endtime = getTimeTypeFromhhmmWithSep(timeString[1]);

      const validDateState = isValidDate(date);
      const validStartTimeState = isValidTime(starttime);
      const validEndTimeState = isValidTime(endtime);

      setInvalidDate(!validDateState);
      setInvalidTime(!validStartTimeState);

      if (onFunction) {
        if (date && starttime && endtime && validDateState && validStartTimeState && validEndTimeState) {
          onFunction([convertToUTCtime(`${convertDateTypeToString(date)} ${convertTimeTypeToString(starttime)}`, timeZoneValue).valueOf(), convertToUTCtime(`${convertDateTypeToString(date)} ${convertTimeTypeToString(endtime)}`, timeZoneValue).valueOf()]);
        } else {
          onFunction(null);
        }
      }
    } else {
      setInvalidDate(false);
      setInvalidTime(false);
      setJsDateObject(undefined);

      if (onFunction) {
        onFunction(null);
      }
    }
  }, [timeZoneValue]);

  const onChangeReactDP = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined, rangePos?:string): void => {
    console.log(event?.type);
    console.log(date);
    console.log(rangePos);
    console.log(startTimeValue);

    if (Array.isArray(date)) {
      const [start, end] = date;

      setEndDate(end || undefined);
      setEndDateValue(end ? standardEUDateFormat(end) : '');

      setStartDate(start || undefined);
      setStartDateValue(start ? standardEUDateFormat(start) : '');
    }




    if (date && (event?.type === 'click' || (event?.type === 'keydown' && (event as React.KeyboardEvent).key.length > 1))) {
      if (!Array.isArray(date)) {
        if (rangePos && rangePos === 'start') {
          setStartDate(date);
          setStartDateValue(standardEUDateFormat(date));
        }

        if (rangePos && rangePos === 'end') {
          setEndDate(date);
          setEndDateValue(standardEUDateFormat(date));
        }

        if (dateOnly) {
          handleOn(standardEUDateFormat(date), ['00:00', '00:00'], onChange);
        } else {
          handleOn(standardEUDateFormat(date), [startTimeValue, endTimeValue], onChange);
        }
      }
    } else if (event?.type === 'change') {
      const node = event?.target as HTMLInputElement;
      const isDateLongEnough = node?.value.length >= 10;
      const isTimeLongEnough = node?.value.length >= 16;

      console.log('value ', node?.value.length);

      if (isDateLongEnough) {
        const newdate = getDateTypeFromddmmyyyyWithSep(node?.value.substring(0, 10) || '');
        console.log('Date  : ', newdate);

        if (newdate) {
          console.log('Passed Date  : ', convertToUTCtime(convertDateTypeToString(newdate), timeZoneValue));

          if (rangePos && rangePos === 'start') {
            setStartDate(convertToUTCtime(convertDateTypeToString(newdate), timeZoneValue));
            setStartDateValue(dateTypeToStandardEUDateFormat(newdate));
          }

          if (rangePos && rangePos === 'end') {
            setEndDate(convertToUTCtime(convertDateTypeToString(newdate), timeZoneValue));
            setEndDateValue(dateTypeToStandardEUDateFormat(newdate));
          }

          if (dateOnly) {
            handleOn(dateTypeToStandardEUDateFormat(newdate), ['00:00', '00:00'], onChange);
          }
        }
      }

      if (!dateOnly && isTimeLongEnough) {
        const newdate = getDateTypeFromddmmyyyyWithSep(node?.value.substring(0, 10) || '');
        const newtime = getTimeTypeFromhhmmWithSep(node?.value.substring(10).trim() || '');

        console.log('Time  : ', newtime);

        if (newdate && newtime) {

          if (rangePos && rangePos === 'start') {
            setStartTimeValue(convertTimeTypeToString(newtime));
            setStartDate(convertToUTCtime(`${convertDateTypeToString(newdate)} ${convertTimeTypeToString(newtime)}`, timeZoneValue));
            handleOn(startDateValue, [convertTimeTypeToString(newtime), endDateValue], onChange);
          }


          if (rangePos && rangePos === 'end') {
            setEndTimeValue(convertTimeTypeToString(newtime));
            setEndDate(convertToUTCtime(`${convertDateTypeToString(newdate)} ${convertTimeTypeToString(newtime)}`, timeZoneValue));
            handleOn(startDateValue, [startTimeValue, convertTimeTypeToString(newtime)], onChange);
          }

          console.log('Entered : ', convertToUTCtime(`${convertDateTypeToString(newdate)} ${convertTimeTypeToString(newtime)}`, timeZoneValue));
        }

        console.log('Start Time : ', startDate);
        console.log('End Time : ', endDate);
      }
    } else if (event === undefined && !Array.isArray(date) && date !== null) { // This is relying on the time click event being 'undefined' temporary fix for access to time value
      console.log(date);
      console.log(focusedInput);

      if (rangePos && rangePos === 'start') {
        setStartTimeValue(standardEUTimeFormat(date));
        setStartDateValue(standardEUDateFormat(date));
      }

      if (rangePos && rangePos === 'end') {
        setEndTimeValue(standardEUTimeFormat(date));
        setEndDateValue(standardEUDateFormat(date));
      }
    } else {
      setInvalidDate(false);
      setInvalidTime(false);
      setStartDate(undefined);
      // setStart(undefined);
    }
  };

  useEffect(() => {
    if (startDate) {
      const date: DateType = convertToDateTypeObject(startDate);
      const time: TimeType = convertToTimeTypeObject(startDate);
      const dateString = standardEUDateFormat(startDate);
      const timeString = standardEUTimeFormat(startDate);

      setStartDateValue(dateString);
      setStartTimeValue(timeString);

      setInvalidDate(!isValidDate(date));
      setInvalidTime(!isValidTime(time));
    }

    if (endDate) {
      const date: DateType = convertToDateTypeObject(endDate);
      const time: TimeType = convertToTimeTypeObject(endDate);
      const dateString = standardEUDateFormat(endDate);
      const timeString = standardEUTimeFormat(endDate);

      setEndDateValue(dateString);
      setEndTimeValue(timeString);

      setInvalidDate(!isValidDate(date));
      setInvalidTime(!isValidTime(time));
    }

    if (invalidTimestamp) {
      setStartDateValue('');
      setStartTimeValue('');
      setEndDateValue('');
      setEndTimeValue('');

      setInvalidDate(false);
      setInvalidTime(false);
    }
  }, [invalidTimestamp, startDate, endDate]);

  useEffect(() => {
    if (Array.isArray(timeStamps)) {
      const fromDateObj = new Date(timeStamps[0]);
      const toDateObj = new Date(timeStamps[1]);

      if (!Number.isNaN(fromDateObj.valueOf())) {
        setStartDate(convertToZoneTime(timeStamps[0], timeZoneValue));
        setInvalidTimestamp(false);
      } else {
        setEndDate(undefined);
        setInvalidTimestamp(true);
      }

      if (!Number.isNaN(toDateObj.valueOf())) {
        setEndDate(convertToZoneTime(timeStamps[1], timeZoneValue));
        setInvalidTimestamp(false);
      } else {
        setJsDateObject(undefined);
        setInvalidTimestamp(true);
      }
    } else if (timeStamps && (typeof timeStamps[0] === 'undefined' || typeof timeStamps[1] === 'undefined')) {
      setStartDate(undefined);
      setEndDate(undefined);
      setInvalidTimestamp(false);

      setStartDateValue('');
      setStartTimeValue('');

      setEndDateValue('');
      setEndTimeValue('');

      setInvalidDate(false);
      setInvalidTime(false);
    }
  }, [timeStamps, timeZoneValue]);

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
      if (maxDateTime && jsDateObject) {
        const rangePositon = inRange(jsDateObject.valueOf(), minDateTime, maxDateTime);
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
  }, [invalidDate, invalidTime, invalidTimestamp, invalidTimeZone, jsDateObject, maxDateTime, minDateTime]);

  return (
    <>
      <div className={styles.rangeHeader}>
        <div className={styles.leftbox} onBlur={() => handleOn?.('', [startTimeValue, endTimeValue], onChange)}>
          <DateTimeInput
            dateValue={startDateValue}
            // handleOn={handleOn}
            timeValue={startTimeValue}
            errorValue={errorValue}
            invalidTimestamp={invalidTimestamp}
            label={labels?.[0] || 'From'}
            name={name}
            onBlur={onBlur}
            range={false}
            setDateValue={setStartDateValue}
            setTimeValue={setStartTimeValue}
            dateOnly={dateOnly}
            onChange={(event) => onChangeReactDP(null, event, 'start')}
          />
        </div>
        <div className={styles.rightbox} onBlur={() => handleOn?.('', [startTimeValue, endTimeValue], onChange)}>
          <DateTimeInput
            dateValue={endDateValue}
            // handleOn={handleOn}
            timeValue={endTimeValue}
            errorValue={errorValue}
            invalidTimestamp={invalidTimestamp}
            label={labels?.[1] || 'To'}
            name={name}
            onBlur={onBlur}
            range={false}
            setDateValue={setEndDateValue}
            setTimeValue={setEndTimeValue}
            dateOnly={dateOnly}
            onChange={(event) => onChangeReactDP(null, event, 'end')}
          />
        </div>
      </div>
    </>
  );

};

RangeDateTimeRangeInput.displayName = 'Range Input';

export default RangeDateTimeRangeInput;
