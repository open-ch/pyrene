import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Banner, Loader } from '@osag/pyrene';
import SparkLineSVG from '../SparkLine/SparkLineSVG';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import colorSchemes from '../../styles/colorSchemes';
import './sparkLineChart.css';

/**
 * Spark Line Charts are used to display data series.
 */
const SparkLineChart = (props) => {
  const dataAvailable = props.data && props.data.length > 0 && props.data[0] && props.data[0].length > 0;
  const showOverlay = props.loading || !dataAvailable;

  return (
    <div styleName="container">
      {!props.loading && (props.keyFigure !== null) && (
        <div styleName="keyFigure">
          {props.keyFigure}
        </div>
      )}
      <div styleName={classNames('chart', { noKeyFigure: props.loading || props.keyFigure === null })}>
        {dataAvailable && (
          <SparkLineSVG
            axisLabel={props.axisLabel}
            colorScheme={props.colorScheme}
            tooltipFormat={props.tooltipFormat}
            data={props.data}
            loading={props.loading}
            sparkLineHeight={64}
            strokeWidth={2}
            enableTooltip={props.enableTooltip}
          />
        )}
      </div>
      {showOverlay && (
        <div styleName="chartOverlay">
          <ChartOverlay>
            {props.loading && <Loader type="inline" />}
            {!props.loading && !dataAvailable && (
              <div>
                <Banner styling="inline" type="error" label={props.error} />
              </div>
            )}
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
  tooltipFormat: (d) => d,
  enableTooltip: false,
  error: 'No data available',
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
   * Sets the data series as an array of data. Each data item contains a timestamp and a value.
   */
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  /**
   * If set, a tooltip is shown, while hovering.
   */
  enableTooltip: PropTypes.bool,
  /**
   * Sets the error message.
   */
  error: PropTypes.string,
  /**
   * Sets the key figure.
   */
  keyFigure: PropTypes.string,
  /**
    * If set, a loader is shown instead of axis tick labels, grid and bars.
    */
  loading: PropTypes.bool,
  /**
   * Sets the data formatting functions for the tooltip.
   */
  tooltipFormat: PropTypes.func,
};

export default SparkLineChart;
