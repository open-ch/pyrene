import { IconProps } from '../Icon/Icon';

export type SingleSelectOption<ValueType> = {
  iconProps?: IconProps
  label: string;
  tags?: string[];
  value?: ValueType;
};

export type SingleSelectGroupedOption<ValueType> = {
  label: string;
  options?: SingleSelectOption<ValueType>[];
  value?: ValueType;
};
