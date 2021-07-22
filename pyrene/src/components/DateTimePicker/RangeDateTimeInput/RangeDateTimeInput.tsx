import React, {
  useCallback,
  useEffect,
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
  onFocus?: (value: string) => void,
  setEndDateValue?: () => void,
  setStartDate?: (date:Date | undefined) => void,
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
  onFocus = () => {},
  dateOnly = false,
  endDateValue,
  endTimeValue,
  startDateValue,
  startTimeValue,
  timeStamps,
  timeZone = 'Europe/Zurich',
  maxDateTime = getFutureDate({ years: 1 }),
  minDateTime = 0,
}: RangeProps) => {

  const [iendDate, setEndDate] = useState<Date | undefined>(undefined);
  const [istartDate, setStartDate] = useState<Date | undefined>(undefined);


  const [istartDateValue, setStartDateValue] = useState(startDateValue || '');
  const [istartTimeValue, setStartTimeValue] = useState(startTimeValue || '');

  const [iendDateValue, setEndDateValue] = useState(endDateValue || '');
  const [iendTimeValue, setEndTimeValue] = useState(endTimeValue || '');

  const [timeZoneValue, setTimeZoneValue] = useState(timeZone);

  const [invalidStartDate, setInvalidStartDate] = useState(false);
  const [invalidStartTime, setInvalidStartTime] = useState(false);
  const [invalidStartTimestamp, setInvalidStartTimestamp] = useState(false);

  const [invalidEndDate, setInvalidEndDate] = useState(false);
  const [invalidEndTime, setInvalidEndTime] = useState(false);
  const [invalidEndTimestamp, setInvalidTimestamp] = useState(false);
  const [invalidTimeZone, setInvalidTimeZone] = useState(false);

  const [errorValue, setErrorValue] = useState('');

  const handleOn = useCallback((dateString:[string, string], timeString:[string, string], onFunction?: OnFunction) => {
    const isStartDateLongEnough = dateString[0].length === 10;
    const isEndDateLongEnough = dateString[1].length === 10;

    const isStartTimeLongEnough = timeString[0].length === 5;
    const isEndTimeLongEnough = timeString[1].length === 5;

    if (isStartDateLongEnough && isEndDateLongEnough && isStartTimeLongEnough && isEndTimeLongEnough) {
      const startdate = getDateTypeFromddmmyyyyWithSep(dateString[0]);
      const enddate = getDateTypeFromddmmyyyyWithSep(dateString[1]);
      const starttime = getTimeTypeFromhhmmWithSep(timeString[0]);
      const endtime = getTimeTypeFromhhmmWithSep(timeString[1]);

      const validStartDateState = isValidDate(startdate);
      const validEndDateState = isValidDate(enddate);
      const validStartTimeState = isValidTime(starttime);
      const validEndTimeState = isValidTime(endtime);

      setInvalidStartDate(!validStartDateState);
      setInvalidStartTime(!validStartTimeState);

      if (onFunction) {
        if (startdate && enddate && starttime && endtime && validStartDateState && validEndDateState && validStartTimeState && validEndTimeState) {
          onFunction([convertToUTCtime(`${convertDateTypeToString(startdate)} ${convertTimeTypeToString(starttime)}`, timeZoneValue).valueOf(), convertToUTCtime(`${convertDateTypeToString(enddate)} ${convertTimeTypeToString(endtime)}`, timeZoneValue).valueOf()]);
        } else {
          onFunction(null);
        }
      }
    } else {
      setInvalidStartDate(false);
      setInvalidStartTime(false);
      setInvalidEndDate(false);
      setInvalidEndTime(false);
      // setStartDate(undefined);
      // setEndDate(undefined);

      if (onFunction) {
        onFunction(null);
      }
    }
  }, [timeZoneValue]);

  const onChangeReactDP = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined, rangePos?:string): void => {
    console.log(event?.type);
    console.log(date);
    console.log(rangePos);

    if (event?.type === 'change') {
      const node = event?.target as HTMLInputElement;
      const isDateLongEnough = node?.value.length === 10;
      const isTimeLongEnough = node?.value.length === 16;

      console.log('value ', node?.value.length);

      if (isDateLongEnough) {
        const newdate = getDateTypeFromddmmyyyyWithSep(node?.value.substring(0, 10) || '');
        console.log('Date  : ', newdate);

        if (newdate) {
          console.log('Passed Date  : ', convertToUTCtime(convertDateTypeToString(newdate), timeZoneValue));

          if (rangePos && rangePos === 'start') {
            setStartDate(convertToUTCtime(convertDateTypeToString(newdate), timeZoneValue));
            setStartDateValue(dateTypeToStandardEUDateFormat(newdate));


            if (iendDate) {
              if (dateOnly) {
                handleOn([dateTypeToStandardEUDateFormat(newdate), standardEUDateFormat(iendDate)], ['00:00', '00:00'], onChange);
              } else {
                handleOn([dateTypeToStandardEUDateFormat(newdate), standardEUDateFormat(iendDate)], [istartTimeValue, iendTimeValue], onChange);
              }
            }
          }

          if (rangePos && rangePos === 'end') {
            setEndDate(convertToUTCtime(convertDateTypeToString(newdate), timeZoneValue));
            setEndDateValue(dateTypeToStandardEUDateFormat(newdate));

            if (istartDate) {
              if (dateOnly) {
                handleOn([standardEUDateFormat(istartDate), dateTypeToStandardEUDateFormat(newdate)], ['00:00', '00:00'], onChange);
              } else {
                handleOn([standardEUDateFormat(istartDate), dateTypeToStandardEUDateFormat(newdate)], [istartTimeValue, iendTimeValue], onChange);
              }
            }
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
            handleOn([convertDateTypeToString(newdate), iendDateValue], [convertTimeTypeToString(newtime), iendTimeValue], onChange);
          }


          if (rangePos && rangePos === 'end') {
            setEndTimeValue(convertTimeTypeToString(newtime));
            setEndDate(convertToUTCtime(`${convertDateTypeToString(newdate)} ${convertTimeTypeToString(newtime)}`, timeZoneValue));
            handleOn([istartDateValue, convertDateTypeToString(newdate)], [istartTimeValue, convertTimeTypeToString(newtime)], onChange);
          }

          console.log('Entered : ', convertToUTCtime(`${convertDateTypeToString(newdate)} ${convertTimeTypeToString(newtime)}`, timeZoneValue));
        }

        console.log('Start Time : ', istartDate);
        console.log('End Time : ', iendDate);
      }
    } else {
      setInvalidStartDate(false);
      setInvalidStartTime(false);
      setInvalidEndDate(false);
      setInvalidEndTime(false);
      setStartDate(undefined);
      setEndDate(undefined);
    }
  };

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

      setInvalidStartDate(false);
      setInvalidStartTime(false);
      setInvalidEndDate(false);
      setInvalidEndTime(false);
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
      if (invalidStartTimestamp) {
        return 'Invalid timestamp';
      }
      if (invalidStartDate && invalidStartTime) {
        return 'Invalid date & time format';
      }
      if (invalidStartDate) {
        return 'Invalid date format';
      }
      if (invalidStartTime) {
        return 'Invalid time format';
      }

      if (istartDate) {
        if (maxDateTime && istartDate) {
          const rangePositon = inRange(istartDate.valueOf(), minDateTime, maxDateTime);
          if (rangePositon === -1) {
            return 'Less than minimum date.';
          }
          if (rangePositon === 1) {
            return 'Larger than maximum date.';
          }
        }
      }

      if (maxDateTime && iendDate) {
        const rangePositon = inRange(iendDate.valueOf(), minDateTime, maxDateTime);
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
  }, [invalidTimeZone, maxDateTime, minDateTime, istartDate, iendDate, invalidStartTimestamp, invalidStartDate, invalidStartTime]);

  return (
    <>
      <div className={styles.rangeHeader}>
        <div className={styles.leftbox} onBlur={() => handleOn?.([istartDateValue, iendDateValue], [istartTimeValue, iendTimeValue], onChange)}>
          <DateTimeInput
            dateValue={istartDateValue}
            // handleOn={(datestring, timestring, func), => handleOn?.(istartDateValue, [istartTimeValue, iendTimeValue], onChange)}
            timeValue={istartTimeValue}
            errorValue={errorValue}
            invalidTimestamp={invalidStartTimestamp}
            label={labels?.[0] || 'From'}
            name={name}
            onBlur={onBlur}
            range={false}
            setDateValue={setStartDateValue}
            setTimeValue={setStartTimeValue}
            dateOnly={dateOnly}
            onChange={(event) => onChangeReactDP(null, event, 'start')}
            onFocus={() => onFocus('start')}
          />
        </div>
        <div className={styles.rightbox} onBlur={() => handleOn?.([istartDateValue, iendDateValue], [istartTimeValue, iendTimeValue], onChange)}>
          <DateTimeInput
            dateValue={iendDateValue}
            // handleOn={handleOn}
            timeValue={iendTimeValue}
            errorValue={errorValue}
            invalidTimestamp={invalidEndTimestamp}
            label={labels?.[1] || 'To'}
            name={name}
            onBlur={onBlur}
            range={false}
            setDateValue={setEndDateValue}
            setTimeValue={setEndTimeValue}
            dateOnly={dateOnly}
            onChange={(event) => onChangeReactDP(null, event, 'end')}
            onFocus={() => onFocus('end')}
          />
        </div>
      </div>
    </>
  );

};

RangeDateTimeRangeInput.displayName = 'Range Input';

export default RangeDateTimeRangeInput;
