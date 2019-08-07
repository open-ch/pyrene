import React from 'react';
import PropTypes from 'prop-types';
import { BarStackHorizontal, BarStack } from '@vx/shape';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';

const RelativeBar = (props) => {
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
  const color = scaleOrdinal({
    domain: keys,
    range: props.colorScheme,
  });
  const valueScale = scaleLinear({
    domain: props.direction === 'horizontal' ? [0, props.maxValue] : [props.maxValue, 0],
    rangeRound: [0, props.parentLength],
  });
  const weightScale = scaleBand({
  });
  return (
    props.direction === 'horizontal' ? (
      <svg width={props.parentLength} height={props.barWeight} transform={props.mirrored ? 'rotate(180 0 0)' : undefined}>
        <BarStackHorizontal
          y={d => d}
          height={props.barWeight}
          data={data}
          keys={keys}
          xScale={valueScale}
          yScale={weightScale}
          color={color}
        />
      </svg>
    ) : (
      <svg width={props.barWeight} height={props.parentLength} transform={props.mirrored ? 'rotate(180 0 0)' : undefined}>
        <BarStack
          x={d => d}
          width={props.barWeight}
          data={data}
          keys={keys}
          xScale={weightScale}
          yScale={valueScale}
          color={color}
        />
      </svg>
    )
  );
};

RelativeBar.displayName = 'Relative Bar';

RelativeBar.defaultProps = {
  barWeight: 6,
  colorScheme: [
    'var(--blue-700)',
    'var(--blue-050)',
  ],
  direction: 'horizontal',
  parentLength: 150,
  mirrored: false,
};

RelativeBar.propTypes = {
  barWeight: PropTypes.number,
  colorScheme: PropTypes.arrayOf(PropTypes.string),
  direction: PropTypes.string,
  maxValue: PropTypes.number.isRequired,
  mirrored: PropTypes.bool,
  parentLength: PropTypes.number,
  value: PropTypes.number.isRequired,
};

export default RelativeBar;
