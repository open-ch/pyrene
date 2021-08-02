import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {
  convertDateTypeToString,
  convertTimeTypeToString,
  convertToUTCtime,
  getDateTypeFromddmmyyyyWithSep,
  getFutureDate,
  getTimeTypeFromhhmmWithSep,
  isValidTimeZone, getErrors, errorDateBool, errorTimeBool,
} from '../../../utils/DateUtils';
import DateTimeInput from '../DateTimeInput/DateTimeInput';
import dateRangeInputsReducer, { DateActions } from '../DateStateReducer';

import styles from './RangeDateTimeRangeInput.css';

type OnFunction = (value?: number | [number, number] | null) => void;

export interface RangeProps {
  /**
   * Boolean to control time display
   */
  dateOnly?: boolean,
  /**
   * This is a Date object that represents the start date of the component
   */
  startDate?: Date,
  /**
   * This is a string that represents the start date of the component
   */
  startDateValue?: string,
  /**
   * This is a string that represents the end date of the component
   */
  endDateValue?: string,
  /**
   * This is a string that represents the start time of the component
   */
  startTimeValue?: string,
  /**
   * This is a string that represents the end time of the component
   */
  endTimeValue?: string,
  /**
   * This is a string array that represents the start and end labels of the component
   */
  labels?: [string, string],
  errorValue?: string,
  handleOn?: () => void,
  name?: string,
  onBlur?: () => void,
  // onChange?: (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined, rangePos?: string) => void,
  onChange?: OnFunction,
  /**
   * Register input to receive focus
   */
  onFocus?: (value: string) => void,
  /**
   * Dispatch function to send actions to parent
   */
  parentDispatch?: React.Dispatch<DateActions>,
  /**
   * The timezone used for timestamps
   */
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

const RangeDateTimeRangeInput: React.FC<RangeProps> = ({
  name = '',
  labels = ['Von', 'Bis'],
  onBlur = () => {},
  onChange = () => {},
  onFocus = () => {},
  parentDispatch = () => {},
  dateOnly = false,
  endDateValue,
  endTimeValue,
  startDateValue,
  startTimeValue,
  timeZone = 'Europe/Zurich',
  maxDateTime = getFutureDate({ years: 1 }),
  minDateTime = 0,
}: RangeProps) => {

  const [reducer, dispatch] = useReducer(dateRangeInputsReducer, {
    startDate: startDateValue,
    startTime: startTimeValue,
    startDateInvalid: false,
    startTimeInvalid: false,
    endDate: endDateValue,
    endTime: endTimeValue,
    endDateInvalid: false,
    endTimeInvalid: false,
  });

  const [timeZoneValue, setTimeZoneValue] = useState(timeZone);

  const [invalidTimeZone, setInvalidTimeZone] = useState(false);

  const [startErrorValue, setStartErrorValue] = useState('');
  const [endErrorValue, setEndErrorValue] = useState('');

  const handleOn = useCallback((onFunction?: OnFunction) => {
    const isStartDateLongEnough = reducer.startDate?.length === 10;
    const isEndDateLongEnough = reducer.endDate?.length === 10;

    const isStartTimeLongEnough = reducer.startTime?.trim().length === 5;
    const isEndTimeLongEnough = reducer.endTime?.trim().length === 5;

    if (
      isStartDateLongEnough
      && isEndDateLongEnough
      && isStartTimeLongEnough
      && isEndTimeLongEnough
      && reducer.startDate
      && reducer.startTime
      && reducer.endDate
      && reducer.endTime
    ) {
      const startdate = getDateTypeFromddmmyyyyWithSep(reducer.startDate);
      const enddate = getDateTypeFromddmmyyyyWithSep(reducer.endDate);
      const starttime = getTimeTypeFromhhmmWithSep(reducer.startTime?.trim());
      const endtime = getTimeTypeFromhhmmWithSep(reducer.endTime?.trim());

      dispatch({ type: 'startDate/invalid', payload: { value: errorDateBool(reducer.startDate) } });
      dispatch({ type: 'startTime/invalid', payload: { value: errorDateBool(reducer.startTime?.trim()) } });

      dispatch({ type: 'endDate/invalid', payload: { value: errorDateBool(reducer.endDate) } });
      dispatch({ type: 'endTime/invalid', payload: { value: errorDateBool(reducer.endTime?.trim()) } });

      if (onFunction) {
        if (startdate && enddate && starttime && endtime && !reducer.startDateInvalid && !reducer.endDateInvalid && !reducer.startTimeInvalid && !reducer.endTimeInvalid) {
          onFunction([convertToUTCtime(`${convertDateTypeToString(startdate)} ${convertTimeTypeToString(starttime)}`, timeZoneValue).valueOf(), convertToUTCtime(`${convertDateTypeToString(enddate)} ${convertTimeTypeToString(endtime)}`, timeZoneValue).valueOf()]);

          parentDispatch?.({
            type: 'range/changed',
            payload: {
              value: [convertToUTCtime(`${convertDateTypeToString(startdate)} ${convertTimeTypeToString(starttime)}`, timeZoneValue).valueOf(), convertToUTCtime(`${convertDateTypeToString(enddate)} ${convertTimeTypeToString(endtime)}`, timeZoneValue).valueOf()],
            },
          });
        } else {
          onFunction(null);
        }
      }
    } else {
      dispatch({ type: 'startDate/invalid', payload: { value: false } });
      dispatch({ type: 'startTime/invalid', payload: { value: false } });

      dispatch({ type: 'endDate/invalid', payload: { value: false } });
      dispatch({ type: 'endTime/invalid', payload: { value: false } });

      if (onFunction) {
        onFunction(null);
      }
    }
  }, [parentDispatch, reducer.endDate, reducer.endDateInvalid, reducer.endTime, reducer.endTimeInvalid, reducer.startDate, reducer.startDateInvalid, reducer.startTime, reducer.startTimeInvalid, timeZoneValue]);

  // Each time component does update, check if the timezone is valid
  useEffect(() => {
    if (isValidTimeZone(timeZone)) {
      setTimeZoneValue(timeZone);
      setInvalidTimeZone(false);
    } else {
      setInvalidTimeZone(true);
    }
  }, [timeZone]);

  // Upon inputing, check if it s well formatted and meet the constraints (uper or lower time limit) for the from
  useEffect(() => {
    setStartErrorValue(getErrors(errorDateBool(reducer.startDate || ''), errorTimeBool(reducer.startTime || ''), reducer.startDate, minDateTime, maxDateTime, timeZone));
  }, [reducer.startDate, reducer.startTime, timeZone, reducer.startDateInvalid, reducer.startTimeInvalid, minDateTime, maxDateTime]);


  // Upon inputing, check if it s well formatted and meet the constraints (uper or lower time limit) for the to
  useEffect(() => {
    setEndErrorValue(getErrors(errorDateBool(reducer.endDate || ''), errorTimeBool(reducer.endTime || ''), reducer.endDate, minDateTime, maxDateTime, timeZone));
  }, [reducer.endDate, reducer.endTime, timeZone, reducer.endDateInvalid, reducer.endTimeInvalid, minDateTime, maxDateTime]);

  // invalidTimeZone is a derived state. Upon that state change, render error message.
  useEffect(() => {
    const getError = () => {
      if (invalidTimeZone) {
        const tz = 'Europe/Zurich';
        setTimeZoneValue(tz);
        return `Invalid time zone. ${tz} is being used.`;
      }
      return '';
    };
    setStartErrorValue(getError());
  }, [invalidTimeZone]);

  return (
    <>
      <div className={styles.rangeHeader}>
        <div className={styles.leftbox} onBlurCapture={() => { handleOn?.(onChange); onBlur(); }}>
          <DateTimeInput
            dateValue={reducer?.startDate || ''}
            timeValue={reducer?.startTime || ''}
            errorValue={startErrorValue}
            // invalidTimestamp={invalidStartTimestamp}
            label={labels?.[0] || 'From'}
            name={name}
            // onBlur={onBlur}
            range={false}
            setDateValue={(value) => {
              dispatch({ type: 'startDate/changed', payload: { value: value } });
              dispatch({ type: 'startDate/invalid', payload: { value: errorDateBool(value.trim()) } });
            }}
            setTimeValue={(value) => { dispatch({ type: 'startTime/changed', payload: { value: value } }); dispatch({ type: 'startTime/invalid', payload: { value: errorTimeBool(value.trim()) } }); }}
            dateOnly={dateOnly}
            onFocus={() => onFocus('start')}
          />
        </div>
        <div className={styles.rightbox} onBlurCapture={() => { handleOn?.(onChange); onBlur(); }}>
          <DateTimeInput
            dateValue={reducer?.endDate || ''}
            timeValue={reducer?.endTime || ''}
            errorValue={endErrorValue}
            // invalidTimestamp={invalidEndTimestamp}
            label={labels?.[1] || 'To'}
            name={name}
            // onBlur={onBlur}
            range={false}
            setDateValue={(value) => { dispatch({ type: 'endDate/changed', payload: { value: value } }); dispatch({ type: 'endDate/invalid', payload: { value: errorDateBool(value.trim()) } }); }}
            setTimeValue={(value) => { dispatch({ type: 'endTime/changed', payload: { value: value } }); dispatch({ type: 'endTime/invalid', payload: { value: errorTimeBool(value.trim()) } }); }}
            dateOnly={dateOnly}
            onFocus={() => onFocus('end')}
          />
        </div>
      </div>
    </>
  );

};

RangeDateTimeRangeInput.displayName = 'Range Input';

export default RangeDateTimeRangeInput;
