/* eslint-disable react/prop-types */
import React, {
  useState,
  useEffect,
  forwardRef,
  MouseEventHandler,
  ChangeEvent,
  useReducer,
} from 'react';
import clsx from 'clsx';
import { ReactDatePickerProps } from 'react-datepicker';
import Icon from '../Icon/Icon';
import { isValidDate, dateValidators } from './utils';
import styles from './customTimeInput.css';

export const DATE_FORMAT = 'dd.MM.yyyy';
export const DATETIME_FORMAT = 'dd.MM.yyyy hh:mm aa';

// the following props are injected by react-datepicker
type InjectedProps = {
  onClick?: (e: MouseEventHandler<HTMLInputElement>) => void, // missing in @types/react-datepicker
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void, // missing in @types/react-datepicker
  placeholder?: string | undefined, // missing in @types/react-datepicker
} & Pick<ReactDatePickerProps,
'ariaDescribedBy' |
'ariaInvalid' |
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

const validating = 'inputValidating';

export type CustomTimeInputProps = InjectedProps & {
  dateOnly: boolean,
  lowerBound: number,
  upperBound: number,
};

interface State {
  hasError: boolean,
  errorMessage: string,
}

interface Action {
  type: typeof validating,
}

interface InputValidatingAction extends Action {
  type: typeof validating,
  payload: {
    hasError: boolean,
    errorMessage: string,
  }
}

const reducer = (state: State, action: InputValidatingAction): State => {
  switch (action.type) {
    case validating:
      return { ...action.payload };
    default: {
      return { ...state };
    }
  }
};

const CustomTimeInput = forwardRef<HTMLInputElement, CustomTimeInputProps>((props, ref) => {
  const {
    onChange, value, dateOnly, className, disabled, lowerBound, upperBound, ...rest
  } = props;

  // the local state inputValue is there only to check if the entered date is valid. So only valid date get propagated to parent
  const [inputValue, setInputValue] = useState(value);
  const [state, dispatch] = useReducer(reducer, { hasError: false, errorMessage: '' });

  const dateFormatting = dateOnly ? DATE_FORMAT : DATETIME_FORMAT;

  // when the user select a date in the pop-up calendar, do update the date in the input
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // do the validation on every user's keystroke
  useEffect(() => {
    if (inputValue) {
      const dateInvalid = dateValidators.find((validator) => !validator.isValid({
        dateString: inputValue, formatPattern: dateFormatting, lowerBound, upperBound,
      }));

      dispatch({
        type: validating,
        payload: {
          hasError: !!dateInvalid,
          errorMessage: dateInvalid ? dateInvalid.errorMessage : '',
        },
      });
    } else {
      dispatch({
        type: validating,
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
      <div className={clsx(styles.inputWrapper, {
        [styles.borderDefault]: !state.hasError,
        [styles.borderError]: state.hasError,
        [styles.disabled]: disabled,
      })}
      >
        <Icon type="inline" name="calendar" color="neutral-500" />
        <input
          {...rest as Omit<CustomTimeInputProps, 'dateOnly' | 'lowerBound' | 'className' | 'upperBound' | 'value' | 'disabled' | 'onChange' | 'onClick'>}
          ref={ref}
          disabled={disabled}
          value={inputValue}
          className={clsx(styles.input, className)}
          onChange={(e) => {
            const enteredDate = e.target.value;
            setInputValue(enteredDate);

            // if enteredDate is valid, then propagate the new date to the parent component (react-datepicker) which updates the calendar
            if (isValidDate({ dateString: enteredDate, formatPattern: dateFormatting })) {
              onChange?.(e);
            }
          }}
        />
      </div>
      <div className={styles.messageWrapper}>
        <span>{state.hasError ? state.errorMessage : ''}</span>
      </div>
    </div>
  );
});

export default CustomTimeInput;
