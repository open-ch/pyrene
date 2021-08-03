import {
    MouseEventHandler,
    ChangeEvent
} from 'react';
import { ReactDatePickerProps } from 'react-datepicker';

export type CustomTimeInputProps = {
    dateOnly: boolean,
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