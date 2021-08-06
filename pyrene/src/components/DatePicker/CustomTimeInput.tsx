import React, {
  useState,
  FunctionComponent,
  useEffect,
  forwardRef,
  MouseEventHandler,
  ChangeEvent,
  useReducer,
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

interface State {
  hasError: boolean,
  errorMessage: string,
}

interface Action {
  type: 'inputValidating'
}

interface InputValidatingAction extends Action {
  type: 'inputValidating',
  payload: {
    hasError: boolean,
    errorMessage: string,
  }
}

const reducer = (state: State, action: InputValidatingAction): State=> {
  switch (action.type) {
    case 'inputValidating':
      return {
        ...action.payload,
      };

    default: {
      return { ...state };
    }
  }
};

const CustomTimeInput: FunctionComponent<CustomTimeInputProps> = forwardRef((props, ref) => {
  const { dateValidators, onChange, value, dateOnly, className, ...rest } = props;
  const validators = dateValidators || [dateValidValidator];

  const [inputValue, setInputValue] = useState(value);
  const [state, dispatch] = useReducer(reducer, { hasError: false, errorMessage: '' });

  const dateFormatting = dateOnly ? DATE_FORMAT : DATETIME_FORMAT;

  // when the user select a date in the pop-up calendar, do update the date in the input
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // do the validation each time the input is updated
  useEffect(() => {
    if (inputValue) {
      const dateInvalid = validators.find((validator) => !validator.isValid(inputValue, dateFormatting));
      dispatch({
        type: 'inputValidating',
        payload: {
          hasError: !!dateInvalid,
          errorMessage: dateInvalid ? dateInvalid.errorMessage : '',
        },
      });
    } else {
      dispatch({
        type: 'inputValidating',
        payload: {
          hasError: false,
          errorMessage: '',
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div>
      <input
        {...rest as any}
        ref={ref as any}
        value={inputValue}
        className={clsx(className, { [styles.dateInvalidInput]: state.hasError })}
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
        <span>{state.hasError ? state.errorMessage : ''}</span>
      </div>
    </div>
  );
});

export default CustomTimeInput;
  