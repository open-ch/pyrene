
export interface SingleSelectOption {
  label: string;
  value?: string | number | boolean;
  iconProps?: { // FixMe: use Icon Props interface one it's converted to typescript
    color?: string;
    name?: string;
    svg?: string;
    type?: 'standalone' | 'inline'
  }
}
export interface SingleSelectGroupedOption {
  label: string;
  options?: SingleSelectOption[];
  value?: string | number | boolean;
}
