import React, { useRef, useState } from 'react';
import Button from '../../Button/Button';
import { standardEUDateFormat, standardEUTimeFormat } from '../../../utils/DateUtils';
import TimeRangeSelector from '../../TimeRangeSelector/TimeRangeSelector';
import DateTimeInput, { InputProps } from '../DateTimeInput/DateTimeInputNoRefs';
import ReactDPWrapper, { CalendarContainer, CalendarProps } from '../ReactDatePickerWrapper/ReactDatePickerWrapper';

import styles from './DateTimeRangeSelector.css';

export interface DateTimeRangeSelectorProps {
  dateOnly?: boolean,
  endDate?: Date,
  errorValue?: string,
  handleOn?: (dateString: string, timeString: string, func:(event:any) => void) => void
  invalidTimestamp?: boolean,
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
  onBlur?: () => void,
  name?: string,
}

const InputComp = ({
  dateValue = '',
  handleOn = () => {},
  timeValue,
  errorValue,
  invalidTimestamp,
  label,
  name,
  onBlur,
  range,
  setDateValue,
  setTimeValue,
  dateOnly,
}: InputProps) => (
  <DateTimeInput
    dateValue={dateValue}
    handleOn={handleOn}
    timeValue={timeValue}
    errorValue={errorValue}
    invalidTimestamp={invalidTimestamp}
    label={label}
    onBlur={onBlur}
    range={range}
    setDateValue={setDateValue}
    setTimeValue={setTimeValue}
    dateOnly={dateOnly}
    // onChange={(event) => onChange(startDate || null, event)}
  />
);

const DateTimeRangeSelector: React.FC<DateTimeRangeSelectorProps> = (({
  dateOnly = false,
  endDate,
  errorValue = '',
  handleOn,
  invalidTimestamp,
  inline = false,
  minDate,
  maxDate,
  name = '',
  startDate,
  startDateValue = '',
  endDateValue = '',
  startTimeValue = '',
  endTimeValue = '',
  setEndDateValue,
  setEndTimeValue,
  setStartDateValue,
  setStartTimeValue,
  timeZone = '',
  onBlur,
  onChange,
}:DateTimeRangeSelectorProps) => {

  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  const range = true;
  const [message, setMessage] = useState('');

  const footer = () => (
    <>
      <div className={styles.rangeFooter}>
        <div className={styles.infoBox}>
          {message || `Max. past date: ${minDate ? standardEUDateFormat(minDate) : standardEUDateFormat(new Date(0))} `}
        </div>
        <div className={styles.footerButtonsBox}>
          <Button label="Discard" type="secondary" />
          <Button label="Apply" />
        </div>
      </div>
    </>
  );

  function Calendar({ className, children }: CalendarProps) {
    return (
      <>
        <div className={styles.rangeHeader}>
          <div className={styles.leftbox}>
            <InputComp
              dateValue={startDateValue}
              handleOn={handleOn}
              timeValue={startTimeValue}
              errorValue={errorValue}
              invalidTimestamp={invalidTimestamp}
              label="From"
              name={`${name}_from_`}
              onBlur={onBlur}
              range={range}
              setDateValue={setStartDateValue}
              setTimeValue={setStartTimeValue}
              dateOnly={dateOnly}
              // onChange={(event) => onChange(startDate || null, event)}
            />
          </div>
          <div className={styles.rightbox}>
            <DateTimeInput
              dateValue={endDateValue}
              handleOn={handleOn}
              timeValue={endTimeValue}
              errorValue={errorValue}
              invalidTimestamp={invalidTimestamp}
              label="To"
              name={`${name}_to_`}
              onBlur={onBlur}
              range={range}
              setDateValue={setEndDateValue}
              setTimeValue={setEndTimeValue}
              dateOnly={dateOnly}
              // onChange={(event) => onChange(endDate || null, event)}
            />
          </div>
        </div>
        <CalendarContainer className={className}>
          <div style={{ position: 'relative' }}>{children}</div>
        </CalendarContainer>
        {footer()}
      </>
    );
  }

  return (
    <>
      {Calendar({ className: '', children: [] })}

      <ReactDPWrapper
        closeOnSelect={false}
        customCalendar={({ children }) => Calendar({ className: '', children })}
        endDate={endDate}
        onChange={(date, event) => onChange(date, event, 'start')}
        selectedDate={startDate}
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
      />
    </>
  );
});

DateTimeRangeSelector.displayName = 'Time Range Selector';
export default DateTimeRangeSelector;
