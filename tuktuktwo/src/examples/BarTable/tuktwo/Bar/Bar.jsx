import React from 'react';
import PropTypes from 'prop-types';
import { Bar as VxBar } from '@vx/shape';
import { ParentSize } from '@vx/responsive';

const Bar = props => (
  <ParentSize
    debounceTime={0}
  >
    {(parent) => {
      const scaleFactor = parent.width / props.maxValue;
      return (
        <svg width={parent.width} height={props.barHeight}>
          <VxBar
            x="0"
            y="0"
            height={props.barHeight}
            width={props.value * scaleFactor}
            fill={props.color}
          />
        </svg>
      );
    }}
  </ParentSize>
);

Bar.displayName = 'Bar';

Bar.defaultProps = {
  barHeight: 10,
  color: 'black',
};

Bar.propTypes = {
  barHeight: PropTypes.number,
  color: PropTypes.string,
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default Bar;
