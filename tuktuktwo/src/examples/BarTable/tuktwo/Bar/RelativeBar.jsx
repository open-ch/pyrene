import React from 'react';
import PropTypes from 'prop-types';
import { BarStackHorizontal } from '@vx/shape';
import { ParentSize } from '@vx/responsive';
import { scaleLinear, scaleOrdinal } from '@vx/scale';

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
      const y = d => d.y;
      const xScale = scaleLinear({
        domain: [0, props.maxValue],
        rangeRound: [0, parent.width],
      });
      const yScale = scaleLinear({
        domain: data.map(y),
      });
      const color = scaleOrdinal({
        domain: keys,
        range: [props.colorScheme.primary, props.colorScheme.secondary],
      });
      return (
        <svg width={parent.width} height={props.barHeight}>
          <BarStackHorizontal
            y={d => d.y}
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

RelativeBar.displayName = 'Bar Stack';

RelativeBar.defaultProps = {
  barHeight: 10,
  colorScheme: {
    primary: 'blue',
    secondary: 'lightblue',
  },
};

RelativeBar.propTypes = {
  barHeight: PropTypes.number,
  colorScheme: PropTypes.shape(
    PropTypes.string,
    PropTypes.string,
  ),
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default RelativeBar;
