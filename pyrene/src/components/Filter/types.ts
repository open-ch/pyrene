import { SingleSelectProps } from '../SingleSelect/SingleSelect';
import { IconProps } from '../Icon/Icon';

export type SingleSelectValue = SingleSelectProps<unknown>['value'];
export type MultiselectValue = Array<{iconProps?: IconProps, label: string, value?: string | number | boolean}>;
export type TextFieldValue = string;
export type FilterValues = {
 [key: string]: MultiselectValue | SingleSelectValue | TextFieldValue
}

export type Option = {
    /** text displayed to the user in the filter dropdown */
    label: string,
    /** key for manipulation */
    value: string | number | boolean,
}

export type Filter = {
    id: string,
    label: string,
    negated?: boolean,
    options?: Array<Option>,
    sorted?: boolean,
    type: 'singleSelect' | 'multiSelect' | 'text',
}