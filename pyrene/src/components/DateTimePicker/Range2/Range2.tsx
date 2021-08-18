import React, {
  useEffect,
  useRef,
  useState,
  useReducer,
  ReactNode,
  Fragment,
} from 'react';
import clsx from 'clsx';
import Button from '../../Button/Button';
import {
  getFutureDate, standardEUDateFormat, standardEUTimeFormat,
  convertToUTCtime, getDateTypeFromddmmyyyyWithSep, convertDateTypeToString, convertTimeTypeToString, getTimeTypeFromhhmmWithSep, convertToZoneTime,
} from '../../../utils/DateUtils';
import TimeRangeSelector from '../../TimeRangeSelector/TimeRangeSelector';
import RangeDateTimeRangeInput from '../RangeDateTimeInput/RangeDateTimeInput';
import ReactDPWrapper, { CalendarContainer } from '../ReactDatePickerWrapper/ReactDatePickerWrapper';

import styles from './Range2.css';
import dateRangeInputsReducer from '../DateStateReducer';
import DateTimePicker from '../DateTimePicker';
import DetectClickOutside, { DetectClickOutsideProps } from './DetectClickOutside';


type OnFunction = (value?: number | [number, number] | null) => void;
export interface Range2Props{
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


const Range2: React.FC<Range2Props> = (({
  dateOnly = false,
  highlightsOn = false,
  inline = false,
  maxDateTime = getFutureDate({ years: 1 }),
  minDateTime = 0,
  labels = ['From', 'To'],
  onBlur,
  onChange,
  timeStamps,
  timeZone = 'Europe/Zurich',
}:Range2Props) => {

  const focusedInput = useRef('start');
  const rangedRef = useRef<HTMLDivElement>(null);

  const clickAreaRef = useRef<HTMLDivElement>(null);

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [startDateValue, setStartDateValue] = useState('');
  const [startTimeValue, setStartTimeValue] = useState('');

  const [endDateValue, setEndDateValue] = useState('');
  const [endTimeValue, setEndTimeValue] = useState('');

  const [timeZoneValue, setTimeZoneValue] = useState(timeZone);


  const [invalidTimestamp, setInvalidTimestamp] = useState(false);

  const [isCalOpen, setCalOpen] = useState<boolean | undefined>(undefined);
  const [islCalOpen, setlCalOpen] = useState<boolean | undefined>(undefined);
  const [isrCalOpen, setrCalOpen] = useState<boolean | undefined>(undefined);

  const [errorValue, setErrorValue] = useState('');

  const clearValues = () => {
    setStartDate(undefined);
    // setStartTimeValue('');

    setEndDate(undefined);
    // setEndTimeValue('');
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


  const handleApplyButton = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (startDate && endDate) {
      const startdate = getDateTypeFromddmmyyyyWithSep(standardEUDateFormat(startDate));
      const starttime = getTimeTypeFromhhmmWithSep(standardEUTimeFormat(startDate));

      const enddate = getDateTypeFromddmmyyyyWithSep(standardEUDateFormat(endDate));
      const endtime = getTimeTypeFromhhmmWithSep(standardEUTimeFormat(endDate));

      if (dateOnly && startdate && enddate) {
        onChange([convertToUTCtime(`${convertDateTypeToString(startdate)} 00:00`, timeZoneValue).valueOf(), convertToUTCtime(`${convertDateTypeToString(enddate)} 00:00`, timeZoneValue).valueOf()]);
      } else if (startdate && starttime && enddate && endtime) {
        onChange([convertToUTCtime(`${convertDateTypeToString(startdate)} ${convertTimeTypeToString(starttime)}`, timeZoneValue).valueOf(), convertToUTCtime(`${convertDateTypeToString(enddate)} ${convertTimeTypeToString(endtime)}`, timeZoneValue).valueOf()]);
      } else {
        onChange(null);
      }
    } else {
      onChange(null);
    }
    setCalOpen(false);
  };

  const handleCancelButton = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    clearValues();
    onChange(null);
    setCalOpen(false);
  };


  const customCalendar = (props:{
    children: ReactNode[]
  }) => {
    const { children } = props;
    return (
      <>
        <CalendarContainer>
          <div>{children}</div>
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
    <DetectClickOutside
      onClick={() => setCalOpen(true)}
      onClickOutside={() => setCalOpen(false)}
      ref={clickAreaRef}
      listen
    >
      <>
        <TimeRangeSelector
          timezone="Europe/Zurich"
          from={startDate?.valueOf() || new Date().valueOf()}
          to={endDate?.valueOf() || convertToUTCtime(getFutureDate({ months: 4 }), timeZoneValue).valueOf()}
          lowerBound={minDateTime}
          upperBound={maxDateTime}
          onChange={(from: number, to: number) => { console.log(from, to); }}
        />
        {
          isCalOpen && (
            <div className={styles.calendar}>
              <div className={styles.rangeHeader}>
                <div className={styles.leftbox}>
                  <DateTimePicker
                    closeOnSelect={false}
                    customCalendar={customCalendar}
                    label="From"
                    endDate={endDate}
                    startDate={startDate}
                    minDateTime={minDateTime}
                    maxDateTime={maxDateTime}
                    onChange={(value) => (value !== undefined ? setStartDate(convertToZoneTime(value, timeZone)) : setStartDate(value))}
                    timeZone={timeZone}
                    dateOnly={dateOnly}
                    timeStamp={timeStamps?.[0]}
                    calendarOpened
                    selectStart
                  />
                </div>
                <div className={styles.rightbox}>
                  <DateTimePicker
                    closeOnSelect={false}
                    customCalendar={customCalendar}
                    label="To"
                    endDate={endDate}
                    startDate={startDate}
                    minDateTime={minDateTime}
                    maxDateTime={maxDateTime}
                    onChange={(value) => (value !== undefined ? setEndDate(convertToZoneTime(value, timeZone)) : setEndDate(value))}
                    timeZone={timeZone}
                    dateOnly={dateOnly}
                    timeStamp={timeStamps?.[1]}
                    selectEnd
                  />
                </div>
              </div>
            </div>
          )
        }
      </>
    </DetectClickOutside>
  );
});

Range2.displayName = 'Time Range Selector';
export default Range2;
