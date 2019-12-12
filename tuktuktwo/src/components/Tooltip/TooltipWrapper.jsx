import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, TooltipWithBounds } from '@vx/tooltip';
import chartConstants from '../../common/chartConstants';

/**
 * Tooltip for time series
 */
const TooltipWrapper = ({
  overflow,
  top,
  left,
  children,
}) => (
  overflow ? (
    <Tooltip
      // set this to random so it correctly updates with parent bounds
      key={Math.random()}
      top={top + chartConstants.tooltipOffset + 5}
      left={left + chartConstants.tooltipOffset}
      // Clear out the stuff vx sets, allowing us to style the children passed in
      style={{ padding: 0, borderRadius: 2 }}
    >
      {children}
    </Tooltip>
  ) : (
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
  )
);

TooltipWrapper.displayName = 'TooltipWrapper';

TooltipWrapper.defaultProps = {
  overflow: false,
};

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
   * If set, allows the tooltip to overflow its parent's boundaries. Otherwise will flip left/right and bottom/up to stay in the boundaries.
   */
  overflow: PropTypes.bool,

  /**
   * Sets the top absolute position, controlled by VX
   */
  top: PropTypes.number.isRequired,
};

export default TooltipWrapper;
