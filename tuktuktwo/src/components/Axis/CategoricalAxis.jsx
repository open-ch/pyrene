import React from 'react';
import PropTypes from 'prop-types';
import Axis from './Axis';

const CategoricalAxis = props => (
  <Axis
    labels={props.labels}
    position={props.position}
  />
);

CategoricalAxis.displayName = 'Categorical Axis';

CategoricalAxis.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  position: PropTypes.oneOf(['left', 'bottom']).isRequired,
};

export default CategoricalAxis;
