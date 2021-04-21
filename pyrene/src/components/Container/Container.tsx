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
  collapsible: boolean | undefined,
  /**
   * Whether to display the content when the component is first mounted.
   */
  defaultExpanded: boolean | undefined,
  /**
   * Javascript event handler.
   */
  onChange: ((event: MouseEvent<HTMLDivElement>) => void) | undefined,
  /**
   * Sets the content to be rendered inside the component.
   */
  renderCallback: () => JSX.Element,
  /**
   * Sets the title displayed in the header of the component.
   */
  title: string,
}

const Container: FunctionComponent<ContainerProps> = ({
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

  // eslint-disable-next-line @typescript-eslint/quotes
  console.log("render container");
  
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

export default Container;
