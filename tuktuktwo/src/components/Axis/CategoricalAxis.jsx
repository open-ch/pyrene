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
    />
  </div>
);

CategoricalAxis.displayName = 'Categorical Axis';

CategoricalAxis.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  position: PropTypes.oneOf(['left', 'bottom']).isRequired,
};

export default CategoricalAxis;
