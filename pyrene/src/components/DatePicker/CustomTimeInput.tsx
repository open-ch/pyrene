import React, {
  useState,
  FunctionComponent,
  useEffect,
  forwardRef,
  MouseEventHandler,
  ChangeEvent,
} from 'react';
import clsx from 'clsx';
import { ReactDatePickerProps } from 'react-datepicker';
import { isValidDate, dateValidValidator } from './utils';
import { DateValidator } from './types';
import styles from './customTimeInput.css';

export const DATE_FORMAT = 'dd.MM.yyyy';
export const DATETIME_FORMAT = 'dd.MM.yyyy hh:mm aa';

export type CustomTimeInputProps = {
  dateOnly: boolean,
  dateValidators?: Array<DateValidator>,
  placeholder?: string,
  ariaInvalid?: string,
  onClick?: (e: MouseEventHandler<HTMLInputElement>) => void,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
} & Pick<ReactDatePickerProps,
  'ariaDescribedBy' |
  'ariaLabelledBy' |
  'ariaRequired' |
  'autoComplete' |
  'autoFocus' |
  'className' |
  'disabled' |
  'id' |
  'name' |
  'onBlur' |
  'onFocus' |
  'onKeyDown' |
  'readOnly' |
  'required' |
  'tabIndex' |
  'title' |
  'value'
>;

const CustomTimeInput: FunctionComponent<CustomTimeInputProps> = forwardRef((props, ref) => {
  const { dateValidators, onChange, value, dateOnly, className, ...rest } = props;
  const validators = dateValidators || [dateValidValidator];

  const [inputValue, setInputValue] = useState(value);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dateFormatting = dateOnly ? DATE_FORMAT : DATETIME_FORMAT;

  // when the user select a date in the pop-up calendar, do update the date in the input
  useEffect( () => {
    setInputValue(value);
  }, [value]);

  // do the validation each time the input is updated
  useEffect( () => {
    if (inputValue){
      const dateInvalid = validators.find( (validator) => !validator.isValid(inputValue, dateFormatting));
      
      if(dateInvalid){
        setHasError(true);
        setErrorMessage(dateInvalid.errorMessage);
      }
      else {
        setHasError(false);
        setErrorMessage('');
      }
    }
    else {
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
        <span>{hasError ? errorMessage : ''}</span>
      </div>
    </div>
  )
});

export default CustomTimeInput;
