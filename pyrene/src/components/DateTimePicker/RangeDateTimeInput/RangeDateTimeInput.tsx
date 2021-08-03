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
  getErrors, errorDateBool, errorTimeBool,
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
   * This is a string that represents the end date of the component
   */
  endDateValue?: string,
  /**
   * This is a string that represents the end time of the component
   */
  endTimeValue?: string,
  /**
   * This is a string array that represents the start and end labels of the component
   */
  labels?: [string, string],
  name?: string,
  /**
   * This is a timestamp that represents the maximum date allowed by the component
   */
  maxDateTime?: number,
  /**
   * This is a timestamp that represents the minimum date allowed by the component
   */
  minDateTime?: number,
  onBlur?: () => void,
  /**
  * Function to handle onChange event
  */
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
   * This is a Date object that represents the start date of the component
   */
  startDate?: Date,
  /**
  * This is a string that represents the start date of the component
  */
  startDateValue?: string,
  /**
   * This is a string that represents the start time of the component
   */
  startTimeValue?: string,
  /**
   * The timezone used for timestamps
   */
  timeZone?: string,
}

const RangeDateTimeRangeInput: React.FC<RangeProps> = ({
  name = '',
  labels = ['From', 'To'],
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
    endDate: endDateValue,
    endTime: endTimeValue,
  });

  const [startErrorValue, setStartErrorValue] = useState('');
  const [endErrorValue, setEndErrorValue] = useState('');

  // This passes entered values to the parent component
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

      const invalidStartDate = errorDateBool(reducer.startDate);
      const invalidStartTime = errorDateBool(reducer.startTime?.trim());
      const invalidEndDate = errorDateBool(reducer.endDate);
      const invalidEndTime = errorDateBool(reducer.endTime?.trim());

      if (onFunction) {
        if (startdate && enddate && starttime && endtime && !invalidStartDate && !invalidStartTime && !invalidEndDate && !invalidEndTime) {
          onFunction([convertToUTCtime(`${convertDateTypeToString(startdate)} ${convertTimeTypeToString(starttime)}`, timeZone).valueOf(), convertToUTCtime(`${convertDateTypeToString(enddate)} ${convertTimeTypeToString(endtime)}`, timeZone).valueOf()]);

          parentDispatch?.({
            type: 'range/changed',
            payload: {
              value: [convertToUTCtime(`${convertDateTypeToString(startdate)} ${convertTimeTypeToString(starttime)}`, timeZone).valueOf(), convertToUTCtime(`${convertDateTypeToString(enddate)} ${convertTimeTypeToString(endtime)}`, timeZone).valueOf()],
            },
          });
        } else {
          onFunction(null);
        }
      }
    } else {
      onFunction?.(null);
    }
  }, [parentDispatch, reducer.endDate, reducer.endTime, reducer.startDate, reducer.startTime, timeZone]);

  // Set error values on changes in From input component
  useEffect(() => {
    setStartErrorValue(getErrors(errorDateBool(reducer.startDate || ''), errorTimeBool(reducer.startTime || ''), reducer.startDate, minDateTime, maxDateTime, timeZone));
  }, [reducer.startDate, reducer.startTime, timeZone, minDateTime, maxDateTime]);


  // Set error values on changes in To input component
  useEffect(() => {
    setEndErrorValue(getErrors(errorDateBool(reducer.endDate || ''), errorTimeBool(reducer.endTime || ''), reducer.endDate, minDateTime, maxDateTime, timeZone));
  }, [reducer.endDate, reducer.endTime, timeZone, minDateTime, maxDateTime]);

  return (
    <>
      <div className={styles.rangeHeader}>
        <div className={styles.leftbox} onBlurCapture={() => { handleOn?.(onChange); }}>
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
            }}
            setTimeValue={(value) => {
              dispatch({ type: 'startTime/changed', payload: { value: value } });
            }}
            dateOnly={dateOnly}
            onFocus={() => onFocus('start')}
          />
        </div>
        <div className={styles.rightbox} onBlurCapture={() => { handleOn?.(onChange); }}>
          <DateTimeInput
            dateValue={reducer?.endDate || ''}
            timeValue={reducer?.endTime || ''}
            errorValue={endErrorValue}
            // invalidTimestamp={invalidEndTimestamp}
            label={labels?.[1] || 'To'}
            name={name}
            // onBlur={onBlur}
            range={false}
            setDateValue={(value) => {
              dispatch({ type: 'endDate/changed', payload: { value: value } });
            }}
            setTimeValue={(value) => {
              dispatch({ type: 'endTime/changed', payload: { value: value } });
            }}
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
