import React, {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  FunctionComponent,
} from 'react';
import clsx from 'clsx';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './datePicker.css';

export interface DatePickerProps {
  firstName: string;
}

const DatePicker: FunctionComponent<DatePickerProps> = ({
  firstName,
}: DatePickerProps) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date: Date) => {
    console.log('onchange', date);
    setStartDate(date);
  };

  return (
    <div>
      <div>This is a Date picker element {firstName}</div>
      <ReactDatePicker selected={startDate} onChange={handleChange} />
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
