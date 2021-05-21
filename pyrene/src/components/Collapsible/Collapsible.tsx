import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

import styles from './collapsible.css';

export interface CollapsibleProps {
  /**
   * Sets the alignment of the popover.
   */
  align?: 'start' | 'center' | 'end',
  /**
   * Whether to display the content when the component is first mounted.
   */
  defaultExpanded?: boolean,
  /**
  * Sets the label displayed to the user when the component is collapsed.
  */
  labelCollapsed?: string,
  /**
   * Sets the label displayed to the user when the component is expanded.
   */
  labelExpanded?: string,
  /**
   * Javascript event handler.
   */
  onChange?: (event: React.MouseEvent) => void,
  /**
   * Sets the content to be rendered inside the component.
   */
  renderCallback: () => JSX.Element | Array<JSX.Element>,
}

/**
 * Collapsibles allow the user to reveal content that is not displayed.
 *
 * Collapsibles are used when space is limited and the content to be displayed is secondary.
 */
const Collapsible: React.FC<CollapsibleProps> = ({
  align = 'start',
  defaultExpanded = false,
  labelCollapsed = 'Show More',
  labelExpanded = 'Show Less',
  onChange,
  renderCallback,
}: CollapsibleProps) => {

  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const [contentHeight, setContentHeight] = React.useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let height = contentHeight;
    if (contentRef?.current?.clientHeight) {
      height = contentRef.current.clientHeight;
    }
    setContentHeight(height);
  }, [contentHeight]);

  useEffect(() => {
    setExpanded(defaultExpanded);
  }, [defaultExpanded]);

  const toggleCollapse = (event:React.MouseEvent) => {
    setExpanded((prevExpanded) => !prevExpanded);
    if (onChange) onChange(event);
  };

  return (
    <div className={clsx(styles.collapsibleBox, { [styles.expanded]: expanded })}>
      <div className={clsx(styles.buttonAlignmentBox, styles[`align-${align}`])}>
        <div className={clsx(styles.collapsibleButton, 'unSelectable')} onClick={(event:React.MouseEvent) => toggleCollapse(event)} role="button" aria-label="Show or hide content">
          <div className={styles.centeringBox}>
            <span className={styles.label}>
              { expanded && labelExpanded ? labelExpanded : labelCollapsed }
            </span>
            <span className={clsx('pyreneIcon-chevronDown', styles.collapseArrow)} />
          </div>
        </div>
      </div>
      <div className={styles.collapsibleBody} style={{ height: (expanded && contentHeight) ? contentHeight : undefined }}>
        <div ref={contentRef} className={styles.clientContent}>
          { renderCallback() }
        </div>
      </div>
    </div>
  );
};

Collapsible.displayName = 'Collapsible';

export default Collapsible;
