
export type SingleSelectOption<ValueType> = {

  label: string;
  value?: ValueType;
  iconProps?: { // FixMe: use Icon Props interface one it's converted to typescript
    color?: string;
    name?: string;
    svg?: string;
    type?: 'standalone' | 'inline'
  }
};
export type SingleSelectGroupedOption<ValueType> = {
  label: string;
  options?: SingleSelectOption<ValueType>[];
  value?: ValueType;
};
