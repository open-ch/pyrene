import { IconProps } from '../Icon/Icon';

export type SingleSelectOption<ValueType> = {
  label: string;
  iconProps?: IconProps
  tags?: string[];
  value?: ValueType;
};

export type SingleSelectGroupedOption<ValueType> = {
  label: string;
  options?: SingleSelectOption<ValueType>[];
  value?: ValueType;
};
