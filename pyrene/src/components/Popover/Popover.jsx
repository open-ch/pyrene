import React from 'react';
import PropTypes from 'prop-types';
import TinyPopover from 'react-tiny-popover';

/**
 * Pop pop pop.. Is that bubble wrap?
 */
const Popover = props => (
  <TinyPopover
    isOpen={props.displayPopover}
    position={props.position}
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
  position: ['top', 'bottom'],
  renderPopoverContent: () => null,
  onClickOutside: () => null,
};

Popover.propTypes = {
  /**
   * Sets the alignment of the popover.
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),
  autoReposition: PropTypes.bool,
  children: PropTypes.node.isRequired,
  displayPopover: PropTypes.bool,
  distanceToTarget: PropTypes.number,
  onClickOutside: PropTypes.func,
  /**
   * Sets the position of the popover relative to the share button.
   */
  position: PropTypes.arrayOf(PropTypes.oneOf(['top', 'right', 'bottom', 'left'])),
  renderPopoverContent: PropTypes.func.isRequired,

};

export default Popover;