import React, { useState } from 'react';
import clsx from 'clsx';
import Icon, { IconProps } from '../Icon/Icon';
import styles from './accordion.css';

export interface SectionProps {
  /**
   * True to initially display this section as expanded (defaults to false)
   */
  expanded?: boolean
  /**
   * Icon on the left of the section header
   */
  iconProps?: IconProps
  /**
   * Render prop for the section content
   */
  renderContent: () => React.ReactNode
  /**
   * Title string, or render prop for custom titles
   */
  title: string | (() => React.ReactNode)
}

const Section: React.FC<SectionProps> = ({
  expanded: initiallyExpanded = false,
  renderContent,
  iconProps,
  title,
}: SectionProps) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);

  return (
    <div className={clsx(styles.section, { [styles.expanded]: expanded, [styles.collapsed]: !expanded })}>
      <div className={styles.header} onClick={() => setExpanded(!expanded)}>
        {iconProps && <span className={styles.icon}><Icon {...iconProps} type="inline" /></span>}

        <div className={styles.title}>
          {typeof title === 'string'
            ? <div className={styles['text-title']}>{title}</div>
            : title()}
        </div>

        <span className={clsx(styles.chevron, { 'pyreneIcon-chevronUp': expanded, 'pyreneIcon-chevronDown': !expanded })} />
      </div>

      {expanded && <div className={styles.content}>{renderContent()}</div>}
    </div>
  );
};

Section.displayName = 'Accordion.Section';

export default Section;
