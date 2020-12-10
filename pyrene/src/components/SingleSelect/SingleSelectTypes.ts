import { IconProps } from '../Icon/Icon';

export interface SingleSelectOption {
  label: string;
  /**
   * Hidden tags to eaze the searching. There are not displayed.
   */
  tags?: string[];
  value?: string | number | boolean;
  iconProps?: IconProps
}
export interface SingleSelectGroupedOption {
  label: string;
  options?: SingleSelectOption[];
  value?: string | number | boolean;
}
