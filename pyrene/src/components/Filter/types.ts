import { SingleSelectOption as SingleSelectOpt } from '../SingleSelect/SingleSelectTypes';
import { DefaultValueType } from '../SingleSelect/SingleSelect';
import { Option } from '../MultiSelect/types';

export type MultiSelectOption = Option;
export type SingleSelectOption = Array<SingleSelectOpt<DefaultValueType>>;

export type MultiselectValue = ReadonlyArray<MultiSelectOption>;
export type SingleSelectValue = SingleSelectOpt<DefaultValueType>;
export type InputFieldValue = DefaultValueType;

export type Options = MultiselectValue | SingleSelectValue | InputFieldValue;

export type Filter = {
  id: string,
  label: string,
  negated?: boolean,
  options?: Options,
  sorted?: boolean,
  type: 'singleSelect' | 'multiSelect' | 'text',
};

export type Filters = Record<Filter['id'], Options>;

export type HandleFilterChange = (value: Options, negated: boolean, id: Filter['id']) => void;
