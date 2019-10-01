import React from 'react';
import PropTypes from 'prop-types';
import { BarStackHorizontal } from '@vx/shape';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import Responsive from '../Misc/Responsive';

/**
 * BarStacks are used to display multiple numerical values.
 */
const BarStack = (props) => {
  const color = scaleOrdinal({
    // domain: keys,
    range: props.colors,
  });
  const y = d => d;
  const xScale = scaleLinear({
    domain: [0, Math.max(...props.values)],
    nice: true,
  });
  const yScale = scaleBand({
    domain: props.values.map(y),
    padding: 0.2,
  });
  return (
    <Responsive>
      {parent => (
        props.direction === 'horizontal' ? (
          <svg width={parent.width} height={props.barWeight}>
            <BarStackHorizontal
              color={color}
              data={props.values}
              keys={[0, 1, 2]}
              y={y}
              xScale={xScale}
              yScale={yScale}
            />
          </svg>
        ) : (
          <svg width={props.barWeight} height={parent.height}>
            <div>dummy</div>
          </svg>
        ))}
    </Responsive>
  );
};

BarStack.displayName = 'Bar Stack';

BarStack.defaultProps = {
  barWeight: 6,
  direction: 'horizontal',
};

BarStack.propTypes = {
  /**
   * Sets the bar weight (height if horizontal | width if vertical).
   */
  barWeight: PropTypes.number,
  /**
   * Sets the colors of the bars. Type: [ string ]
   */
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Sets the bar direction.
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Sets the maxValue, which is used to calculate the bar length.
   */
  maxValue: PropTypes.number.isRequired,
  /**
   * Sets the values, which are used to calculate the bar lengths. Type: [ string ]
   */
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BarStack;
