import React from 'react';
import PropTypes from 'prop-types';
import { BarStackHorizontal, BarStack } from '@vx/shape';
import { scaleBand, scaleOrdinal } from '@vx/scale';

/**
 * Relative Bars are used to display a numerical value.
 * It has an underlying secondary bar, which extends to the full length.
 */
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
    range: props.colors,
  });
  const weightScale = scaleBand({
  });
  const size = props.scale.range().slice(-1)[0];
  return (
    props.direction === 'horizontal' ? (
      <BarStackHorizontal
        y={(d) => d}
        height={props.barWeight}
        data={data}
        keys={keys}
        xScale={props.scale}
        yScale={weightScale}
        color={color}
        transform={props.mirrored ? `rotate(180 ${size / 2} ${props.barWeight / 2})` : undefined}
      />
    ) : (
      <BarStack
        x={(d) => d}
        width={props.barWeight}
        data={data}
        keys={keys}
        xScale={weightScale}
        yScale={props.scale}
        color={color}
        transform={props.mirrored ? `rotate(180 ${props.barWeight / 2} ${size / 2})` : undefined}
      />
    ));
};

RelativeBar.displayName = 'Relative Bar';

RelativeBar.defaultProps = {
  barWeight: 6,
  direction: 'vertical',
  mirrored: false,
};

RelativeBar.propTypes = {
  /**
   * Sets the bar weight (height if horizontal | width if vertical).
   */
  barWeight: PropTypes.number,
  /**
   * Sets the colors of the bars. Type: [ string ]
   */
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Sets the direction of the bars.
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Sets the maxValue, which is used to calculate the length of the bars.
   */
  maxValue: PropTypes.number.isRequired,
  /**
   * If set, the bars are being mirrored horizontally.
   */
  mirrored: PropTypes.bool,
  /**
   * Sets the scale function for the value axis.
   */
  scale: PropTypes.func.isRequired,
  /**
   * Sets the value, which is used to calculate the length of the bars.
   */
  value: PropTypes.number.isRequired,
};

export default RelativeBar;
