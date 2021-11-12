import React, { FunctionComponent } from 'react';
import TinyPopover, { Position, PopoverProps as TinyPopoverProps } from 'react-tiny-popover';

type TargetRect = Omit<DOMRect, 'x' | 'y' | 'toJSON'>;

export interface PopoverProps {
  /**
   * Sets the alignment of the popover.
   */
  align?: TinyPopoverProps['align'],
  /**
  * Whether automatic repositioning is enabled.
  */
  autoReposition?: TinyPopoverProps['disableReposition'],
  /**
  * Wrapped component(s) that the popover is using for its positioning.
  */
  children: JSX.Element,
  /**
  * Whether to display the popover.
  */
  displayPopover?: TinyPopoverProps['isOpen'],
  /**
  * Sets the distance of the popover to its target.
  */
  distanceToTarget?: TinyPopoverProps['padding'],
  /**
  * Called when the user clicks outside of the popover. To be used to toggle the displayPopover prop.
  */
  onClickOutside?: TinyPopoverProps['onClickOutside'],
  /**
  * Sets the preferred position array ordered by priority for auto repositioning.
  */
  preferredPosition?: TinyPopoverProps['position'],
  /**
  * Sets the content displayed inside the popover.
  */
  renderPopoverContent: (position: Position, nudgedLeft: number, nudgedTop: number, targetRect: TargetRect, popoverRect: TargetRect) => JSX.Element,
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

export default Popover;
