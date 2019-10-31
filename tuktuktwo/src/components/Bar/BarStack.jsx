import React from 'react';
import PropTypes from 'prop-types';
import { Bar, BarStack as VxBarStack, BarStackHorizontal } from '@vx/shape';
import { Group } from '@vx/group';
import { scaleOrdinal } from '@vx/scale';
import ScaleUtils from '../../common/ScaleUtils';
import chartConstants from '../../common/chartConstants';

const getBars = (barStacks, direction, barWeight) => (
  barStacks.map((barStack) => (
    barStack.bars.map((bar) => (
      direction === 'horizontal' ? (
        <Bar
          key={`bar-stack-${barStack.index}-${bar.index}`}
          x={bar.x}
          y={bar.y}
          height={barWeight}
          width={bar.width}
          fill={bar.color}
        />
      ) : (
        <Bar
          key={`bar-stack-${barStack.index}-${bar.index}`}
          x={bar.x}
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
  const left = props.direction === 'horizontal' ? chartConstants.marginLeftCategorical : chartConstants.marginLeftNumerical;
  const height = Math.max(0, props.height - chartConstants.marginBottom);
  const width = Math.max(0, props.width - left);
  const labels = props.data.map((d) => (d.label));
  const categoricalProp = (d) => d.label;
  const data = props.data.map((dataElement) => ({ ...props.keys.reduce((obj, key, index) => ({ ...obj, [key]: dataElement.values[index] }), {}), label: dataElement.label }));
  const color = scaleOrdinal({
    domain: props.keys,
    range: props.colors,
  });
  if (props.direction === 'horizontal') {
    const scaleCategorical = ScaleUtils.scaleCategorical(height, labels);
    return (
      <Group
        top={(scaleCategorical.range().slice(-1)[0] / labels.length / 2) - (props.barWeight / 2)}
        left={left}
      >
        <BarStackHorizontal
          keys={props.keys}
          data={data}
          y={categoricalProp}
          xScale={ScaleUtils.scaleLinear(Math.max(0, width - chartConstants.marginMaxValueToBorder), props.maxCumulatedValue, props.direction)}
          yScale={scaleCategorical}
          color={color}
        >
          {(barStacks) => getBars(barStacks, props.direction, props.barWeight)}
        </BarStackHorizontal>
      </Group>

    );
  }
  const scaleCategorical = ScaleUtils.scaleCategorical(width, labels);
  return (
    <Group
      left={left + (scaleCategorical.range().slice(-1)[0] / labels.length / 2) - (props.barWeight / 2)}
      top={chartConstants.marginMaxValueToBorder}
    >
      <VxBarStack
        keys={props.keys}
        data={data}
        x={categoricalProp}
        xScale={scaleCategorical}
        yScale={ScaleUtils.scaleLinear(Math.max(0, height - chartConstants.marginMaxValueToBorder), props.maxCumulatedValue, props.direction)}
        color={color}
      >
        {(barStacks) => getBars(barStacks, props.direction, props.barWeight)}
      </VxBarStack>
    </Group>
  );
};

BarStack.displayName = 'Bar Stack';

BarStack.defaultProps = {
  barWeight: 10,
  direction: 'vertical',
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
   * Sets the bar stack data. Type: [ { label: string (required), values: [number] (required) } ]
   */
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
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
    * Sets the keys. Type: [ string ]
    */
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Sets the maxCumulatedValue, which is used to calculate the bar lengths.
   */
  maxCumulatedValue: PropTypes.number.isRequired,
  /**
   * Sets the graph width, which is used to calculate the bar length and scaling.
   */
  width: PropTypes.number.isRequired,
};

export default BarStack;
