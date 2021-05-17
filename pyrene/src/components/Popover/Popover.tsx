import React, { FunctionComponent } from 'react';
import TinyPopover, { Position } from 'react-tiny-popover';

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
  children: JSX.Element,
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
  renderPopoverContent: (position: Position, nudgedLeft: number, nudgedTop: number, targetRect: ClientRect, popoverRect: ClientRect) => JSX.Element,
}

/**
 * Pop pop pop.. Is that bubble wrap?
 */
const Popover: FunctionComponent<PopoverProps> = ({
  children,
  renderPopoverContent,
  displayPopover = false,
  preferredPosition = ['top', 'bottom'],
  align = 'start',
  distanceToTarget = 8,
  onClickOutside = () => null,
  autoReposition = false,
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
      zIndex: '10',
    }}
    onClickOutside={onClickOutside}
    disableReposition={!autoReposition}
  >
    {children}
  </TinyPopover>
);


Popover.displayName = 'Popover';

/**
 * defaultProps for compatibilty with kitchensink for pyrene documentation
 */
Popover.defaultProps = {
  align: 'start',
  autoReposition: false,
  displayPopover: false,
  distanceToTarget: 8,
  preferredPosition: ['top', 'bottom'],
  onClickOutside: () => null,
};

export default Popover;
