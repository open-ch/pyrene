import React, { ReactElement, FunctionComponent } from 'react';
import clsx from 'clsx';

import styles from './datepicker.css';

export interface DatePickerProps {

}

const DatePicker: FunctionComponent<DatePickerProps> = ({

}: DatePickerProps) => (

  <div className={styles.container}>
      <input type='date' />
  </div>
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
