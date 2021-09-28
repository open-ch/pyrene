import { SingleSelectProps } from '../SingleSelect/SingleSelect';
import { Option } from '../MultiSelect/types';

export type MultiSelectOption = Option;
export type SingleSelectOption = SingleSelectProps['options'];

export type SingleSelectValue = SingleSelectProps['value'];
export type MultiselectValue = Array<MultiSelectOption>;
export type TextFieldValue = string;
export type InputValue = MultiselectValue | SingleSelectValue | TextFieldValue;

export type Filter = {
  id: string,
  label: string,
  negated?: boolean,
  options: Array<SingleSelectOption | MultiSelectOption>,
  sorted?: boolean,
  type: 'singleSelect' | 'multiSelect' | 'text',
};

export type Options = Array<MultiSelectOption> | MultiSelectOption | SingleSelectOption | TextFieldValue;

export type FilterValues = Record<Filter['id'], Options>;

export type HandleFilterChange = (option: any, negated: boolean, id: Filter['id']) => void;
