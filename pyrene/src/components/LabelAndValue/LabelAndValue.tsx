import React from 'react';
import className from 'classnames';

import './labelAndValue.css';

export interface LabelAndValueProps {
  /**
   * The label
   */
  label?: string;
  /**
   * The font size of the value (small or large)
   */
  size?: 'tiny' | 'small' | 'large';
  /**
   * Sets the overall style according to the value type.
   */
  type?: 'neutral' | 'info' | 'warning' | 'danger' | 'success';
  /**
   * The value.
   */
  value?: string;
}

/**
 * Show a label and its value as a highlight.
 */
const LabelAndValue: React.FC<LabelAndValueProps> = ({
  label = '', size = 'small', value = '', type = 'neutral',
}: LabelAndValueProps) => (
  <div styleName={`label-and-value label-and-value-${size}`}>
    <div styleName="label">{label}</div>
    <div styleName={className('value', { [`type-${type}`]: true })}>{value}</div>
  </div>
);

LabelAndValue.displayName = 'Label And Value';

export default LabelAndValue;
