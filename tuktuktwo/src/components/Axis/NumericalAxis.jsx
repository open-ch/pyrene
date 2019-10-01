import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Axis from './Axis';
import './axis.css';

const NumericalAxis = props => (
  <div styleName={classNames({ axisLeft: props.position === 'left', axisLeftNarrow: props.position === 'left', axisBottom: props.position === 'bottom' })}>
    <Axis
      maxValue={props.maxValue}
      position={props.position}
    />
  </div>
);

NumericalAxis.displayName = 'Numerical Axis';

NumericalAxis.propTypes = {
  maxValue: PropTypes.number.isRequired,
  position: PropTypes.oneOf(['left', 'bottom']).isRequired,
};

export default NumericalAxis;
