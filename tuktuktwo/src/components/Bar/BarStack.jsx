import React from 'react';
import PropTypes from 'prop-types';
import { Bar, BarStack as VxBarStack, BarStackHorizontal } from '@vx/shape';
import { Group } from '@vx/group';
import { scaleOrdinal } from '@vx/scale';
import chartConstants from '../../common/chartConstants';

const getBars = (barStacks, direction, barWeight, labelOffset) => (
  barStacks.map((barStack) => (
    barStack.bars.map((bar) => (
      direction === 'horizontal' ? (
        <Bar
          key={`bar-stack-${barStack.index}-${bar.index}`}
          x={bar.x}
          y={bar.y + labelOffset}
          height={barWeight}
          width={bar.width}
          fill={bar.color}
        />
      ) : (
        <Bar
          key={`bar-stack-${barStack.index}-${bar.index}`}
          x={bar.x + labelOffset}
          y={bar.y}
          height={bar.height}
          width={barWeight}
          fill={bar.color}
        />
      )
    ))
  ))
);

/**
 * BarStack is used to display stacked bars.
 */
const BarStack = (props) => {
  const categoricalProp = (d) => d.label;
  const data = props.data.map((dataElement) => ({ ...props.keys.reduce((obj, key, index) => ({ ...obj, [key]: dataElement.data[index] }), {}), label: dataElement.label }));
  const color = scaleOrdinal({
    domain: props.keys,
    range: props.colors,
  });
  return props.direction === 'horizontal' ? (
    <Group
      left={props.left}
    >
      <BarStackHorizontal
        keys={props.keys}
        data={data}
        y={categoricalProp}
        xScale={props.scaleValue}
        yScale={props.scaleLabel}
        color={color}
      >
        {(barStacks) => getBars(barStacks, props.direction, props.barWeight, props.labelOffset)}
      </BarStackHorizontal>
    </Group>
  ) : (
    <Group
      top={props.top}
    >
      <VxBarStack
        keys={props.keys}
        data={data}
        x={categoricalProp}
        xScale={props.scaleLabel}
        yScale={props.scaleValue}
        color={color}
      >
        {(barStacks) => getBars(barStacks, props.direction, props.barWeight, props.labelOffset)}
      </VxBarStack>
    </Group>
  );
};

BarStack.displayName = 'Bar Stack';

BarStack.defaultProps = {
  barWeight: chartConstants.barWeight,
  direction: 'vertical',
  labelOffset: 0,
  left: 0,
  top: 0,
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
   * Sets the bar stack data. Type: [ { label: string (required), data: [number] (required) } ]
   */
  data: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })).isRequired,
  /**
   * Sets the bar direction.
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
    * Sets the keys. Type: [ string ]
    */
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Sets the label offset to shift the bars on the label axis within this component.
   */
  labelOffset: PropTypes.number,
  /**
   * Sets the horizontal offset for this component.
   */
  left: PropTypes.number,
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
};

export default BarStack;
