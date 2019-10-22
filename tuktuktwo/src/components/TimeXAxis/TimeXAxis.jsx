import React from 'react';
import PropTypes from 'prop-types';
import { AxisBottom } from '@vx/axis';
import { GridColumns } from '@vx/grid';
import { scaleTime } from '@vx/scale';
import { getTickValues, timeFormat } from './TimeXUtil';

const MARGIN_TOP = 16;
const MARGIN_BOTTOM = 24;
const MARGIN_LEFT = 36;

const _formatTime = (timestamp, props) => (props.showTickLabels ? timeFormat(timestamp, props.from, props.to, props.timezone) : '');

/**
 * TimeXAxis is the x axis for Time Series graphs.
 */
const TimeXAxis = (props) => {
  const xAxisTop = props.height - MARGIN_BOTTOM;
  const left = MARGIN_LEFT;
  const xMax = props.width - left;
  const yMax = props.height - MARGIN_TOP - MARGIN_BOTTOM;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: [props.from, props.to],
  });

  return (
    <g>
      <AxisBottom
        top={xAxisTop}
        left={left}
        scale={xScale}
        tickValues={(props.showTickLabels && xScale) ? getTickValues(props.from, props.to, props.timezone, xScale) : []}
        stroke={props.strokeColor}
        tickLabelProps={() => ({
          textAnchor: 'middle', fontSize: 10, fontWeight: 500, fontFamily: 'AvenirNext', fill: props.tickLabelColors[0], dy: '-0.25em',
        })}
        tickFormat={tickValue => _formatTime(tickValue, props)}
        tickComponent={({ formattedValue, ...tickProps }) => {
          const transitionStyle = formattedValue.isTransition ? { fontWeight: 600, fill: props.tickLabelColors[1] } : {};
          return <text {...tickProps} {...transitionStyle}>{formattedValue.value}</text>;
        }}
        hideTicks
        hideZero
      />
      {props.showGrid && props.showTickLabels && (
        <GridColumns
          top={MARGIN_TOP}
          left={left}
          width={xMax}
          height={yMax}
          scale={xScale}
          tickValues={xScale ? getTickValues(props.from, props.to, props.timezone, xScale) : []}
          stroke={props.strokeColor}
        />
      )}
    </g>
  );
};

TimeXAxis.displayName = 'TimeXAxis';

TimeXAxis.defaultProps = {
  showGrid: true,
};

TimeXAxis.propTypes = {
  /**
   * Sets the color of the axis and the grid lines.
   * Type: string (required)
   */
  strokeColor: PropTypes.string.isRequired,
  /**
   * Sets the color of the both normal tick label and transition tick label.
   * Type: string (required)
   */
  tickLabelColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Sets the width of the graph canvas.
   * Type: number (required)
   */
  width: PropTypes.number.isRequired,
  /**
   * Sets the height of the graph canvas.
   * Type: number (required)
   */
  height: PropTypes.number.isRequired,
  /**
   * The starting time point in epoch milliseconds.
   * Type: number (required)
   */
  from: PropTypes.number.isRequired,
  /**
   * The ending time point in epoch milliseconds.
   * Type: number (required)
   */
  to: PropTypes.number.isRequired,
  /**
   * The timezone the current user is in.
   * Type: string (required)
   */
  timezone: PropTypes.string.isRequired,
  /**
   * If set, the grid lines are visible.
   * Type: boolean
   */
  showGrid: PropTypes.bool,
  /**
   * If set, the tick labels are visible.
   * Type: boolean (required)
   */
  showTickLabels: PropTypes.bool.isRequired,
};

export default TimeXAxis;
