import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Axis from './Axis';
import './axis.css';

const CategoricalAxis = props => (
  <div styleName={classNames({ axisLeft: props.position === 'left', axisLeftWide: props.position === 'left', axisBottom: props.position === 'bottom' })}>
    <Axis
      labels={props.labels}
      position={props.position}
      tickFormat={props.tickFormat}
      tickValues={props.loading ? [] : props.tickValues}
    />
  </div>
);

CategoricalAxis.displayName = 'Categorical Axis';

CategoricalAxis.defaultProps = {
  tickFormat: d => d,
  loading: false,
  tickValues: undefined,
};

CategoricalAxis.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'bottom']).isRequired,
  tickFormat: PropTypes.func,
  tickValues: PropTypes.arrayOf(PropTypes.oneOf(['string', 'number'])),
};

export default CategoricalAxis;
