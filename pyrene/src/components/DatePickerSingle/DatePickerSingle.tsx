import React, { FunctionComponent } from 'react';
import getTime from 'date-fns/getTime';
import ReactDatepicker from 'react-datepicker';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import renderCustomHeader from '../DatePicker/renderCustomHeader';
import CustomTimeInput from '../DatePicker/CustomTimeInput';
import styles from './datePickerSingle.css';
import 'react-datepicker/dist/react-datepicker.css';

const DATE_FORMAT = 'dd.MM.yyyy';
const DATETIME_FORMAT = 'dd.MM.yyyy hh:mm aa';

export interface DatePickerSingleProps {
  disabled?: boolean,
  dateOnly?: boolean,
  timezone: string,
  from: number | undefined,
  onChange: (newDate: number) => void,
  lowerBound: number,
  upperBound: number,
}

const DatePickerSingle: FunctionComponent<DatePickerSingleProps> = ({
  disabled = false,
  dateOnly = false,
  timezone,
  from,
  onChange,
  lowerBound,
  upperBound,
}: DatePickerSingleProps) => (
  <div className={styles.wrapper}>
    <ReactDatepicker
      renderCustomHeader={renderCustomHeader}
      disabled={disabled}
      minDate={utcToZonedTime(lowerBound, timezone)}
      maxDate={utcToZonedTime(upperBound, timezone)}
      calendarStartDay={1}
      selected={from ? utcToZonedTime(from, timezone) : undefined}
      showPopperArrow={false}
      showTimeSelect={!dateOnly}
      onChange={(newDate: Date) => onChange(getTime(newDate))}
      timeFormat="hh:mm"
      dateFormat={dateOnly ? DATE_FORMAT : DATETIME_FORMAT}
      formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
      placeholderText={dateOnly ? DATE_FORMAT.toLowerCase() : DATETIME_FORMAT.toLowerCase()}
      customInput={<CustomTimeInput dateOnly={dateOnly} lowerBound={lowerBound} upperBound={upperBound} />}
      popperModifiers={[{
        name: 'offset',
        options: { offset: [0, -10] },
      }]}
    />
  </div>
);

DatePickerSingle.displayName = 'DatePickerSingle';

export default DatePickerSingle;
