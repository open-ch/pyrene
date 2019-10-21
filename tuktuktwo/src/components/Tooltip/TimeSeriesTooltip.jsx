import React from 'react';
import { TooltipWithBounds } from '@vx/tooltip';
import PropTypes from 'prop-types';

/**
 * Tooltip for time series
 */
const TimeSeriesTooltip = props => (
  <TooltipWithBounds
    // set this to random so it correctly updates with parent bounds
    key={Math.random()}
    top={props.top}
    left={props.left}
    className={props.className}
    // Clear out the stuff vx sets, allowing us to style the children passed in
    style={{ padding: 0, borderRadius: 2 }}
  >
    {props.children(props)}
  </TooltipWithBounds>
);

TimeSeriesTooltip.displayName = 'TimeSeriesTooltip';

TimeSeriesTooltip.defaultProps = {};

TimeSeriesTooltip.propTypes = {
  /**
   * The tooltip children to render, all props will be passed to the function
   */
  children: PropTypes.func.isRequired,

  /**
   * Data value at time
   */
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /**
   * Data label
   */
  dataLabel: PropTypes.string.isRequired,

  /**
   * Data color
   */
  dataColor: PropTypes.string.isRequired,

  /**
   * Sets the left offset, controlled by VX
   */
  left: PropTypes.number.isRequired,

  /**
   * The time of the event or the time range as array
   */
  time: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired,

  /**
   * The time formatting function
   */
  timeFormat: PropTypes.func.isRequired,

  /**
   * Sets the top offset, controlled by VX
   */
  top: PropTypes.number.isRequired,
};

export default TimeSeriesTooltip;
