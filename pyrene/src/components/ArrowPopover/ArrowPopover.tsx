import React, { useEffect, useRef } from 'react';
import Popover from '../Popover/Popover';

import './arrowPopover.css';

export type PreferredPos = ('top' | 'right' | 'bottom' | 'left')[];
export type Alignment = 'start' | 'center' | 'end';
interface ArrowPosition {
  top: number,
  left: number,
  lengthSide: number,
}

export interface ArrowPopoverProps {
  /**
   * Sets the alignment of the popover.
   */
  align?: Alignment,
  /**
   * Action element
   */
  children: React.ReactElement,
  /**
   * Function to close the popover.
   */
  closePopover?: () => void,
  /**
   * Whether to display the popover.
   */
  displayPopover: boolean,
  /**
   * Sets the distance of the popover to its target.
   */
  distanceToTarget?: number,
  /**
   * Content rendered in popover
   */
  popoverContent: React.ReactElement,
  /**
   * Sets the preferred position array ordered by priority for auto repositioning.
   */
  preferredPosition?: PreferredPos,
}

export const arrowPosition = (position: string, targetRect: ClientRect, popoverRect: ClientRect): ArrowPosition => {
  // Square
  const lengthSide = 20;
  const arrowWidth = (lengthSide * Math.sqrt(2)) / 2;

  // Bounding Rect

  // https://media.prod.mdn.mozit.cloud/attachments/2017/06/07/15087/8f54d3ea8e5ad0a1f12ddc185fb78052/rect.png
  let top = targetRect.top - popoverRect.top + (targetRect.height / 2) - (lengthSide / 2);
  let left = targetRect.left - popoverRect.left + (targetRect.width / 2) - (lengthSide / 2);

  const heightOverflowPoint = popoverRect.height - arrowWidth;
  const widthOverflowPoint = popoverRect.width - arrowWidth;
  // Do not let arrow overflow
  switch (position) {
    case 'top':
      top = heightOverflowPoint;
      left = left + arrowWidth > widthOverflowPoint ? widthOverflowPoint - arrowWidth : left;
      left = left < arrowWidth ? arrowWidth : left;
      break;
    case 'left':
      left = widthOverflowPoint;
      top = top + arrowWidth > heightOverflowPoint ? heightOverflowPoint - arrowWidth : top;
      top = top < arrowWidth ? arrowWidth : top;
      break;
    case 'bottom':
      top = -lengthSide / 2;
      left = left + arrowWidth > widthOverflowPoint ? widthOverflowPoint - arrowWidth : left;
      left = left < arrowWidth ? arrowWidth : left;
      break;
    case 'right':
      left = -lengthSide / 2;
      top = top + arrowWidth > heightOverflowPoint ? heightOverflowPoint - arrowWidth : top;
      top = top < arrowWidth ? arrowWidth : top;
      break;
    default:
      throw new Error(`Not a valid position: ${position}`);
  }
  return { top, left, lengthSide };
};

const handleClick = (e:MouseEvent, node:React.RefObject<HTMLDivElement>, closePopover:(() => void) | undefined) => {
  if (closePopover && node && node.current && !node.current.contains(e.target as Node)) {
    closePopover();
  }
};

/**
 *  Popover with Arrow
 */
const ArrowPopover: React.FC<ArrowPopoverProps> = ({
  children,
  popoverContent,
  displayPopover,
  closePopover,
  preferredPosition = ['top', 'left'],
  align = 'center',
  distanceToTarget = 20,
}: ArrowPopoverProps) => {

  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', (ev) => { handleClick(ev, node, closePopover); });
    return () => {
      document.removeEventListener('mousedown', (ev) => { handleClick(ev, node, closePopover); });
    };
  }, [closePopover, node]);

  return (
    <Popover
      align={align}
      distanceToTarget={distanceToTarget}
      preferredPosition={preferredPosition}
      renderPopoverContent={(position, nudgedLeft, nudgedTop, targetRect, popoverRect) => {

        const { top, left, lengthSide } = arrowPosition(position, targetRect, popoverRect);

        return (
          <div styleName="popover" ref={node}>
            <div styleName="popoverContent">{popoverContent}</div>
            <div
              styleName="triangle"
              style={{
                left,
                top,
                width: lengthSide,
                height: lengthSide,
              }}
            />
          </div>
        );
      }}
      displayPopover={displayPopover}
      autoReposition
    >
      {children}
    </Popover>
  );
};

ArrowPopover.displayName = 'Arrow Popover';

export default ArrowPopover;
