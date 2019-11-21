import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import Bar from './Bar';
import chartConstants from '../../common/chartConstants';

/**
 * Bars is used to display multiple bars.
 */
const Bars = (props) => {
  const left = props.direction === 'horizontal' ? chartConstants.marginLeftCategorical : chartConstants.marginLeftNumerical;
  const chartHeight = props.height - chartConstants.marginBottom;
  const width = props.width - left;
  return (
    <Group
      left={left}
      top={props.direction === 'horizontal' ? 0 : chartConstants.marginMaxValueToBorder}
    >
      {props.values.map((d, i) => (
        <Bar
        key={`bar-${i}`} // eslint-disable-line
          color={props.color}
          barWeight={props.barWeight}
          direction={props.direction}
          maxValue={props.maxValue}
          value={d}
          size={props.direction === 'horizontal' ? width - chartConstants.marginMaxValueToBorder : chartHeight - chartConstants.marginMaxValueToBorder}
          x={props.direction === 'horizontal' ? 0 : props.labelScale(props.labels[i]) + props.labelOffset}
          y={props.direction === 'horizontal' ? props.labelScale(props.labels[i]) + props.labelOffset : 0}
        />
      ))}
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
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Sets the scale function to position the bars on the label axis.
   */
  labelScale: PropTypes.func.isRequired,
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
