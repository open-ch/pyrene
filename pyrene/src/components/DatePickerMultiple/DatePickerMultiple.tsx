import React, { FunctionComponent } from 'react';
import ReactDatepicker from 'react-datepicker';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import getTime from 'date-fns/getTime';
import renderCustomHeader from '../DatePicker/renderCustomHeader';
import CustomTimeInput, { DATE_FORMAT, DATETIME_FORMAT } from '../DatePicker/CustomTimeInput';
import styles from './datePickerMultiple.css';
import stylesPickerSimple from '../DatePickerSingle/datePickerSingle.css';
import 'react-datepicker/dist/react-datepicker.css';

export interface DatePickerMultipleProps {
  dateOnly?: boolean,
  autoFocus?: boolean,
  timezone: string,
  from: number | undefined,
  to: number | undefined,
  onChange: (newFrom: number, newTo: number) => void,
  lowerBound: number,
  upperBound: number,
}

const getUpperBound = (endDate: Date | undefined, upperBound: number) => {
  let upper;

  if (endDate === undefined) {
    upper = upperBound;
  } else if (getTime(endDate) >= upperBound) {
    upper = upperBound;
  } else {
    upper = getTime(endDate);
  }
  return upper;
};

const getLowerBound = (startDate: Date | undefined, lowerBound: number) => {
  let lower;

  if (startDate === undefined) {
    lower = lowerBound;
  } else if (getTime(startDate) <= lowerBound) {
    lower = lowerBound;
  } else {
    lower = getTime(startDate);
  }
  return lower;
};

const DatePickerMultiple: FunctionComponent<DatePickerMultipleProps> = ({
  dateOnly = false,
  autoFocus = false,
  from,
  to,
  timezone,
  onChange,
  lowerBound,
  upperBound,
}: DatePickerMultipleProps) => {
  const startDate = from ? utcToZonedTime(from, timezone) : undefined;
  const endDate = to ? utcToZonedTime(to, timezone) : undefined;

  return (
    <div className={styles.DatePickerMultiple}>
      <div>
        <span className={styles.DateLabel}>From</span>
        <br />
        <div className={stylesPickerSimple.wrapper}>
          <ReactDatepicker
            renderCustomHeader={renderCustomHeader}
            minDate={utcToZonedTime(lowerBound, timezone)}
            maxDate={endDate}
            autoFocus={autoFocus}
            calendarStartDay={1}
            selected={startDate}
            showPopperArrow={false}
            showTimeSelect={!dateOnly}
            onChange={(newDate: Date) => onChange(getTime(newDate), getTime(endDate as Date))}
            timeFormat="hh:mm"
            dateFormat={dateOnly ? DATE_FORMAT : DATETIME_FORMAT}
            formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
            placeholderText={dateOnly ? DATE_FORMAT.toLowerCase() : DATETIME_FORMAT.toLowerCase()}
            customInput={<CustomTimeInput dateOnly={dateOnly} lowerBound={lowerBound} upperBound={getUpperBound(endDate, upperBound)} />}
            popperPlacement="bottom-start"
            popperModifiers={[{
              name: 'offset',
              options: { offset: [-31, -10] },
            }]}
            selectsStart
          />
        </div>
      </div>
      <div className={styles.DateToWrapper}>
        <span className={styles.DateLabel}>To</span>
        <br />
        <div className={stylesPickerSimple.wrapper}>
          <ReactDatepicker
            renderCustomHeader={renderCustomHeader}
            className={styles.DatePickerTo}
            calendarStartDay={1}
            selected={endDate}
            showPopperArrow={false}
            showTimeSelect={!dateOnly}
            onChange={(newDate: Date) => onChange(getTime(startDate as Date), getTime(newDate))}
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={utcToZonedTime(upperBound, timezone)}
            timeFormat="hh:mm"
            dateFormat={dateOnly ? DATE_FORMAT : DATETIME_FORMAT}
            formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
            placeholderText={dateOnly ? DATE_FORMAT.toLowerCase() : DATETIME_FORMAT.toLowerCase()}
            customInput={<CustomTimeInput dateOnly={dateOnly} lowerBound={getLowerBound(startDate, lowerBound)} upperBound={upperBound} />}
            popperPlacement="bottom-end"
            popperModifiers={[{
              name: 'offset',
              options: { offset: [36, -10] },
            }]}
            selectsEnd
          />
        </div>
      </div>
    </div>
  );
};

DatePickerMultiple.displayName = 'DatePickerMultiple';

export default DatePickerMultiple;
