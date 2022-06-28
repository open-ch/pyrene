import { CSSProperties } from 'react';

export interface OptionStyle {
  color: CSSProperties['color'];
  backgroundColor: CSSProperties['backgroundColor'];
}

export interface TagValue {
  invalid?: boolean;
  label: string;
  value: string;
  tag?: string;
  style?: OptionStyle;
}

export interface Tag extends Omit<TagValue, 'label' | 'invalid' | 'tag'> {
  validate?: (tagValue: string, currentValue: TagValue[]) => boolean;
  options?: OptionType[];
}

export interface OptionType {
  value: string;
  label: string;
}
