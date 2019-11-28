import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import Bar from './Bar';
import chartConstants from '../../common/chartConstants';

const getBarWeight = (labelPosition, barWeight, boundary) => {
  const delta = labelPosition + barWeight - boundary;
  return Math.max(0, delta > barWeight ? barWeight : delta);
};

/**
 * Bars is used to display multiple bars.
 */
const Bars = (props) => {
  const chartHeight = props.height - chartConstants.marginBottom;
  const chartWidth = props.width - props.left;
  const top = props.direction === 'horizontal' ? 0 : chartConstants.marginMaxValueToBorder;
  return (
    <Group
      left={props.direction === 'horizontal' ? props.left : 0}
      top={top}
    >
      {props.values.map((d, i) => {
        const barWeight = getBarWeight(props.labelScale(props.labels[i]) + props.labelOffset, props.barWeight, props.direction === 'horizontal' ? top : props.left);
        const barWeightOffset = props.barWeight - barWeight;
        return (
          <Bar
          key={`bar-${i}`} // eslint-disable-line
            color={props.color}
            barWeight={barWeight}
            direction={props.direction}
            maxValue={props.maxValue}
            value={d}
            size={props.direction === 'horizontal' ? chartWidth - chartConstants.marginMaxValueToBorder : chartHeight - chartConstants.marginMaxValueToBorder}
            x={props.direction === 'horizontal' ? 0 : props.labelScale(props.labels[i]) + props.labelOffset + barWeightOffset}
            y={props.direction === 'horizontal' ? props.labelScale(props.labels[i]) + props.labelOffset + barWeightOffset : 0}
          />
        );
      })}
    </Group>
  );
};

Bars.displayName = 'Bars';

Bars.defaultProps = {
  barWeight: 10,
  direction: 'vertical',
  labelOffset: 0,
};

Bars.propTypes = {
  /**
   * Sets the bar weight (height if horizontal | width if vertical).
   */
  barWeight: PropTypes.number,
  /**
   * Sets the color of the bars.
   */
  color: PropTypes.string.isRequired,
  /**
   * Sets the bar direction.
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Sets the height of the graph canvas.
   * Type: number (required)
   */
  height: PropTypes.number.isRequired,
  /**
   * Sets the label offset to shift the bars on the label axis.
   */
  labelOffset: PropTypes.number,
  /**
   * Sets the labels to position the bars on the label axis.
   */
  labels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  /**
   * Sets the scale function to position the bars on the label axis.
   */
  labelScale: PropTypes.func.isRequired,
  /**
   * Sets the horizontal offset.
   */
  left: PropTypes.number.isRequired,
  /**
   * Sets the maxValue, which is used to calculate the bar length.
   */
  maxValue: PropTypes.number.isRequired,
  /**
   * Sets the values, which are used to calculate the bar lengths. Type: [ number ]
   */
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  /**
   * Sets the graph width, which is used to calculate the bar length and scaling.
   */
  width: PropTypes.number.isRequired,
};

export default Bars;
