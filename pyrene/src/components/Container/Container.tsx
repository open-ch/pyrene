import React, {
  FunctionComponent, useEffect, useState, useRef, MouseEvent,
} from 'react';
import clsx from 'clsx';

import styles from './container.css';

/**
 * Container contain content and actions about a single subject.
 */

interface ContainerProps {
  /**
   * Whether the container is collapsible when the user clicks on the header.
   */
  // eslint-disable-next-line react/require-default-props
  collapsible?: boolean,
  /**
   * Whether to display the content when the component is first mounted.
   */
  // eslint-disable-next-line react/require-default-props
  defaultExpanded?: boolean,
  /**
   * Javascript event handler.
   */
  // eslint-disable-next-line react/require-default-props
  onChange?: (event: MouseEvent<HTMLDivElement>) => void,
  /**
   * Sets the content to be rendered inside the component.
   */
  renderCallback: () => JSX.Element,
  /**
   * Sets the title displayed in the header of the component.
   */
  title: string,
}

export const Container: FunctionComponent<ContainerProps> = ({
  collapsible = false,
  defaultExpanded = false,
  onChange = () => null,
  renderCallback,
  title,
}: ContainerProps) => {
  const [contentHeight, setContentHeight] = useState<number|null>(null);
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef?.current) {
      setContentHeight(contentRef.current.clientHeight);
    }
  }, []);

  const toggleCollapse = (event: MouseEvent<HTMLDivElement>) => {
    event.persist();
    if (collapsible) {
      setExpanded((prevState) => !prevState);
      onChange(event);
    }
  };

  return (
    <div className={clsx(styles.container, { [styles.expanded]: expanded || !collapsible })}>
      <div className={clsx(styles.header, { [styles.collapsible]: collapsible })} onClick={toggleCollapse} role="button" aria-label="Show or hide container">
        <span className={clsx(styles.title, 'unSelectable')}>
          {' '}
          {title}
        </span>
        <div className={styles.arrowContainer}>
          {collapsible && <span className={clsx('pyreneIcon-chevronDown', styles.collapsArrow)} />}
        </div>
      </div>
      <div
        className={styles.contentContainer}
        style={{ ...(expanded || !collapsible) && contentHeight ? { height: contentHeight } : {} }}
      >
        <div className={styles.innerContentContainer} ref={contentRef}>
          {renderCallback()}
        </div>
      </div>
    </div>
  );
};

Container.displayName = 'Container';
