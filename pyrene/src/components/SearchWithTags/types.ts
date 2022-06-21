import { CSSProperties } from 'react';

export interface OptionStyle {
  color: CSSProperties['color'];
  backgroundColor: CSSProperties['backgroundColor'];
}

export interface Option {
  invalid?: boolean;
  label: string;
  value: string;
  tag?: string;
  style?: OptionStyle;
}

export interface Tag extends Omit<Option, 'label' | 'invalid'> {
  validate?: (tagValue: string, currentValue: Option[]) => boolean;
}
