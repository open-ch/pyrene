import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import Bar from './Bar';
import ScaleUtils from '../../common/ScaleUtils';
import chartConstants from '../../common/chartConstants';

/**
 * Bars is used to display multiple bars.
 */
const Bars = (props) => {
  const left = props.direction === 'horizontal' ? chartConstants.marginLeftCategorical : chartConstants.marginLeftNumerical;
  const chartHeight = props.height - chartConstants.marginBottom;
  const width = props.width - left;
  const scale = ScaleUtils.scaleCategorical(props.direction === 'horizontal' ? chartHeight : width, props.values);
  return (
    <Group
      left={left}
      top={props.direction === 'horizontal' ? 0 : chartConstants.marginMaxValueToBorder}
    >
      {props.values.map((d, i) => {
        const delta = (scale.range().slice(-1)[0] / props.values.length / 2) - (props.barWeight / 2);
        return (
          <Bar
            key={`bar-${i}`} // eslint-disable-line
            color={props.color}
            barWeight={props.barWeight}
            direction={props.direction}
            maxValue={props.maxValue}
            value={d}
            size={props.direction === 'horizontal' ? width - chartConstants.marginMaxValueToBorder : chartHeight - chartConstants.marginMaxValueToBorder}
            x={props.direction === 'horizontal' ? 0 : scale(d) + delta}
            y={props.direction === 'horizontal' ? scale(d) + delta : 0}
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
