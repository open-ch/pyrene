import React, {
  useState,
  useEffect,
} from 'react';
import clsx from 'clsx';
import Button from '../../Button/Button';
import {
  getFutureDate, standardEUDateFormat, standardEUTimeFormat,
  convertToUTCtime, getDateTypeFromddmmyyyyWithSep, convertDateTypeToString, convertTimeTypeToString, getTimeTypeFromhhmmWithSep, convertToZoneTime, getClientTimeZone,
} from '../../../utils/DateUtils';
import TimeRangeSelector from '../../TimeRangeSelector/TimeRangeSelector';

import styles from './RangeSelector.css';
import DateTimePicker from '../DateTimePicker';
import DetectClickOutside from './DetectClickOutside';


type OnFunction = (value?: [number, number] | null) => void;
export interface RangeSelectorProps{
  /**
   * Boolean to toggle time display
   */
  dateOnly?: boolean,
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

const RangeSelector: React.FC<RangeSelectorProps> = (({
  dateOnly = false,
  maxDateTime = getFutureDate({ years: 1 }),
  minDateTime = 0,
  labels = ['From', 'To'],
  onChange,
  timeStamps,
  timeZone,
}:RangeSelectorProps) => {

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const [isCalOpen, setCalOpen] = useState<boolean | undefined>(undefined);
  const [internaltTz, setTimezone] = useState('');

  useEffect(() => {
    setTimezone(timeZone || getClientTimeZone());
  }, [timeZone]);

  const clearValues = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleApplyButton = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (startDate && endDate) {
      const startdate = getDateTypeFromddmmyyyyWithSep(standardEUDateFormat(startDate));
      const starttime = getTimeTypeFromhhmmWithSep(standardEUTimeFormat(startDate));

      const enddate = getDateTypeFromddmmyyyyWithSep(standardEUDateFormat(endDate));
      const endtime = getTimeTypeFromhhmmWithSep(standardEUTimeFormat(endDate));

      if (dateOnly && startdate && enddate) {
        onChange([convertToUTCtime(`${convertDateTypeToString(startdate)} 00:00`, internaltTz).valueOf(), convertToUTCtime(`${convertDateTypeToString(enddate)} 00:00`, internaltTz).valueOf()]);
      } else if (!dateOnly && startdate && starttime && enddate && endtime) {
        onChange([convertToUTCtime(`${convertDateTypeToString(startdate)} ${convertTimeTypeToString(starttime)}`, internaltTz).valueOf(), convertToUTCtime(`${convertDateTypeToString(enddate)} ${convertTimeTypeToString(endtime)}`, internaltTz).valueOf()]);
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

  return (
    <DetectClickOutside
      onClick={() => setCalOpen(true)}
      onClickOutside={() => setCalOpen(false)}
      listen
    >
      <>
        <TimeRangeSelector
          timezone={internaltTz}
          from={startDate?.valueOf() || new Date().valueOf()}
          to={endDate?.valueOf() || convertToUTCtime(getFutureDate({ months: 4 }), internaltTz).valueOf()}
          lowerBound={minDateTime}
          upperBound={maxDateTime}
          onChange={(from, to) => {
            setStartDate(convertToZoneTime(from, internaltTz));
            setEndDate(convertToZoneTime(to, internaltTz));
          }}
        />
        {
          isCalOpen && (
            <div className={clsx(styles.calendar, { [styles.dateOnly]: dateOnly, [styles.dateTime]: !dateOnly })}>
              <div className={styles.rangeHeader}>
                <div className={styles.leftbox}>
                  <DateTimePicker
                    closeOnSelect={false}
                    label={labels[0]}
                    endDate={endDate}
                    startDate={startDate}
                    minDateTime={minDateTime}
                    maxDateTime={maxDateTime}
                    onChange={(value) => (value !== undefined ? setStartDate(convertToZoneTime(value, internaltTz)) : setStartDate(value))}
                    timeZone={internaltTz}
                    dateOnly={dateOnly}
                    timeStamp={startDate?.valueOf() || timeStamps?.[0]}
                    calendarOpened
                    selectStart
                  />
                </div>
                <div className={styles.rightbox}>
                  <DateTimePicker
                    closeOnSelect={false}
                    label={labels[1]}
                    endDate={endDate}
                    startDate={startDate}
                    minDateTime={minDateTime}
                    maxDateTime={maxDateTime}
                    onChange={(value) => (value !== undefined ? setEndDate(convertToZoneTime(value, internaltTz)) : setEndDate(value))}
                    timeZone={internaltTz}
                    dateOnly={dateOnly}
                    timeStamp={endDate?.valueOf() || timeStamps?.[1]}
                    selectEnd
                  />
                </div>
              </div>
              <div className={clsx({ [styles.dateTimeFooter]: !dateOnly })}>
                <div className={styles.infoBox}>
                  {`Max. past date: ${standardEUDateFormat(new Date(minDateTime))} `}
                </div>
                <div className={styles.footerButtonsBox}>
                  <Button label="Cancel" type="secondary" onClick={handleCancelButton} />
                  <Button label="Apply" onClick={handleApplyButton} />
                </div>
              </div>
            </div>
          )
        }
      </>
    </DetectClickOutside>
  );
});

RangeSelector.displayName = 'Range Selector';
export default RangeSelector;
