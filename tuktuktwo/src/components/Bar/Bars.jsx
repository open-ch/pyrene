import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import Bar from './Bar';
import chartConstants from '../../common/chartConstants';

/**
 * Calculates the barWeight based on the label position and axis boundary to handle edge cases, where the label/bar is partially/fully outside the visible area.
 * @param {*} labelPosition
 * @param {*} barWeight
 * @param {*} boundary
 */
const getBarWeightInBoundary = (labelPosition, barWeight, boundary) => {
  const delta = labelPosition + barWeight - boundary;
  return Math.max(0, delta > barWeight ? barWeight : delta);
};

/**
 * Bars is used to display multiple bars.
 */
const Bars = (props) => (
  <Group>
    {props.values.map((d, i) => {
      const barWeight = getBarWeightInBoundary(props.scaleLabel(props.labels[i]) + props.labelOffset, props.barWeight(i, props.labels), props.direction === 'horizontal' ? props.top : props.left);
      const barWeightOffset = props.barWeight(i, props.labels) - barWeight;
      return (
        <Bar
          key={`bar-${i}`} // eslint-disable-line
          barWeight={barWeight}
          color={props.color}
          direction={props.direction}
          left={props.direction === 'horizontal' ? props.left : props.scaleLabel(props.labels[i]) + props.labelOffset + barWeightOffset}
          scaleValue={props.scaleValue}
          top={props.direction === 'horizontal' ? props.scaleLabel(props.labels[i]) + props.labelOffset + barWeightOffset : props.top}
          value={d}
        />
      );
    })}
  </Group>
);

Bars.displayName = 'Bars';

Bars.defaultProps = {
  barWeight: () => chartConstants.barWeight,
  direction: 'vertical',
  labelOffset: 0,
  top: 0,
};

Bars.propTypes = {
  /**
   * Function to calculate the bar weight based on the labels: (barIndex, labels) => (barWeight).
   */
  barWeight: PropTypes.func,
  /**
   * Sets the color of the bars.
   */
  color: PropTypes.string.isRequired,
  /**
   * Sets the bar direction.
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Sets the label offset to shift the bars on the label axis within this component.
   */
  labelOffset: PropTypes.number,
  /**
   * Sets the labels to position the bars on the label axis.
   */
  labels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  /**
   * Sets the horizontal offset for this component.
   */
  left: PropTypes.number.isRequired,
  /**
   * Sets the scale function to position the bars on the label axis.
   */
  scaleLabel: PropTypes.func.isRequired,
  /**
   * Sets the scale function for the value axis.
   */
  scaleValue: PropTypes.func.isRequired,
  /**
   * Sets the vertical offset for this component.
   */
  top: PropTypes.number,
  /**
   * Sets the values, which are used to calculate the bar lengths. Type: [ number ]
   */
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Bars;
