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
    {props.children}
  </TooltipWithBounds>
);

TimeSeriesTooltip.displayName = 'TimeSeriesTooltip';

TimeSeriesTooltip.defaultProps = {};

TimeSeriesTooltip.propTypes = {
  /**
   * The children to render
   */
  children: PropTypes.node.isRequired,

  /**
   * Sets the left offset, controlled by VX
   */
  left: PropTypes.number.isRequired,

  /**
   * Sets the top offset, controlled by VX
   */
  top: PropTypes.number.isRequired,
};

export default TimeSeriesTooltip;
