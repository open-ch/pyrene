import React from 'react';
import PropTypes from 'prop-types';
import { AxisBottom } from '@vx/axis';
import { GridColumns } from '@vx/grid';
import { Group } from '@vx/group';
import { getTickValues, timeFormat } from './TimeXUtil';
import chartConstants from '../../common/chartConstants';

const formatTime = (timestamp, props) => (props.showTickLabels ? timeFormat(timestamp, props.from, props.to, props.timezone) : '');

/**
 * TimeXAxis is the x axis for Time Series graphs.
 */
const TimeXAxis = (props) => {
  const yMax = props.height - chartConstants.marginBottom;

  return (
    <Group>
      <AxisBottom
        top={yMax}
        scale={props.scale}
        tickValues={(props.showTickLabels && props.scale) ? getTickValues(props.from, props.to, props.timezone, props.scale) : []}
        stroke={props.strokeColor}
        tickLabelProps={() => ({
          textAnchor: 'middle', fontSize: 10, fontWeight: 500, fontFamily: 'AvenirNext', fill: props.tickLabelColors[0], dy: '-0.25em',
        })}
        tickFormat={(tickValue) => formatTime(tickValue, props)}
        tickComponent={({ formattedValue, ...tickProps }) => (
          <text
            {...tickProps} // eslint-disable-line react/jsx-props-no-spreading
            fill={formattedValue.isTransition ? props.tickLabelColors[1] : props.tickLabelColors[0]}
            fontWeight={formattedValue.isTransition ? 600 : 500}
          >
            {formattedValue.value}
          </text>
        )}
        hideTicks
        hideZero
      />
      {props.showGrid && props.showTickLabels && (
        <GridColumns
          height={yMax}
          scale={props.scale}
          tickValues={props.scale ? getTickValues(props.from, props.to, props.timezone, props.scale) : []}
          stroke={props.strokeColor}
        />
      )}
    </Group>
  );
};

TimeXAxis.displayName = 'TimeXAxis';

TimeXAxis.defaultProps = {
  showGrid: true,
};

TimeXAxis.propTypes = {
  /**
   * The starting time point in epoch milliseconds.
   * Type: number (required)
   */
  from: PropTypes.number.isRequired,
  /**
   * Sets the height of the graph canvas.
   * Type: number (required)
   */
  height: PropTypes.number.isRequired,
  /**
   * Sets the scale function for the label axis.
   */
  scale: PropTypes.func.isRequired,
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
   * The timezone the current user is in.
   * Type: string (required)
   */
  timezone: PropTypes.string.isRequired,
  /**
   * The ending time point in epoch milliseconds.
   * Type: number (required)
   */
  to: PropTypes.number.isRequired,
  /**
   * Sets the width of the graph canvas.
   * Type: number (required)
   */
  width: PropTypes.number.isRequired,
};

export default TimeXAxis;
