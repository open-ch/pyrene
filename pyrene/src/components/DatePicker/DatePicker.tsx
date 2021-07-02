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
import 'react-datepicker/dist/react-datepicker.css';

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
    <div>
      <span>This is a Date picker element {firstName}</span>
      <ReactDatePicker onChange={ (e: any) => console.log('inputed', e.target.value)} />
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
