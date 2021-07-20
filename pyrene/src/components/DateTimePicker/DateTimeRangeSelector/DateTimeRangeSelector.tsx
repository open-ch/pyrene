import React, { useCallback, useEffect, useState } from 'react';
import Button from '../../Button/Button';
import {
  DateType, TimeType, getFutureDate, standardEUDateFormat, standardEUTimeFormat,
  isValidDate, isValidTime, isValidTimeZone, convertToDateTypeObject, convertToTimeTypeObject,
  convertToUTCtime, convertToZoneTime, convertDateTypeToString, convertTimeTypeToString, dateTypeToStandardEUDateFormat,
  getDateTypeFromddmmyyyyWithSep, getTimeTypeFromhhmmWithSep,
} from '../../../utils/DateUtils';
import TimeRangeSelector from '../../TimeRangeSelector/TimeRangeSelector';
import DateTimeInput, { InputProps } from '../DateTimeInput/DateTimeInput';
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
  errorValue?: string,
  invalidTimestamp?: boolean,
  handleOn?: (dateString: string, timeString: string, func:(event:any) => void) => void
  startDate?: Date,
  startDateValue?: string,
  endDateValue?: string,
  startTimeValue?: string,
  endTimeValue?: string,
  setEndDateValue?: (value: string) => void,
  setEndTimeValue?: (value: string) => void,
  setStartDateValue?: (value: string) => void,
  setStartTimeValue?: (value: string) => void,
  timeZone: string,
  inline?: boolean,
  maxDate?: Date,
  minDate?: Date,
  onChange: (date:Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined, rangePos?:string) => void
  onBlur?: OnFunction,
  name?: string,
}



export type CalendarHeaderInputProps = {
  labels?: [string, string],
  className?: string,
  children?: React.ReactNode,
  setFocusedRef?: (ref: React.RefObject<HTMLInputElement>) => void,
  message?: string,
  minDate?: Date,
  onChange?: OnFunction,
} & Pick<DateTimeRangeSelectorProps,
'endDate' |
'errorValue' |
'handleOn' |
'invalidTimestamp' |
'name' |
'setEndDateValue' |
'setEndTimeValue' |
'setStartDateValue' |
'setStartTimeValue' |
'startDate' |
'startDateValue' |
'endDateValue' |
'startTimeValue' |
'endTimeValue' |
'dateOnly' |
'onBlur'
>;

function Calendar(props: CalendarHeaderInputProps) {
  const {
    labels,
    className,
    children,
    dateOnly,
    errorValue = '',
    invalidTimestamp,
    handleOn,
    name,
    startDate,
    startDateValue,
    endDateValue,
    startTimeValue,
    endTimeValue,
    message = '',
    minDate,
    setEndDateValue,
    setEndTimeValue,
    setStartDateValue,
    setStartTimeValue,
    setFocusedRef,
    onBlur,
    onChange,
  } = props;

  const handleButton = () => {
    console.log('Start', startDateValue);
    console.log('End', endDateValue);
  };

  return (
    <>
      <RangeDateTimeRangeInput startDateValue={startDateValue} startTimeValue={startTimeValue} endDateValue={endDateValue} endTimeValue={endTimeValue} onChange={(value) => console.log(value)} setFocusedRef={setFocusedRef} />
      <CalendarContainer className={className}>
        <div>{children}</div>
      </CalendarContainer>
      <div className={styles.rangeFooter}>
        <div className={styles.infoBox}>
          {message || `Max. past date: ${minDate ? standardEUDateFormat(minDate) : standardEUDateFormat(new Date(0))} `}
        </div>
        <div className={styles.footerButtonsBox}>
          <Button label="Discard" type="secondary" />
          <Button label="Apply" onClick={handleButton} />
        </div>
      </div>
    </>
  );
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

  const [focusedInput, setFocusedInput] = useState<React.RefObject<HTMLInputElement>>();

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

    if (invalidTimestamp) { // refactor
      setStartDateValue('');
      setStartTimeValue('');

      setEndDateValue('');
      setEndTimeValue('');


      setInvalidDate(false);
      setInvalidTime(false);
    }
  }, [startDate, endDate, invalidTimestamp]);

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

  return (
    <>
      <ReactDPWrapper
        closeOnSelect={false}
        customCalendar={({ children }) => Calendar({
          startDateValue: startDateValue,
          startTimeValue: startTimeValue,
          endDateValue: endDateValue,
          endTimeValue: endTimeValue,
          labels: ['Von', 'Bis'],
          className: '',
          setStartDateValue: setStartDateValue,
          setStartTimeValue: setStartTimeValue,
          setFocusedRef: setFocusedInput,
          invalidTimestamp: invalidTimestamp,
          errorValue: errorValue,
          children: children,
          onChange: onBlur,
        })}
        endDate={endDate}
        //  onChange={(date, event) => onChangeReactDP(date, event, 'start')}
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
        // value={`${iStartDate}`}
      />
    </>
  );
});

DateTimeRangeSelector.displayName = 'Time Range Selector';
export default DateTimeRangeSelector;
