import React, { useState } from 'react';
import Popover from 'react-tiny-popover';

import styles from './tooltip.module.css';

export interface TooltipProps {
  /**
   * Sets the alignment of the tooltip.
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Whether automatic repositioning is enabled.
   */
  autoReposition?: boolean;
  /**
   * Wrapped component(s) that the tooltip is using for its positioning.
   */
  children: React.ReactNode;
  /**
   * Sets the distance of the tooltip to its target.
   */
  distanceToTarget?: number;
  /**
   * Sets the label displayed inside of the tooltip.
   */
  label: React.ReactNode;
  /**
   * Sets the Tooltip width. Only to be used to enforce line breaks.
   */
  maxWidth?: number;
  /**
   * Sets the preferred position array ordered by priority for auto repositioning.
   */
  preferredPosition?: ('top' | 'right' | 'bottom' | 'left')[];
}

/**
 * A Tooltip is a small piece of contextual information about an element on the screen, which is displayed when a user hovers or focuses on the element it is describing.
 */
const Tooltip: React.FC<TooltipProps> = ({
  preferredPosition = [],
  align = 'center',
  autoReposition = true,
  maxWidth = 344,
  distanceToTarget = 8,
  label,
  children,
}: TooltipProps) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover
      isOpen={isPopoverOpen}
      position={preferredPosition}
      align={align}
      padding={distanceToTarget}
      content={() => (
        <div className={styles.tooltip} style={{ maxWidth }}>
          {label}
        </div>
      )}
      containerStyle={{
        borderRadius: '2px',
        boxShadow: '0 4px 8px -2px rgba(0, 21, 44, 0.2), 0 0 1px 0 rgba(0, 21, 44, 0.3)',
        zIndex: '9999',
      }}
      disableReposition={!autoReposition}
    >
      <div
        onMouseOver={() => setPopoverOpen(true)}
        onMouseLeave={() => setPopoverOpen(false)}
      >
        {children}
      </div>
    </Popover>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
