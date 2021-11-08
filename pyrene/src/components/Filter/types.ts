import { SingleSelectOption as SingleSelectOpt } from '../SingleSelect/SingleSelectTypes';
import { DefaultValueType } from '../SingleSelect/SingleSelect';
import { Option } from '../MultiSelect/types';

export type MultiselectOption = ReadonlyArray<Option>;
export type SingleSelectOption = SingleSelectOpt<DefaultValueType>;
export type InputFieldOption = DefaultValueType;

export type Options = MultiselectOption | SingleSelectOption | InputFieldOption;

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
