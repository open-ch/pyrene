import React, {
  useState,
  FunctionComponent,
} from 'react';
import ReactDatepicker from 'react-datepicker';
import CustomTimeInput, { DATE_FORMAT, DATETIME_FORMAT } from '../DatePicker/CustomTimeInput';
import styles from './datePickerMultiple.css';
import 'react-datepicker/dist/react-datepicker.css';

export interface DatePickerMultipleProps {
  dateOnly?: boolean,
}

const DatePickerMultiple: FunctionComponent<DatePickerMultipleProps> = ({
  dateOnly=false,
}: DatePickerMultipleProps) => {

  const [startDate, setStartDate] = useState<null | Date>(null);
  const [endDate, setEndDate] = useState<null | Date>(null);

  const dateValidator = {

  };
  
  return (  
    <div className={styles.Wrapper}>
      <div>
        <label>
          From
          <br />
          <ReactDatepicker
            calendarStartDay={1}
            selected={startDate}
            showPopperArrow={false}
            showTimeSelect={!dateOnly}
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            timeFormat="hh:mm"
            dateFormat={dateOnly ? DATE_FORMAT : DATETIME_FORMAT}
            formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
            placeholderText={dateOnly ? DATE_FORMAT.toLowerCase() : DATETIME_FORMAT.toLowerCase()}
            customInput={<CustomTimeInput dateOnly={dateOnly}/>}
          />
        </label>
      </div>
      <div className={styles.DatePickerToWrapper}>
        <label>
          To
          <br />
          <ReactDatepicker
            className={styles.DatePickerTo}
            calendarStartDay={1}
            selected={endDate}
            showPopperArrow={false}
            showTimeSelect={!dateOnly}
            onChange={(date: Date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            timeFormat="hh:mm"
            dateFormat={dateOnly ? DATE_FORMAT : DATETIME_FORMAT}
            formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
            placeholderText={dateOnly ? DATE_FORMAT.toLowerCase() : DATETIME_FORMAT.toLowerCase()}
            customInput={<CustomTimeInput dateOnly={dateOnly}/>}
          />
        </label>
      </div>
    </div>
  );
};

DatePickerMultiple.displayName = 'DatePickerMultiple';

export default DatePickerMultiple;
