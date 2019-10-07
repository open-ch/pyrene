import React from 'react';
import PropTypes from 'prop-types';
import { AxisBottom } from '@vx/axis';
import { GridColumns } from '@vx/grid';
import { scaleTime } from '@vx/scale';
import Responsive from '../Misc/Responsive';
import { getTickValues, timeFormat } from './TimeUtil';
import './timeXAxis.css';

const MARGIN_TOP = 16;
const MARGIN_BOTTOM = 24;
const MARGIN_LEFT = 36;
const STROKE_COLOR = '#e0e2e5';
const LABEL_COLOR = '#979ca8';

const _formatTime = (timestamp, props) => (props.showLabel ? timeFormat(timestamp, props.from, props.to, props.timezone) : '');

/**
 * TimeXAxis is the x axis for Time Series graphs.
 */
const TimeXAxis = props => (
  <Responsive>
    {(parent) => {

      const xAxisTop = parent.height - MARGIN_BOTTOM;
      const left = MARGIN_LEFT;
      const xMax = parent.width - left;
      const gridYMax = parent.height - MARGIN_TOP - MARGIN_BOTTOM;

      const xScale = scaleTime({
        range: [0, xMax],
        domain: [props.from, props.to],
      });

      return (
        <svg height={parent.height} shapeRendering="crispEdges" styleName="xCanvas">
          <AxisBottom
            top={xAxisTop}
            left={left}
            scale={xScale}
            tickValues={getTickValues(props.from, props.to, props.timezone)}
            stroke={STROKE_COLOR}
            tickLabelProps={() => ({
              textAnchor: 'middle', fontSize: 10, fontWeight: 500, fontFamily: 'AvenirNext', fill: LABEL_COLOR,
            })}
            tickFormat={tickValue => _formatTime(tickValue, props)}
            hideTicks
            hideZero
          />
          {props.showGrid && (
            <GridColumns
              top={MARGIN_TOP}
              left={left}
              width={xMax}
              height={gridYMax}
              scale={xScale}
              tickValues={getTickValues(props.from, props.to, props.timezone)}
              stroke={STROKE_COLOR}
            />
          )}
        </svg>
      );
    }}

  </Responsive>
);

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
   * If set, the grid lines are visible.
   * Type: boolean
   */
  showGrid: PropTypes.bool,
  /**
   * If set, the tick labels are visible.
   * Type: boolean (required)
   */
  showLabel: PropTypes.bool.isRequired,
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
};

export default TimeXAxis;
