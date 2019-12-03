import React from 'react';
import PropTypes from 'prop-types';
import { AxisBottom } from '@vx/axis';
import { GridColumns } from '@vx/grid';
import { Group } from '@vx/group';
import { scaleTime } from '@vx/scale';
import { getTickValues, timeFormat } from './TimeXUtil';
import chartConstants from '../../common/chartConstants';

const formatTime = (timestamp, props) => (props.showTickLabels ? timeFormat(timestamp, props.from, props.to, props.timezone) : '');

/**
 * TimeXAxis is the x axis for Time Series graphs.
 */
const TimeXAxis = (props) => {
  const xMax = props.width - props.marginLeft;
  const yMax = props.height - props.marginBottom;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: [props.from, props.to],
  });

  return (
    <Group top={0} left={props.marginLeft}>
      <AxisBottom
        top={yMax}
        left={0}
        scale={xScale}
        tickValues={(props.showTickLabels && xScale) ? getTickValues(props.from, props.to, props.timezone, xScale) : []}
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
        label={props.label}
        labelProps={{
          textAnchor: 'middle', fontSize: 11, fontWeight: 500, fontFamily: 'AvenirNext', fill: props.tickLabelColors[0], dy: '-1.675em', lineHeight: '1.45', letterSpacing: '0.6px',
        }}
        hideTicks
        hideZero
      />
      {props.showGrid && props.showTickLabels && (
        <GridColumns
          top={0}
          left={0}
          width={xMax}
          height={yMax}
          scale={xScale}
          tickValues={xScale ? getTickValues(props.from, props.to, props.timezone, xScale) : []}
          stroke={props.strokeColor}
        />
      )}
    </Group>
  );
};

TimeXAxis.displayName = 'TimeXAxis';

TimeXAxis.defaultProps = {
  label: '',
  marginBottom: chartConstants.marginBottom,
  marginLeft: chartConstants.marginLeftNumerical,
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
   * Sets the axis label.
   */
  label: PropTypes.string,
  /**
   * Sets the margin on the bottom.
   */
  marginBottom: PropTypes.number,
  /**
   * Sets the margin on the left.
   */
  marginLeft: PropTypes.number,
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
