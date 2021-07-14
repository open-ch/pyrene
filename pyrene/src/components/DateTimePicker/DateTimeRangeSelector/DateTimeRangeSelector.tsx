import React, { useState } from 'react';
import { standardEUDateFormat, standardEUTimeFormat } from '../../../utils/DateUtils';
import TimeRangeSelector from '../../TimeRangeSelector/TimeRangeSelector';
import DateTimeInput from '../DateTimeInput/DateTimeInput';
import ReactDPWrapper, { CalendarContainer, CalendarProps } from '../ReactDatePickerWrapper/ReactDatePickerWrapper';

import styles from './DateTimeRangeSelector.css';

export interface DateTimeRangeSelectorProps {
  dateOnly?: boolean,
  endDate?: Date,
  errorValue?: string,
  handleOn?: (dateString: string, timeString: string, func:(event:any) => void) => void
  invalidTimestamp?: boolean,
  startDate?: Date,
  setEndDateValue?: (value: string) => void,
  setEndTimeValue?: (value: string) => void,
  setStartDateValue?: (value: string) => void,
  setStartTimeValue?: (value: string) => void,
  timeZone: string,
  maxDate?: Date,
  minDate?: Date,
  onChange: (date:Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined, rangePos?:string) => void
  onBlur?: () => void,
  name?: string,
}

const DateTimeRangeSelector: React.FC<DateTimeRangeSelectorProps> = (({
  dateOnly = false,
  endDate,
  errorValue = '',
  handleOn,
  invalidTimestamp,
  name = '',
  startDate,
  setEndDateValue,
  setEndTimeValue,
  setStartDateValue,
  setStartTimeValue,
  timeZone = '',
  onBlur,
  onChange,
}:DateTimeRangeSelectorProps) => {

  const range = true;
  const [message, setMessage] = useState('');

  const header = ({ className, children }: CalendarProps) => (
    <>
      <div className={styles.rangeHeader}>
        <div className={styles.leftbox}>
          <DateTimeInput
            dateValue={startDate ? standardEUDateFormat(startDate) : ''}
            handleOn={handleOn}
            timeValue={startDate ? standardEUTimeFormat(startDate) : ''}
            errorValue={errorValue}
            invalidTimestamp={invalidTimestamp}
            label="From"
            name={name}
            onBlur={onBlur}
            range={range}
            setDateValue={setStartDateValue}
            setTimeValue={setStartTimeValue}
            dateOnly={dateOnly}
          />
        </div>
        <div className={styles.rightbox}>
          <DateTimeInput
            dateValue={endDate ? standardEUDateFormat(endDate) : ''}
            handleOn={handleOn}
            timeValue={endDate ? standardEUTimeFormat(endDate) : ''}
            errorValue={errorValue}
            invalidTimestamp={invalidTimestamp}
            label="To"
            name={name}
            onBlur={onBlur}
            range={range}
            setDateValue={setEndDateValue}
            setTimeValue={setEndTimeValue}
            dateOnly={dateOnly}
          />
        </div>
      </div>
      <CalendarContainer className={className}>
        <div style={{ position: 'relative' }}>{children}</div>
      </CalendarContainer>

    </>
  );

  const footer = () => (
    <>
      <div>
        <div>
          {message && message}
        </div>
        <div>
          <button type="button">Apply</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <ReactDPWrapper
        customHeader={header}
        endDate={endDate}
        onChange={(date, event) => onChange(date, event, 'start')}
        selectedDate={startDate}
        shouldDisplayTimeColumn={!dateOnly}
        startDate={startDate}
        range={range}
        CustomInput={(
          <TimeRangeSelector
            timezone="Europe/Zurich"
            from={0}
            to={23478903000}
            lowerBound={-1000}
            upperBound={33095430000}
            onChange={(val: any) => { console.log(val); }}
          />
        )}
      >
        {footer()}
      </ReactDPWrapper>
    </>
  );
});

DateTimeRangeSelector.displayName = 'Time Range Selector';
export default DateTimeRangeSelector;
