import React from 'react';
import PropTypes from 'prop-types';
import './labelAndValue.css';


const LabelAndValue = ({
  label,
  size,
  value,
}) => (
  <div styleName={`label-and-value label-and-value-${size}`}>
    <div styleName="label">{label}</div>
    <div styleName="value">{value}</div>
  </div>
);

LabelAndValue.displayName = 'Label And Value';

LabelAndValue.defaultProps = {
  label: '',
  size: 'small',
  value: '',
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
   * The value.
   */
  value: PropTypes.string,
};

export default LabelAndValue;
