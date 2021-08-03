import React, {
    useState,
    FunctionComponent,
    useEffect,
    forwardRef,
  } from 'react';
import clsx from 'clsx';
import { parse, isValid } from 'date-fns';
import { CustomTimeInputProps } from './types';
import styles from './customTimeInput.css';

export const DATE_FORMAT = 'dd.MM.yyyy';
export const DATETIME_FORMAT = 'dd.MM.yyyy hh:mm aa';

const isValidDate = (dateString: string, formatting: string) => isValid(parse(dateString, formatting, new Date()));

const CustomTimeInput: FunctionComponent<CustomTimeInputProps> = forwardRef((props, ref) => {
  const { onChange, value, dateOnly, className, ...rest } = props;

  const [inputValue, setInputValue] = useState(value);
  const [hasError, setHasError] = useState(false);

  const dateFormatting = dateOnly ? DATE_FORMAT : DATETIME_FORMAT;

  // when the user select a date in the pop-up calendar, do update the date in the input
  useEffect( () => {
    setInputValue(value);
  }, [value]);

  // do the validation each time the input is updated
  useEffect( () => {
    if(inputValue && !isValidDate(inputValue, dateFormatting)){
      setHasError(true);
    }
    else{
      setHasError(false);
    }
  }, [inputValue]);

  return (
    <div>
      <input
        {...rest as any}
        ref={ref as any}
        value={inputValue}
        className={clsx(className, { [styles.dateInvalidInput]: hasError })}
        onChange={(e) => {
          const enterredDate = e.target.value;
          setInputValue(enterredDate);

          // if enterred date is a valid date, then refect that one in the pop-up calendar
          if(isValidDate(enterredDate, dateFormatting)){
            onChange?.(e);
          }
        }}
      />
      <div className={styles.dateInvalidWrapper}>
          <span>{hasError ? 'issue in the formatting' : ''}</span>
      </div>
    </div>
  )
});

export default CustomTimeInput;