import { IconProps } from '../Icon/Icon';

export interface Option {
  iconProps?: IconProps,
  label: string,
  value: string,
  invalid?: boolean,
}
