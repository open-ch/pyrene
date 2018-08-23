import React from 'react';
import PropTypes from 'prop-types';
import TinyPopover from 'react-tiny-popover';

/**
 * Pop pop pop.. Is that bubble wrap?
 */
const Popover = props => (
  <TinyPopover
    isOpen={props.displayPopover}
    position={props.preferredPosition}
    align={props.align}
    padding={props.distanceToTarget}
    content={({ position, nudgedLeft, nudgedTop, targetRect, popoverRect }) => (
      props.renderPopoverContent(position, nudgedLeft, nudgedTop, targetRect, popoverRect)
    )}
    containerStyle={{
      borderRadius: '4px',
      boxSizing: 'borderBox',
      backgroundColor: 'white',
      boxShadow: '0 4px 8px -2px rgba(0, 21, 44, 0.2), 0 0 1px 0 rgba(0, 21, 44, 0.3)',
      zIndex: 10,
    }}
    onClickOutside={props.onClickOutside}
    disableReposition={!props.autoReposition}
  >
    {props.children}
  </TinyPopover>
);


Popover.displayName = 'Popover';

Popover.defaultProps = {
  align: 'start',
  autoReposition: false,
  displayPopover: false,
  distanceToTarget: 8,
  preferredPosition: ['top', 'bottom'],
  renderPopoverContent: () => null,
  onClickOutside: () => null,
};

Popover.propTypes = {
  /**
   * Sets the alignment of the popover.
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * Whether automatic repositioning is enabled.
   */
  autoReposition: PropTypes.bool,
  /**
   * Wrapped component(s) that the popover is using for its positioning.
   */
  children: PropTypes.func.isRequired,
  /**
   * Whether to display the popover.
   */
  displayPopover: PropTypes.bool,
  /**
   * Sets the distance of the popover to its target.
   */
  distanceToTarget: PropTypes.number,
  /**
   * Called when the user clicks outside of the popover. To be used to toggle the displayPopover prop.
   */
  onClickOutside: PropTypes.func,
  /**
   * Sets the preferred position array ordered by priority for auto repositioning.
   */
  preferredPosition: PropTypes.arrayOf(PropTypes.oneOf(['top', 'right', 'bottom', 'left'])),
  /**
   * Sets the content displayed inside the popover.
   */
  renderPopoverContent: PropTypes.func.isRequired,
};

export default Popover;