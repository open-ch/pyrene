import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './arrowPopover.css';
import Popover from '../Popover/Popover';


export const arrowPosition = (position, targetRect, popoverRect) => {
  // Square
  const lengthSide = 20;
  const arrowWidth = (lengthSide * Math.sqrt(2)) / 2;

  // Bounding Rect
  // https://media.prod.mdn.mozit.cloud/attachments/2017/06/07/15087/8f54d3ea8e5ad0a1f12ddc185fb78052/rect.png
  let top = (targetRect.top - popoverRect.top) + (targetRect.height / 2) - (arrowWidth / 2);
  let left = (targetRect.left - popoverRect.left) + (targetRect.width / 2) - (arrowWidth / 2);

  let popoverRectHeight = popoverRect.height - arrowWidth;
  let popoverRectWidth = popoverRect.width - arrowWidth;
  // Do not let arrow overflow
  switch (position) {
    case 'top':
      popoverRectWidth -= arrowWidth;
      top = popoverRectHeight;
      left = left + arrowWidth > popoverRectWidth ? popoverRectWidth : left;
      left = left < 0 ? arrowWidth : left;
      break;
    case 'left':
      popoverRectHeight -= arrowWidth;
      left = popoverRectWidth;
      top = top + arrowWidth > popoverRectHeight ? popoverRectHeight : top;
      top = top < 0 ? arrowWidth : top;
      break;
    case 'bottom':
      popoverRectWidth -= arrowWidth;
      top = -lengthSide / 2;
      left = left + arrowWidth > popoverRectWidth ? popoverRectWidth : left;
      left = left < 0 ? arrowWidth : left;
      break;
    case 'right':
      popoverRectHeight -= arrowWidth;
      left = -lengthSide / 2;
      top = top + arrowWidth > popoverRectHeight ? popoverRectHeight : top;
      top = top < 0 ? arrowWidth : top;
      break;
    default:
      throw new Error('Not a valid position:', position);
  }
  return { top, left, lengthSide };
};

/**
 *  Popover with Arrow
 */
const ArrowPopover = ({
  children, popoverContent, displayPopover, closePopover,
}) => {

  const node = useRef();

  const handleClick = (e) => {
    // click outside
    if (!node.current.contains(e.target)) {
      closePopover();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div styleName={classNames('arrowPopover')}>
      <Popover
        align="center"
        distanceToTarget={20}
        preferredPosition={['top', 'left']}
        renderPopoverContent={(position, nudgedLeft, nudgedTop, targetRect, popoverRect) => {

          const { top, left, lengthSide } = arrowPosition(position, targetRect, popoverRect);

          return (
            <div styleName={classNames('popover')} ref={node}>
              <div>{popoverContent}</div>
              <div
                styleName={classNames('triangle')}
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
        <div>
          {children}
        </div>
      </Popover>
    </div>
  );
};

ArrowPopover.displayName = 'Arrow Popover';

ArrowPopover.defaultProps = {
  closePopover: null,
};

ArrowPopover.propTypes = {
  /**
   * Action element
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

  /**
   * Function to close the popover.
   */
  closePopover: PropTypes.func,
  /**
   * Whether to display the popover.
   */
  displayPopover: PropTypes.bool.isRequired,
  /**
   * Content renderd in popover
   */
  popoverContent: PropTypes.node.isRequired,
};

export default ArrowPopover;
