import { IconProps } from '../Icon/Icon';

export interface Option {
  iconProps?: IconProps,
  invalid?: boolean,
  label: string,
  value: string,
}
