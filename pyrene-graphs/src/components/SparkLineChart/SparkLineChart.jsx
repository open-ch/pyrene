import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Loader } from 'pyrene';
import { NumericalAxis, Responsive } from 'tuktuktwo';
import SparkLineSVG from '../SparkLine/SparkLineSVG';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import colorConstants from '../../styles/colorConstants';
import colorSchemes from '../../styles/colorSchemes';
import './sparkLineChart.css';

/**
 * Spark Line Charts are used to display data series.
 */
const SparkLineChart = (props) => {
  const areaHeight = 62;
  return (
    <div styleName="container">
      {!props.loading && (props.keyFigure !== null) && (
        <div styleName="keyFigure">
          {props.keyFigure}
        </div>
      )}
      <div styleName={classNames('chart', { noKeyFigure: props.loading || props.keyFigure === null })}>
        <Responsive>
          {(parent) => (
            <>
              <svg width="100%" height={parent.height} shapeRendering="crispEdges">
                <NumericalAxis
                  width={parent.width}
                  height={areaHeight}
                  strokeColor={colorConstants.strokeColor}
                  tickLabelColor={colorConstants.tickLabelColor}
                  showTickLabels={false}
                  showGrid={false}
                  label={props.axisLabel}
                  left={0}
                  maxValue={0}
                  orientation="bottom"
                />
              </svg>
              {!props.loading && (
                <div styleName="sparkLine">
                  <SparkLineSVG
                    colorScheme={props.colorScheme}
                    dataFormat={props.dataFormat}
                    dataSeries={props.dataSeries}
                    height={areaHeight}
                    strokeWidth={2}
                    enableTooltip={props.enableTooltip}
                    width={parent.width}
                  />
                </div>
              )}
            </>
          )}
        </Responsive>
      </div>
      {props.loading && (
        <div styleName="chartOverlay">
          <ChartOverlay>
            <Loader type="inline" />
          </ChartOverlay>
        </div>
      )}
    </div>
  );
};

SparkLineChart.displayName = 'Spark Line Chart';

SparkLineChart.defaultProps = {
  axisLabel: '',
  colorScheme: colorSchemes.colorSchemeDefault,
  dataFormat: (d) => d,
  enableTooltip: false,
  keyFigure: null,
  loading: false,
};

SparkLineChart.propTypes = {
  /**
   * Sets the axis label.
   */
  axisLabel: PropTypes.string,
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    valueGroundLight: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the data formatting functions for the graph.
   */
  dataFormat: PropTypes.func,
  /**
   * Sets the data series as an array of data. Each data item contains a timestamp and a value.
   */
  dataSeries: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  /**
   * If set, a tooltip is shown, while hovering.
   */
  enableTooltip: PropTypes.bool,
  /**
   * Sets the key figure.
   */
  keyFigure: PropTypes.string,
  /**
    * If set, a loader is shown instead of axis tick labels, grid and bars.
    */
  loading: PropTypes.bool,
};

export default SparkLineChart;
