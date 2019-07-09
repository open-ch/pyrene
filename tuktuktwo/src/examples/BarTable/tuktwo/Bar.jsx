import React from 'react';
import PropTypes from 'prop-types';
import { Bar as VxBar } from '@vx/shape';

const Bar = (props) => {
  const scaleFactor = props.maxBarWidth / props.maxValue;
  return (
    <svg width={props.maxBarWidth} height={props.barHeight}>
      <VxBar
        x="0"
        y="0"
        height={props.barHeight}
        width={props.value * scaleFactor}
        fill={props.color}
      />
    </svg>
  );
};

Bar.displayName = 'Bar';

Bar.defaultProps = {
  barHeight: 10,
  maxBarWidth: 250,
  color: 'black',
};

Bar.propTypes = {
  barHeight: PropTypes.number,
  color: PropTypes.string,
  maxBarWidth: PropTypes.number,
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default Bar;
