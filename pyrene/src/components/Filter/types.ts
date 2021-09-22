import { SingleSelectProps } from '../SingleSelect/SingleSelect';
import { Option } from '../MultiSelect/types';

export type MultiSelectOption = Option;

export type SingleSelectValue = SingleSelectProps<unknown>['value'];
export type MultiselectValue = Array<MultiSelectOption>;
export type TextFieldValue = string;
export type InputValue = MultiselectValue | SingleSelectValue | TextFieldValue;

export type FilterValues = {
  [key: string]: InputValue
};

export type SingleSelectOption = SingleSelectProps<unknown>['options'];

export type Filter = {
  id: string,
  label: string,
  negated?: boolean,
  options: Array<SingleSelectOption | MultiSelectOption>,
  sorted?: boolean,
  type: 'singleSelect' | 'multiSelect' | 'text',
};

export type HandleFilterChange = (option: any, negated: boolean, id: string) => void;
