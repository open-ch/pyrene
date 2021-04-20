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
  collapsible: boolean,
  /**
   * Whether to display the content when the component is first mounted.
   */
  defaultExpanded: boolean,
  /**
   * Javascript event handler.
   */
  onChange: (event: MouseEvent<HTMLDivElement>) => void,
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
  const clickedEvent = useRef<MouseEvent<HTMLDivElement>|null>(null);

  useEffect(() => {
    if (contentRef?.current?.clientHeight) {
      setContentHeight(contentRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    if (contentRef?.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onChange(clickedEvent.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);


  const toggleCollapse = (event: MouseEvent<HTMLDivElement>) => {
    event.persist();
    clickedEvent.current = event;
    if (collapsible) {
      setExpanded((prevState) => !prevState);
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
      <div className={styles.contentContainer} style={{ height: (expanded || !collapsible) && contentHeight ? contentHeight : 0 }}>
        <div className={styles.innerContentContainer} ref={contentRef}>
          {renderCallback()}
        </div>
      </div>
    </div>
  );
};

Container.displayName = 'Container';

export default Container;
