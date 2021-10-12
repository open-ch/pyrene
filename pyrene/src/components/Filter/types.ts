import { SingleSelectOption as SingleSelectOpt } from '../SingleSelect/SingleSelectTypes';
import { DefaultValueType } from '../SingleSelect/SingleSelect';
import { Option } from '../MultiSelect/types';

export type MultiSelectOption = Option;
export type SingleSelectOption = Array<SingleSelectOpt<DefaultValueType>>;

export type SingleSelectValue = SingleSelectOpt<DefaultValueType>;
export type MultiselectValue = ReadonlyArray<MultiSelectOption>;
export type InputFieldValue = DefaultValueType;

export type Filter = {
  id: string,
  label: string,
  negated?: boolean,
  options?: Array<SingleSelectOption | MultiSelectOption>,
  sorted?: boolean,
  type: 'singleSelect' | 'multiSelect' | 'text',
};

export type Value = MultiselectValue | SingleSelectValue | InputFieldValue;

export type FilterValues = Record<Filter['id'], Value>;

export type HandleFilterChange = (value: Value, negated: boolean, id: Filter['id']) => void;
