import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Button from '../../Button/Button';
import {
  DateType, TimeType, getFutureDate, standardEUDateFormat, standardEUTimeFormat,
  isValidDate, isValidTime, isValidTimeZone, convertToDateTypeObject, convertToTimeTypeObject,
  convertToUTCtime, convertToZoneTime, convertDateTypeToString, convertTimeTypeToString, dateTypeToStandardEUDateFormat,
  getDateTypeFromddmmyyyyWithSep, getTimeTypeFromhhmmWithSep,
} from '../../../utils/DateUtils';
import TimeRangeSelector from '../../TimeRangeSelector/TimeRangeSelector';
import RangeDateTimeRangeInput from '../RangeDateTimeInput/RangeDateTimeInput';
import ReactDPWrapper, { CalendarContainer } from '../ReactDatePickerWrapper/ReactDatePickerWrapper';

import styles from './DateTimeRangeSelector.css';

type OnFunction = (value?: number | [number, number] | null) => void;
export interface DateTimeRangeProps{
  dateOnly?: boolean,
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
  inline?: boolean,
  name?: string,
  range?: boolean,
  /**
   * This is a unix timestamp, which is the number of seconds that have elapsed since Unix epoch
   */
  timeStamp?: number | null,
  /**
   * This is must be a IANA time zone string
   */
  timeZone?: string,
  /**
   * Function to handle onBlur event
   */
  onBlur?: OnFunction,
  /**
   * Function to handle onChange event
   */
  onChange: OnFunction,
}
export interface DateTimeRangeSelectorProps {
  dateOnly?: boolean,
  endDate?: Date,
  endDateValue?: string,
  endTimeValue?: string,
  errorValue?: string,
  handleOn?: (dateString: string, timeString: string, func:(event:any) => void) => void,
  inline?: boolean,
  invalidTimestamp?: boolean,
  maxDate?: Date,
  minDate?: Date,
  name?: string,
  onChange: (date:Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined, rangePos?:string) => void
  onBlur?: OnFunction,
  startDate?: Date,
  startDateValue?: string,
  startTimeValue?: string,
  setEndDateValue?: (value: string) => void,
  setEndTimeValue?: (value: string) => void,
  setStartDateValue?: (value: string) => void,
  setStartTimeValue?: (value: string) => void,
  timeZone: string,
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


const DateTimeRangeSelector: React.FC<DateTimeRangeProps> = (({
  dateOnly = false,
  inline = false,
  maxDateTime = getFutureDate({ years: 1 }),
  minDateTime = 0,
  name,
  onBlur,
  onChange,
  range = true,
  timeStamp,
  timeZone = 'Europe/Zurich',
}:DateTimeRangeProps) => {

  const focusedInput = useRef('start');

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const [startDateValue, setStartDateValue] = useState('');
  const [startTimeValue, setStartTimeValue] = useState('');

  const [endDateValue, setEndDateValue] = useState('');
  const [endTimeValue, setEndTimeValue] = useState('');

  const [timeZoneValue, setTimeZoneValue] = useState(timeZone);

  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidTime, setInvalidTime] = useState(false);
  const [invalidTimestamp, setInvalidTimestamp] = useState(false);
  const [invalidTimeZone, setInvalidTimeZone] = useState(false);

  const [isCalOpen, setCalOpen] = useState<boolean | undefined>(undefined);

  const [errorValue, setErrorValue] = useState('');

  const handleOn = useCallback((dateString:string, timeString:string, onFunction?: OnFunction) => {
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
          onFunction(convertToUTCtime(`${convertDateTypeToString(date)} ${convertTimeTypeToString(time)}`, timeZoneValue).valueOf());
        } else {
          onFunction(null);
        }
      }
    } else {
      setInvalidDate(false);
      setInvalidTime(false);
      setEndDate(undefined);
      setStartDate(undefined);

      if (onFunction) {
        onFunction(null);
      }
    }
  }, [timeZoneValue]);

  const onChangeReactDP = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined, rangePos?:string): void => {
    console.log(event?.type);
    console.log(date);
    console.log('focus :', focusedInput.current);
    console.log('range : ', rangePos);
    console.log(startTimeValue);

    if (event?.type === 'click') {
      if (Array.isArray(date)) {
        const [start, end] = date;

        setStartDate(start);
        setStartDateValue(start ? standardEUDateFormat(start) : '');

        setEndDate(end);
        setEndDateValue(end ? standardEUDateFormat(end) : '');
        focusedInput.current = 'end';
      }
      console.log('dddd');
    } else if (!Array.isArray(date) && event === undefined) {
      console.log(focusedInput.current);

      if (focusedInput.current === 'start') {
        setStartTimeValue(date ? standardEUTimeFormat(date) : '');
      }

      if (focusedInput.current === 'end') {
        setEndTimeValue(date ? standardEUTimeFormat(date) : '');
      }
    }
  };

  useEffect(() => {
    if (startDate) {
      const date: DateType = convertToDateTypeObject(startDate);
      const dateString = standardEUDateFormat(startDate);

      // setStartDateValue(dateString);
      setInvalidDate(!isValidDate(date));
      focusedInput.current = 'start';
    }

    if (invalidTimestamp) {
      setStartDateValue('');
      setStartTimeValue('');

      setInvalidDate(false);
    }
  }, [startDate, invalidTimestamp]);

  useEffect(() => {
    if (endDate) {
      const date: DateType = convertToDateTypeObject(endDate);
      const dateString = standardEUDateFormat(endDate);

      // setEndDateValue(dateString);
      setInvalidDate(!isValidDate(date));
      focusedInput.current = 'end';
    }

    if (invalidTimestamp) {
      setEndDateValue('');
      setEndTimeValue('');

      setInvalidDate(false);
      setInvalidTime(false);
    }
  }, [endDate, invalidTimestamp]);

  useEffect(() => {
    if (invalidTimestamp) {
      setStartDateValue('');
      setStartTimeValue('');

      setEndDateValue('');
      setEndTimeValue('');


      setInvalidDate(false);
      setInvalidTime(false);
    }
  }, [invalidTimestamp]);




















  useEffect(() => {
    if (startTimeValue) {
      setStartTimeValue(startTimeValue);
      setInvalidTime(!isValidTime(getTimeTypeFromhhmmWithSep(startTimeValue)));
    }

    if (endTimeValue) {
      setEndTimeValue(endTimeValue);
      setInvalidTime(!isValidTime(getTimeTypeFromhhmmWithSep(endTimeValue)));
    }

    if (invalidTimestamp) {
      setStartDateValue('');
      setStartTimeValue('');

      setEndDateValue('');
      setEndTimeValue('');


      setInvalidDate(false);
      setInvalidTime(false);
    }
  }, [startTimeValue, endTimeValue, invalidTimestamp]);

  useEffect(() => {
    if (typeof timeStamp === 'number') {
      const dateObj = new Date(timeStamp);
      if (!Number.isNaN(dateObj.valueOf())) {
        setStartDate(convertToZoneTime(timeStamp, timeZoneValue));
        setInvalidTimestamp(false);
      } else {
        setStartDate(undefined);
        setInvalidTimestamp(true);
      }
    } else if (typeof timeStamp === 'undefined') {
      setStartDate(undefined);
      setInvalidTimestamp(false);

      setStartDateValue('');
      setStartTimeValue('');
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
      if (maxDateTime && endDate) {
        const rangePositon = inRange(endDate.valueOf(), minDateTime, maxDateTime);
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
  }, [invalidDate, invalidTime, invalidTimestamp, invalidTimeZone, endDate, maxDateTime, minDateTime]);

  const handleButton = () => {
    console.log('Start', `${startDateValue} ${startTimeValue}`);
    console.log('End', `${endDateValue} ${endTimeValue}`);
  };

  const handleCancelButton = () => {
    setCalOpen(!isCalOpen);
  };

  const handleChange = (value?:number | [number, number] | null) => {
    console.log('Parent', value);
  };

  const handleFocus = (e:string) => {
    focusedInput.current = e;
    console.log(e);
  };

  return (
    <>
      <ReactDPWrapper
        closeOnSelect={false}
        customCalendar={({ children }) => (
          <>
            <RangeDateTimeRangeInput
              startDateValue={startDateValue}
              startTimeValue={startTimeValue}
              endDateValue={endDateValue}
              endTimeValue={endTimeValue}
              onChange={handleChange}
              onFocus={handleFocus}
            />
            <CalendarContainer>
              <div>{children}</div>
            </CalendarContainer>
            <div className={styles.rangeFooter}>
              <div className={styles.infoBox}>
                {errorValue || `Max. past date: ${standardEUDateFormat(new Date(minDateTime))} `}
              </div>
              <div className={styles.footerButtonsBox}>
                <Button label="Discard" type="secondary" onClick={handleCancelButton} />
                <Button label="Apply" onClick={handleButton} />
              </div>
            </div>
          </>
        )}
        endDate={endDate}
        onChange={(date, event) => onChangeReactDP(date, event, focusedInput.current)}
        // selectedDate={startDate}
        shouldDisplayTimeColumn={!dateOnly}
        startDate={startDate}
        range={range}
        CustomInput={!inline && (
          <TimeRangeSelector
            timezone="Europe/Zurich"
            from={0}
            to={23478903000}
            lowerBound={-1000}
            upperBound={33095430000}
            onChange={(val: any) => { console.log(val); }}
          />
        )}
        inline={inline}
        isOpen={isCalOpen}
        // value={`${iStartDate}`}
      />
    </>
  );
});

DateTimeRangeSelector.displayName = 'Time Range Selector';
export default DateTimeRangeSelector;
