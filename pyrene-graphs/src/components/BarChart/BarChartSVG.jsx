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
  scaleUtils,
  withTooltip,
} from 'tuktuktwo';
import Tooltip from '../Tooltip/Tooltip';
import colorConstants from '../../styles/colorConstants';
import colorSchemes from '../../styles/colorSchemes';

const getLabelConfig = (direction, labels, parentSize, barWeight) => {
  const size = direction === 'horizontal' ? parentSize.height - chartConstants.marginBottom : parentSize.width - chartConstants.marginLeftNumerical;
  return {
    offset: size / labels.length / 2 - barWeight / 2,
    scale: scaleUtils.scaleOrdinal(size, labels),
  };
};

/**
 * Get tooltip position and data when mouse is moving over the graph.
 * @param {object}event - The mouseMove event
 * @param {array}data - The data series with timestamp and value
 * @param {function}xScale - The scale function that linearly maps x-coordinate to timestamp in epoch milliseconds
 * @param {function}showTooltip - The function that passes tooltip position and data to the tooltip component
 */
const onMouseMove = (event, data, showTooltip, direction, labelConfig) => {
  const { x, y } = localPoint(event.target.ownerSVGElement, event);
  const bandwidth = labelConfig.scale.bandwidth();
  const index = Math.floor(direction === 'vertical' ? (x - labelConfig.offset) / bandwidth : (y - labelConfig.offset) / bandwidth);
  
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
        const barWeight = 10;
        const labels = props.data.map((row) => row.label);
        const maxValue = Math.max(...props.data.map((d) => d.values.reduce((a, b) => a + b, 0)));
        const values = props.data.map((row) => row.values[0]);
        const tooltipDataSeries = tooltipData.values.map((value, index) => ({
          dataColor: props.colorScheme.categorical[index],
          dataLabel: props.legend[index],
          dataValue: props.formatter(value),
        }));
        const tooltipDataSeriesLabel = tooltipData.label;
        const sharedAxisProps = {
          height: parent.height,
          width: parent.width,
          showTickLabels: !props.loading,
          strokeColor: colorConstants.strokeColor,
          tickLabelColor: colorConstants.tickLabelColor,
        };
        const labelConfig = getLabelConfig(props.direction, labels, parent, barWeight);
        return (
          <>
            <svg width="100%" height={parent.height} shapeRendering="crispEdges">
              {props.direction === 'horizontal' ? (
                <CategoricalAxis
                  height={sharedAxisProps.height}
                  width={sharedAxisProps.width}
                  showTickLabels={sharedAxisProps.showTickLabels}
                  strokeColor={sharedAxisProps.strokeColor}
                  tickLabelColor={sharedAxisProps.tickLabelColor}
                  tickLabels={labels}
                  orientation="left"
                />
              ) : (
                <NumericalAxis
                  height={sharedAxisProps.height}
                  width={sharedAxisProps.width}
                  showTickLabels={sharedAxisProps.showTickLabels}
                  strokeColor={sharedAxisProps.strokeColor}
                  tickLabelColor={sharedAxisProps.tickLabelColor}
                  maxValue={maxValue}
                  orientation="left"
                  showGrid={!props.loading}
                  tickFormat={props.formatter}
                />
              )}
              {props.direction === 'horizontal' ? (
                <NumericalAxis
                  height={sharedAxisProps.height}
                  width={sharedAxisProps.width}
                  showTickLabels={sharedAxisProps.showTickLabels}
                  strokeColor={sharedAxisProps.strokeColor}
                  tickLabelColor={sharedAxisProps.tickLabelColor}
                  maxValue={maxValue}
                  orientation="bottom"
                  showGrid={!props.loading}
                  tickFormat={props.formatter}
                />
              ) : (
                <CategoricalAxis
                  height={sharedAxisProps.height}
                  width={sharedAxisProps.width}
                  showTickLabels={sharedAxisProps.showTickLabels}
                  strokeColor={sharedAxisProps.strokeColor}
                  tickLabelColor={sharedAxisProps.tickLabelColor}
                  tickLabels={labels}
                  orientation="bottom"
                />
              )}
              <g
                className="hoverArea"
                onMouseMove={(e) => onMouseMove(e, props.data, showTooltip, props.direction, labelConfig)}
                onMouseOut={hideTooltip}
              >
                {!props.loading && (props.legend.length > 1 ? (
                  <BarStack
                    barWeight={barWeight}
                    colors={props.colorScheme.categorical}
                    height={parent.height}
                    labelOffset={labelConfig.offset}
                    labelScale={labelConfig.scale}
                    keys={props.legend}
                    maxCumulatedValue={maxValue}
                    data={props.data}
                    direction={props.direction}
                    width={parent.width}
                  />
                ) : (
                  <Bars
                    barWeight={barWeight}
                    color={props.colorScheme.categorical[0]}
                    height={parent.height}
                    labelOffset={labelConfig.offset}
                    labels={labels}
                    labelScale={labelConfig.scale}
                    maxValue={maxValue}
                    values={values}
                    direction={props.direction}
                    width={parent.width}
                    categorical
                  />
                ))}
              </g>
            </svg>
            {
              tooltipOpen && (
                <Tooltip
                  dataSeries={tooltipDataSeries}
                  dataSeriesLabel={tooltipDataSeriesLabel}
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
  formatter: (d) => d,
  tooltipData: {
    label: '',
    values: [],
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
   * Sets the chart data. Type: [ { label: string (required), values: [number] (required) } ]
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
   * Set function to format the displayed values.
   */
  formatter: PropTypes.func,
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
    label: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
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
