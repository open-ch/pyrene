import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWithBounds } from '@vx/tooltip';
import chartConstants from '../../common/chartConstants';

/**
 * Tooltip for time series
 */
const TooltipWrapper = ({ top, left, children }) => (
  <TooltipWithBounds
    // set this to random so it correctly updates with parent bounds
    key={Math.random()}
    top={top + 5}
    left={left}
    offsetLeft={chartConstants.tooltipOffset}
    offsetTop={chartConstants.tooltipOffset}
    // Clear out the stuff vx sets, allowing us to style the children passed in
    style={{ padding: 0, borderRadius: 2 }}
  >
    {children}
  </TooltipWithBounds>
);

TooltipWrapper.displayName = 'TooltipWrapper';

TooltipWrapper.defaultProps = {};

TooltipWrapper.propTypes = {
  /**
   * The children to render
   */
  children: PropTypes.node.isRequired,

  /**
   * Sets the left absolute position, controlled by VX
   */
  left: PropTypes.number.isRequired,

  /**
   * Sets the top absolute position, controlled by VX
   */
  top: PropTypes.number.isRequired,
};

export default TooltipWrapper;
