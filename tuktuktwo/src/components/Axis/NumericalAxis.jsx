import React from 'react';
import PropTypes from 'prop-types';
import Axis from './Axis';

const NumericalAxis = props => (
  <Axis
    maxValue={props.maxValue}
    position={props.position}
  />
);

NumericalAxis.displayName = 'Numerical Axis';

NumericalAxis.propTypes = {
  maxValue: PropTypes.number.isRequired,
  position: PropTypes.oneOf(['left', 'bottom']).isRequired,
};

export default NumericalAxis;
