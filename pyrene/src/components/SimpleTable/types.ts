import { IconNames } from '../types';

export interface Action<R> {
  label: string;
  icon?: keyof IconNames;
  onClick: (row: R) => void;
}

export type ExtendsRow<R> = R & {
  value?: string | number;
};
