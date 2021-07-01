import React, {
    forwardRef,
    useCallback,
    useEffect,
    useState,
    FunctionComponent,
  } from 'react';
import clsx from 'clsx';
import { EuiDatePicker, EuiDatePickerRange } from '@elastic/eui';
import Icon from '../Icon/Icon';

// import styles from './datePicker.css';

export interface DatePickerProps {
    firstName: string;
}

  
const DatePicker: FunctionComponent<DatePickerProps> = ({
    firstName
}: DatePickerProps) => {

    return (
        <div>
            Date picker {firstName}
            <input value={firstName} />
        </div>
    );
}

DatePicker.displayName = 'DatePicker';

export default DatePicker;