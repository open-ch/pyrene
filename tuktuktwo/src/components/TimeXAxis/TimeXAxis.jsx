import React from 'react';
import PropTypes from 'prop-types';
import { AxisBottom } from '@vx/axis';
import { GridColumns } from '@vx/grid';
import { scaleTime } from '@vx/scale';
import Responsive from '../Misc/Responsive';
import { getTickValues, timeFormat } from './TimeUtil';

const MARGIN_TOP = 16;
const MARGIN_BOTTOM = 24;
const MARGIN_LEFT = 36;
const STROKE_COLOR = '#e0e2e5';
const LABEL_COLOR = '#979ca8';

const _formatTime = (timestamp, props) => (props.showLabel ? timeFormat(timestamp, props.to - props.from, props.timezone) : '');

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
        <svg width={parent.width} height={parent.height} shapeRendering="crispEdges">
          <AxisBottom
            top={xAxisTop}
            left={left}
            scale={xScale}
            tickValues={getTickValues(props.from, props.to)}
            stroke={STROKE_COLOR}
            tickLabelProps={() => ({
              textAnchor: 'middle', fontSize: 10, fontFamily: 'AvenirNext', fill: LABEL_COLOR,
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
  from: PropTypes.number.isRequired,
  showGrid: PropTypes.bool,
  showLabel: PropTypes.bool.isRequired,
  timezone: PropTypes.string.isRequired,
  to: PropTypes.number.isRequired,
};

export default TimeXAxis;
