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
      scale={props.scale}
      tickFormat={props.tickFormat}
      tickValues={props.loading ? [] : props.tickValues}
    />
  </div>
);

NumericalAxis.displayName = 'Numerical Axis';

NumericalAxis.defaultProps = {
  loading: false,
  scale: undefined,
  tickFormat: d => d,
  tickValues: undefined,
};

NumericalAxis.propTypes = {
  loading: PropTypes.bool,
  maxValue: PropTypes.number.isRequired,
  position: PropTypes.oneOf(['left', 'bottom']).isRequired,
  scale: PropTypes.func,
  tickFormat: PropTypes.func,
  tickValues: PropTypes.arrayOf(PropTypes.oneOf(['string', 'number'])),
};

export default NumericalAxis;
