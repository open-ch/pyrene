import React, {
  useEffect,
  useRef,
  useState,
  useReducer,
  ReactNode,
} from 'react';
import clsx from 'clsx';
import Button from '../../Button/Button';
import {
  getFutureDate, standardEUDateFormat, standardEUTimeFormat,
  convertToUTCtime, getDateTypeFromddmmyyyyWithSep, convertDateTypeToString, convertTimeTypeToString, getTimeTypeFromhhmmWithSep,
} from '../../../utils/DateUtils';
import TimeRangeSelector from '../../TimeRangeSelector/TimeRangeSelector';
import RangeDateTimeRangeInput from '../RangeDateTimeInput/RangeDateTimeInput';
import ReactDPWrapper, { CalendarContainer } from '../ReactDatePickerWrapper/ReactDatePickerWrapper';

import styles from './DateTimeRangeSelector.css';
import dateRangeInputsReducer from '../DateStateReducer';


type OnFunction = (value?: number | [number, number] | null) => void;
export interface DateTimeRangeSelectorProps{
  /**
   * Boolean to control time display
   */
  dateOnly?: boolean,
  highlightsOn?: boolean,
  /**
   * Display component as dropdown or inline
   */
  inline?: boolean,
  /**
  * This is a string array that represents the start and end labels of the component
  */
  labels?: [string, string]
  /**
   * This is a timestamp that represents the maximum date allowed by the component
   */
  maxDateTime?: number,
  /**
   * This is a timestamp that represents the minimum date allowed by the component
   */
  minDateTime?: number,
  /**
   * Function to handle onBlur event
   */
  onBlur?: OnFunction,
  /**
  * Function to handle onChange event
  */
  onChange: OnFunction,
  /**
   * This is a unix timestamp, which is the number of seconds that have elapsed since Unix epoch
   */
  timeStamps?: [number, number],
  /**
   * This is must be a IANA time zone string
   */
  timeZone?: string,
}


const DateTimeRangeSelector: React.FC<DateTimeRangeSelectorProps> = (({
  dateOnly = false,
  highlightsOn = false,
  inline = false,
  maxDateTime = getFutureDate({ years: 1 }),
  minDateTime = 0,
  labels = ['From', 'To'],
  onBlur,
  onChange,
  timeZone = 'Europe/Zurich',
}:DateTimeRangeSelectorProps) => {

  const focusedInput = useRef('start');
  const rangedRef = useRef<HTMLDivElement>(null);

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const [startDateValue, setStartDateValue] = useState('');
  const [startTimeValue, setStartTimeValue] = useState('');

  const [endDateValue, setEndDateValue] = useState('');
  const [endTimeValue, setEndTimeValue] = useState('');

  const [timeZoneValue, setTimeZoneValue] = useState(timeZone);


  const [invalidTimestamp, setInvalidTimestamp] = useState(false);

  const [isCalOpen, setCalOpen] = useState<boolean | undefined>(undefined);

  const [errorValue, setErrorValue] = useState('');


  const [reducer, dispatch] = useReducer(dateRangeInputsReducer, {
    startDate: startDateValue,
    startTime: startTimeValue,
    endDate: endDateValue,
    endTime: endTimeValue,
  });


  // Handle changes from react datepicker
  const onChangeReactDP = (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined): void => {
    if (event?.type === 'click') {
      if (Array.isArray(date)) {
        const [start, end] = date;

        setStartDate(start);
        setEndDate(end);
      }
    } else if (!Array.isArray(date) && event === undefined) {
      if (date && focusedInput.current === 'start') {
        setStartTimeValue(date ? standardEUTimeFormat(date) : '');

        const startdate = getDateTypeFromddmmyyyyWithSep(startDateValue);
        const starttime = getTimeTypeFromhhmmWithSep(standardEUTimeFormat(date));

        if (startdate && starttime) {
          setStartDate(convertToUTCtime(`${convertDateTypeToString(startdate)} ${convertTimeTypeToString(starttime)}`, timeZoneValue));
        }
      }

      if (date && focusedInput.current === 'end') {
        setEndTimeValue(date ? standardEUTimeFormat(date) : '');

        const enddate = getDateTypeFromddmmyyyyWithSep(endDateValue);
        const endtime = getTimeTypeFromhhmmWithSep(standardEUTimeFormat(date));

        if (enddate && endtime) {
          setEndDate(convertToUTCtime(`${convertDateTypeToString(enddate)} ${convertTimeTypeToString(endtime)}`, timeZoneValue));
        }
      }
    }
  };

  const clearValues = () => {
    setStartDate(undefined);
    setStartTimeValue('');

    setEndDate(undefined);
    setEndTimeValue('');

    dispatch({
      type: 'range/changed',
      payload: {
        value: null,
      },
    });
  };

  useEffect(() => {
    if (startDate) {
      const dateString = standardEUDateFormat(startDate);

      setStartDateValue(dateString);
    } else {
      setStartDateValue('');
      setStartTimeValue('');
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      const dateString = standardEUDateFormat(endDate);

      setEndDateValue(dateString);
    } else {
      setEndDateValue('');
      setEndTimeValue('');
    }
  }, [endDate]);

  useEffect(() => {
    if (invalidTimestamp) {
      clearValues();
    }
  }, [invalidTimestamp]);

  useEffect(() => {
    if (Array.isArray(reducer.range)) {
      const startDateObj = convertToUTCtime(reducer.range[0], timeZoneValue);
      const endDateObj = convertToUTCtime(reducer.range[1], timeZoneValue);

      if (!Number.isNaN(startDateObj.valueOf())) {
        const timeString = standardEUTimeFormat(startDateObj);

        setStartDate(startDateObj);
        setStartTimeValue(timeString);
      } else {
        setInvalidTimestamp(true);
      }

      if (!Number.isNaN(endDateObj.valueOf())) {
        const timeString = standardEUTimeFormat(endDateObj);

        setEndDate(endDateObj);
        setEndTimeValue(timeString);
      } else {
        setInvalidTimestamp(true);
      }
    }
  }, [reducer.range, timeZoneValue]);


  const handleApplyButton = () => {
    const startdate = getDateTypeFromddmmyyyyWithSep(startDateValue);
    const starttime = getTimeTypeFromhhmmWithSep(startTimeValue);

    const enddate = getDateTypeFromddmmyyyyWithSep(endDateValue);
    const endtime = getTimeTypeFromhhmmWithSep(endTimeValue);

    if (dateOnly && startdate && enddate) {
      onChange([convertToUTCtime(`${convertDateTypeToString(startdate)} 00:00`, timeZoneValue).valueOf(), convertToUTCtime(`${convertDateTypeToString(enddate)} 00:00`, timeZoneValue).valueOf()]);
    } else if (startdate && starttime && enddate && endtime) {
      onChange([convertToUTCtime(`${convertDateTypeToString(startdate)} ${convertTimeTypeToString(starttime)}`, timeZoneValue).valueOf(), convertToUTCtime(`${convertDateTypeToString(enddate)} ${convertTimeTypeToString(endtime)}`, timeZoneValue).valueOf()]);
    } else {
      onChange(null);
    }

    setCalOpen(!isCalOpen);
  };

  const handleCancelButton = () => {
    clearValues();
    setCalOpen(!isCalOpen);
  };

  const handleFocus = (e:string) => {
    focusedInput.current = e;
    console.log(e);
  };

  const customCalendar = (props:{
    children: ReactNode[]
  }) => {
    const { children } = props;
    return (
      <>
        <RangeDateTimeRangeInput
          dateOnly={dateOnly}
          endDateValue={endDateValue}
          endTimeValue={endTimeValue}
          labels={labels}
          lastfocused={focusedInput}
          onFocus={handleFocus}
          parentDispatch={dispatch}
          timeZone={timeZone}
          startDateValue={startDateValue}
          startTimeValue={startTimeValue}
          highlightsOn={highlightsOn}
        />
        <CalendarContainer>
          <div ref={rangedRef}>{children}</div>
        </CalendarContainer>
        <div className={clsx(styles.rangeFooter, { [styles.dateTimeFooter]: !dateOnly })}>
          <div className={styles.infoBox}>
            {errorValue || `Max. past date: ${standardEUDateFormat(new Date(minDateTime))} `}
          </div>
          <div className={styles.footerButtonsBox}>
            <Button label="Cancel" type="secondary" onClick={handleCancelButton} />
            <Button label="Apply" onClick={handleApplyButton} />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <ReactDPWrapper
        closeOnSelect={false}
        customCalendar={customCalendar}
        CustomInput={!inline && (
          <TimeRangeSelector
            timezone="Europe/Zurich"
            from={startDate?.valueOf() || new Date().valueOf()}
            to={endDate?.valueOf() || convertToUTCtime(getFutureDate({ months: 4 }), timeZoneValue).valueOf()}
            lowerBound={minDateTime}
            upperBound={maxDateTime}
            onChange={(from: number, to: number) => { console.log(from, to); }}
          />
        )}
        dateOnly={dateOnly}
        endDate={endDate}
        highlightsOn={highlightsOn}
        inline={inline}
        isOpen={isCalOpen}
        maxDate={convertToUTCtime(maxDateTime, timeZoneValue)}
        minDate={convertToUTCtime(minDateTime, timeZoneValue)}
        onChange={(date, event) => onChangeReactDP(date, event)}
        openDate={startDate}
        selectedDate={startDate}
        shouldDisplayTimeColumn={!dateOnly}
        startDate={startDate}
        range
        // value={`${startDateValue}`}
      />
    </>
  );
});

DateTimeRangeSelector.displayName = 'Time Range Selector';
export default DateTimeRangeSelector;
