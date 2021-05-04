import React, { FunctionComponent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import TinyPopover from 'react-tiny-popover';

/**
 * Pop pop pop.. Is that bubble wrap?
 */

export interface PopoverProps {
  /**
   * Sets the alignment of the popover.
   */
  align?: 'start' | 'center' | 'end',
  /**
  * Whether automatic repositioning is enabled.
  */
  autoReposition?: boolean,
  /**
  * Wrapped component(s) that the popover is using for its positioning.
  */
  children: ReactNode,
  /**
  * Whether to display the popover.
  */
  displayPopover?: boolean,
  /**
  * Sets the distance of the popover to its target.
  */
  distanceToTarget?: number,
  /**
  * Called when the user clicks outside of the popover. To be used to toggle the displayPopover prop.
  */
  onClickOutside?: () => void,
  /**
  * Sets the preferred position array ordered by priority for auto repositioning.
  */
  preferredPosition?: Array<'top' | 'right' | 'bottom' | 'left'>,
  /**
  * Sets the content displayed inside the popover.
  */
  renderPopoverContent: (postion?: { position: string, nudgedLeft: string, nudgedTop: string, targetRect: string, popoverRect: string}) => JSX.Element,
}

const Popover: FunctionComponent<PopoverProps> = ({
  displayPopover = false,
  preferredPosition = ['top', 'bottom'],
  align = 'start',
  distanceToTarget = 8,
  renderPopoverContent,
  onClickOutside = () => null,
  autoReposition = false,
  children,

}: PopoverProps) => (
  <TinyPopover
    isOpen={displayPopover}
    position={preferredPosition}
    align={align}
    padding={distanceToTarget}
    content={({
      position, nudgedLeft, nudgedTop, targetRect, popoverRect,
    }) => (
      renderPopoverContent(position, nudgedLeft, nudgedTop, targetRect, popoverRect)
    )}
    containerStyle={{
      overflow: 'visible',
      borderRadius: '2px',
      boxSizing: 'borderBox',
      backgroundColor: 'white',
      boxShadow: '0 4px 8px -2px rgba(0, 21, 44, 0.2)',
      // @ts-ignore
      zIndex: 10,
    }}
    onClickOutside={onClickOutside}
    disableReposition={!autoReposition}
  >
    {children}
  </TinyPopover>
);


Popover.displayName = 'Popover';

Popover.defaultProps = {
  align: 'start',
  autoReposition: false,
  displayPopover: false,
  distanceToTarget: 8,
  preferredPosition: ['top', 'bottom'],
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
  children: PropTypes.element.isRequired,
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
