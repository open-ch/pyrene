import React from 'react';
import PropTypes from 'prop-types';
import { colorConstants } from 'pyrene';
import {
  Bar,
  chartConstants,
  Group,
  localPoint,
  NumericalAxis,
  Responsive,
  scaleUtils,
  TimeXAxis,
  withTooltip,
} from 'tuktuktwo';
import Tooltip from '../TimeSeries/Tooltip';
import colorSchemes from '../../styles/colorSchemes';

/**
 * The pure SVG chart part of the time series bucket graph.
 */
const TimeSeriesBucketChart = (props) => {
  const {
    hideTooltip, // eslint-disable-line react/prop-types
    showTooltip, // eslint-disable-line react/prop-types
    tooltipData, // eslint-disable-line react/prop-types
    tooltipLeft, // eslint-disable-line react/prop-types
    tooltipOpen, // eslint-disable-line react/prop-types
    tooltipTop, // eslint-disable-line react/prop-types
  } = props;

  return (
    <Responsive>
      {(parent) => {
        // Get the max value from the data series
        const maxValue = Math.max(...props.dataSeries.data.map((data) => data[1]));

        // Get time frame
        const timeFrame = props.dataSeries.data[1][0] - props.dataSeries.data[0][0];

        // Get number of bars, maximum bar height and bar weight
        const numBars = props.dataSeries.data.length;
        const maxBarSize = Math.max(0, parent.height - chartConstants.marginBottom - chartConstants.marginMaxValueToBorder);
        const barWeight = parent.width > 0 ? ((parent.width - chartConstants.marginLeftNumerical) / numBars - chartConstants.defaultBarSpacing) : 0;

        // Get the scale function
        const xScale = scaleUtils.scaleCustomLinear(chartConstants.marginLeftNumerical, parent.width, props.from, props.to, 'horizontal');

        const onMouseMove = (event) => {
          const ownerSvg = event.target.getBoundingClientRect().width === parent.width ? event.target : event.target.ownerSVGElement;
          const { x, y } = localPoint(ownerSvg, event);
          if (x < chartConstants.marginLeftNumerical || y > parent.height - chartConstants.marginBottom) {
            hideTooltip();
            return;
          }
          const currentTimestamp = xScale(x);
          const foundIndex = props.dataSeries.data.findIndex((d) => d[0] > currentTimestamp) - 1;
          const index = foundIndex >= 0 ? foundIndex : props.dataSeries.data.length - 1;
          showTooltip({
            tooltipLeft: x,
            tooltipTop: y,
            tooltipData: [[props.dataSeries.data[index][0], props.dataSeries.data[index][0] + timeFrame], props.dataSeries.data[index][1]],
          });
        };

        return (
          <>
            <svg width="100%" height={parent.height} shapeRendering="crispEdges" onMouseMove={onMouseMove} onMouseOut={hideTooltip}>
              <Group>
                <TimeXAxis
                  from={props.from}
                  to={props.to}
                  width={parent.width}
                  height={parent.height}
                  strokeColor={colorConstants.neutral050}
                  tickLabelColors={[colorConstants.neutral200, colorConstants.neutral300]}
                  showTickLabels={!props.loading}
                  timezone={props.timezone}
                />
                <NumericalAxis
                  maxValue={maxValue}
                  orientation="left"
                  width={parent.width}
                  height={parent.height}
                  tickFormat={props.dataFormat.yAxis}
                  strokeColor={colorConstants.neutral050}
                  tickLabelColor={colorConstants.neutral200}
                  showTickLabels={!props.loading}
                  showGrid={false}
                />
                {!props.loading && props.dataSeries.data.length > 0 && (
                  <Group left={chartConstants.marginLeftNumerical}>
                    {props.dataSeries.data.map((data, index) => (
                      <Bar key={Math.random()}
                        barWeight={barWeight}
                        color={props.colorScheme.categorical[0]}
                        direction="vertical"
                        value={data[1]}
                        maxValue={maxValue}
                        size={maxBarSize}
                        x={index * (barWeight + chartConstants.defaultBarSpacing)}
                        y={chartConstants.marginMaxValueToBorder}
                      />
                    ))}
                  </Group>
                )}
              </Group>
            </svg>
            {
              tooltipOpen && (
                <Tooltip
                  dataSeries={[{ dataColor: props.colorScheme.categorical[0], dataLabel: props.dataSeries.label, dataValue: props.dataFormat.tooltip(tooltipData[1]) }]}
                  timeFormat={props.timeFormat.tooltip} time={tooltipData[0]}
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

TimeSeriesBucketChart.displayName = 'TimeSeriesBucketChart';

TimeSeriesBucketChart.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  dataSeries: {
    data: [],
    label: '',
  },
  loading: false,
  onZoom: undefined,
};

TimeSeriesBucketChart.propTypes = {
  colorScheme: PropTypes.shape({
    categorical: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  dataFormat: PropTypes.shape({
    tooltip: PropTypes.func,
    yAxis: PropTypes.func,
  }).isRequired,
  dataSeries: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    label: PropTypes.string.isRequired,
  }),
  from: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onZoom: PropTypes.func,
  timeFormat: PropTypes.shape({
    tooltip: PropTypes.func.isRequired,
    zoomTooltip: PropTypes.func,
  }).isRequired,
  timezone: PropTypes.string.isRequired,
  to: PropTypes.number.isRequired,
};

export default withTooltip(TimeSeriesBucketChart);
