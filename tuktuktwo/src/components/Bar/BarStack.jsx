import React from 'react';
import PropTypes from 'prop-types';
import { BarStack as VxBarStack, BarStackHorizontal } from '@vx/shape';
import { scaleOrdinal } from '@vx/scale';
import ScaleUtils from '../../common/ScaleUtils';
import chartConstants from '../../common/chartConstants';

/**
 * BarStack is used to display multiple stacked bars.
 */
const BarStack = (props) => {
  const left = props.direction === 'horizontal' ? chartConstants.marginLeftCategorical : chartConstants.marginLeftNumerical;
  const chartHeight = props.height - chartConstants.marginBottom;
  const width = props.width - left;
  const labels = props.data.map((d) => (d.label));
  const categoricalProp = (d) => d.label;
  const data = props.data.map((dataElement) => ({ ...props.keys.reduce((obj, key, index) => ({ ...obj, [key]: dataElement.values[index] }), {}), label: dataElement.label }));
  const color = scaleOrdinal({
    domain: props.keys,
    range: props.colors,
  });
  const xScale = ScaleUtils.scaleCategorical(width, labels);
  const yScale = ScaleUtils.scaleCategorical(chartHeight, labels);
  return (
    props.direction === 'horizontal' ? (
      <BarStackHorizontal
        left={left}
        top={0}
        keys={props.keys}
        data={data}
        y={categoricalProp}
        xScale={ScaleUtils.scaleLinear(width - chartConstants.marginMaxValueToBorder, 43, props.direction)}
        yScale={yScale}
        color={color}
      >
        {(barStacks) => (
          barStacks.map((barStack) => (
            barStack.bars.map((bar) => {
              const yDelta = props.direction === 'horizontal' ? (yScale.range().slice(-1)[0] / barStack.bars.length / 2) - (props.barWeight / 2) : chartConstants.marginMaxValueToBorder;
              return (
                <rect
                  key={`bar-stack-${barStack.index}-${bar.index}`}
                  x={bar.x + left}
                  y={bar.y + yDelta}
                  height={props.direction === 'horizontal' ? props.barWeight : bar.height}
                  width={props.direction === 'horizontal' ? bar.width : props.barWeight}
                  fill={bar.color}
                />
              );
            })
          ))
        )}
      </BarStackHorizontal>
    ) : (
      <VxBarStack
        left={left}
        top={chartConstants.marginMaxValueToBorder}
        keys={props.keys}
        data={data}
        x={categoricalProp}
        xScale={xScale}
        yScale={ScaleUtils.scaleLinear(chartHeight - chartConstants.marginMaxValueToBorder, 43, props.direction)}
        color={color}
      >
        {(barStacks) => (
          barStacks.map((barStack) => (
            barStack.bars.map((bar) => {
              const xDelta = (xScale.range().slice(-1)[0] / barStack.bars.length / 2) - (props.barWeight / 2);
              return (
                <rect
                  key={`bar-stack-${barStack.index}-${bar.index}`}
                  x={bar.x + left + xDelta}
                  y={bar.y + chartConstants.marginMaxValueToBorder}
                  height={props.direction === 'horizontal' ? props.barWeight : bar.height}
                  width={props.direction === 'horizontal' ? bar.width : props.barWeight}
                  fill={bar.color}
                />
              );
            })
          ))
        )}
      </VxBarStack>
    )
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
   * Sets the graph width, which is used to calculate the bar length and scaling.
   */
  width: PropTypes.number.isRequired,
};

export default BarStack;
