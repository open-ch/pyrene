import React from 'react';
import PropTypes from 'prop-types';
import { BarStackHorizontal } from '@vx/shape';
import { ParentSize } from '@vx/responsive';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';

const RelativeBar = props => (
  <ParentSize>
    {(parent) => {
      const keys = [
        'value',
        'rest',
      ];
      const data = [{
        value: props.value,
        rest: props.maxValue - props.value,
        y: 0,
      },
      ];
      const xScale = scaleLinear({
        domain: [0, props.maxValue],
        rangeRound: [0, parent.width],
      });
      const yScale = scaleBand({
      });
      const color = scaleOrdinal({
        domain: keys,
        range: [props.colorScheme.primary, props.colorScheme.secondary],
      });
      return (
        <svg width={parent.width} height={props.barHeight}>
          <BarStackHorizontal
            y={d => d}
            height={props.barHeight}
            data={data}
            keys={keys}
            xScale={xScale}
            yScale={yScale}
            color={color}
          />
        </svg>
      );
    }}
  </ParentSize>
);

RelativeBar.displayName = 'Relative Bar';

RelativeBar.defaultProps = {
  barHeight: 10,
  colorScheme: {
    primary: 'blue',
    secondary: 'lightblue',
  },
};

RelativeBar.propTypes = {
  barHeight: PropTypes.number,
  colorScheme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default RelativeBar;
