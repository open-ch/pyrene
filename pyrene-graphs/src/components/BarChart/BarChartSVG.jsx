import React from 'react';
import PropTypes from 'prop-types';
import {
  Bars,
  BarStack,
  CategoricalAxis,
  NumericalAxis,
  Responsive,
  chartConstants,
  localPoint,
  scaleLabels,
  scaleValueAxis,
  scaleValueInBounds,
  withTooltip,
} from 'tuktuktwo';
import Tooltip from '../Tooltip/Tooltip';
import colorConstants from '../../styles/colorConstants';
import colorSchemes from '../../styles/colorSchemes';

const getLabelConfig = (direction, labels, parentSize, barWeight) => {
  const scale = direction === 'horizontal' ? scaleLabels(chartConstants.marginBottom, parentSize.height, labels, 'vertical') : scaleLabels(chartConstants.marginLeftNumerical, parentSize.width, labels, 'horizontal');
  return {
    offset: (scale.range()[1] - scale.range()[0]) / labels.length / 2 - barWeight / 2,
    scale: scale,
  };
};

/**
 * Get tooltip position and data when mouse is moving over the chart.
 * @param {object}event - The mouseMove event
 * @param {array}data - The data series with timestamp and value
 * @param {function}xScale - The scale function that linearly maps x-coordinate to timestamp in epoch milliseconds
 * @param {function}showTooltip - The function that passes tooltip position and data to the tooltip component
 */
const onMouseMove = (event, data, showTooltip, direction, labelConfig, left) => {
  const { x, y } = localPoint(event.target.ownerSVGElement, event);
  const bandwidth = labelConfig.scale.bandwidth();
  const index = Math.floor(direction === 'vertical' ? (x - labelConfig.offset - left + 1) / bandwidth : (y - labelConfig.offset + 1) / bandwidth);
  
  showTooltip({
    tooltipLeft: x,
    tooltipTop: y,
    tooltipData: data[index],
  });
};

/**
 * The pure SVG chart part of the bar chart.
 */
const BarChartSVG = (props) => {
  const {
    hideTooltip,
    showTooltip,
    tooltipData,
    tooltipLeft,
    tooltipOpen,
    tooltipTop,
  } = props;

  return (
    <Responsive>
      {(parent) => {
        const labels = props.data.map((row) => row.label);
        const maxValue = Math.max(...props.data.map((d) => d.data.reduce((a, b) => a + b, 0)));
        const data = props.data.map((row) => row.data[0]);
        const sharedAxisProps = {
          height: parent.height,
          width: parent.width,
          showTickLabels: !props.loading,
          strokeColor: colorConstants.strokeColor,
          tickLabelColor: colorConstants.tickLabelColor,
        };
        const labelConfig = getLabelConfig(props.direction, sharedAxisProps.showTickLabels ? labels : [], parent, chartConstants.barWeight);
        const valueScale = scaleValueInBounds(parent, maxValue, props.direction);
        const valueAxisScale = scaleValueAxis(parent, maxValue, props.direction);
        const left = props.direction === 'horizontal' ? chartConstants.marginLeftCategorical : chartConstants.marginLeftNumerical;
        return (
          <>
            <svg width="100%" height={parent.height} shapeRendering="crispEdges">
              {props.direction === 'horizontal' ? (
                <CategoricalAxis
                  left={left}
                  orientation="left"
                  scale={labelConfig.scale}
                  strokeColor={sharedAxisProps.strokeColor}
                  tickLabelColor={sharedAxisProps.tickLabelColor}
                />
              ) : (
                <NumericalAxis
                  left={left}
                  orientation="left"
                  scale={valueAxisScale}
                  showGrid={!props.loading}
                  showTickLabels={sharedAxisProps.showTickLabels}
                  strokeColor={sharedAxisProps.strokeColor}
                  tickFormat={props.dataFormat}
                  tickLabelColor={sharedAxisProps.tickLabelColor}
                  width={sharedAxisProps.width - left}
                />
              )}
              {props.direction === 'horizontal' ? (
                <NumericalAxis
                  top={sharedAxisProps.height - chartConstants.marginBottom}
                  height={sharedAxisProps.height - chartConstants.marginBottom}
                  orientation="bottom"
                  scale={valueAxisScale}
                  showGrid={!props.loading}
                  showTickLabels={sharedAxisProps.showTickLabels}
                  strokeColor={sharedAxisProps.strokeColor}
                  tickFormat={props.dataFormat}
                  tickLabelColor={sharedAxisProps.tickLabelColor}
                />
              ) : (
                <CategoricalAxis
                  orientation="bottom"
                  scale={labelConfig.scale}
                  strokeColor={sharedAxisProps.strokeColor}
                  tickLabelColor={sharedAxisProps.tickLabelColor}
                  top={sharedAxisProps.height - chartConstants.marginBottom}
                />
              )}
              <g
                className="hoverArea"
                onMouseMove={(e) => onMouseMove(e, props.data, showTooltip, props.direction, labelConfig, left)}
                onMouseOut={hideTooltip}
              >
                {!props.loading && (props.legend.length > 1 ? (
                  <BarStack
                    barWeight={chartConstants.barWeight}
                    colors={props.colorScheme.categorical}
                    data={props.data}
                    direction={props.direction}
                    keys={props.legend}
                    labelOffset={labelConfig.offset}
                    scaleLabel={labelConfig.scale}
                    scaleValue={valueScale}
                    top={chartConstants.marginMaxValueToBorder}
                  />
                ) : (
                  <Bars
                    barWeight={() => chartConstants.barWeight}
                    color={props.colorScheme.categorical[0]}
                    direction={props.direction}
                    labelOffset={labelConfig.offset}
                    labels={labels}
                    left={left}
                    scaleLabel={labelConfig.scale}
                    scaleValue={valueScale}
                    top={chartConstants.marginMaxValueToBorder}
                    data={data}
                  />
                ))}
              </g>
            </svg>
            {
              tooltipOpen && (
                <Tooltip
                  data={tooltipData.data.map((value, index) => ({
                    dataColor: props.colorScheme.categorical[index],
                    dataLabel: props.legend[index],
                    dataValue: props.dataFormat(value),
                  }))}
                  label={tooltipData.label}
                  left={tooltipLeft} top={tooltipTop}
                />
              )
            }
          </>
        );
      }}
    </Responsive>
  );
};

BarChartSVG.displayName = 'Bar Chart SVG';

BarChartSVG.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  direction: 'vertical',
  loading: false,
  dataFormat: (d) => d,
  tooltipData: {
    label: '',
    data: [],
  },
  tooltipLeft: 0,
  tooltipTop: 0,
};

BarChartSVG.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    categorical: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the chart data. Type: [ { label: string (required), data: [number] (required) } ]
   */
  data: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  /**
   * Set function to format the displayed values.
   */
  dataFormat: PropTypes.func,
  /**
   * Sets the bar direction.
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The function to hide tooltip provided by the withTooltip enhancer.
   */
  hideTooltip: PropTypes.func.isRequired,
  /**
    * Sets the legend. Type: [ string ]
    */
  legend: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
    * If set, a loader is shown instead of axis tick labels, grid and bars.
    */
  loading: PropTypes.bool,
  /**
   * The function to render the proper tooltip provided by the withTooltip enhancer.
   */
  showTooltip: PropTypes.func.isRequired,
  /**
   * The tooltip data prop provided by the withTooltip enhancer.
   */
  tooltipData: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    label: PropTypes.string.isRequired,
  }),
  /**
   * The tooltip x-position prop provided by the withTooltip enhancer.
   */
  tooltipLeft: PropTypes.number,
  /**
   * The prop provided by the withTooltip enhancer to decide whether to show the tooltip or not.
   */
  tooltipOpen: PropTypes.bool.isRequired,
  /**
   * The tooltip y-position prop provided by the withTooltip enhancer.
   */
  tooltipTop: PropTypes.number,
};

export default withTooltip(BarChartSVG);
