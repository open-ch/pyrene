import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import './labelAndValue.css';

export interface LabelAndValueProps {
  label?: string;
  size?: 'tiny' | 'small' | 'large';
  value?: string;
  type?: 'neutral' | 'info' | 'warning' | 'danger' | 'success';
}

const LabelAndValue: React.FC<LabelAndValueProps> = ({
  label,
  size,
  value,
  type = 'neutral',
}: LabelAndValueProps) => (
  <div styleName={`label-and-value label-and-value-${size}`}>
    <div styleName="label">{label}</div>
    <div styleName={className('value', { [`type-${type}`]: true })}>{value}</div>
  </div>
);

LabelAndValue.displayName = 'Label And Value';

LabelAndValue.defaultProps = {
  label: '',
  size: 'small',
  value: '',
  type: 'neutral',
};

LabelAndValue.propTypes = {
  /**
   * The label
   */
  label: PropTypes.string,
  /**
   * The font size of the value (small or large)
   */
  size: PropTypes.oneOf(['tiny', 'small', 'large']),
  /**
   * Sets the overall style according to the value type.
   */
  type: PropTypes.oneOf(['neutral', 'info', 'warning', 'danger', 'success']),
  /**
   * The value.
   */
  value: PropTypes.string,
};

export default LabelAndValue;
