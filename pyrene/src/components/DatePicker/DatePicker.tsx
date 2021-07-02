import React, {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  FunctionComponent,
} from 'react';
import clsx from 'clsx';
import ReactDatePicker from 'react-datepicker';
import Icon from '../Icon/Icon';

// import styles from './datePicker.css';

export interface DatePickerProps {
  firstName: string;
}


const DatePicker: FunctionComponent<DatePickerProps> = ({
  firstName,
}: DatePickerProps) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date: Date) => {
    setStartDate(date);
  };

  return (
    <a href="https://google.com" target="_blank" />
  /* </img><ReactDatePicker /> */
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
