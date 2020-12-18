import React, { useState } from 'react';
import classNames from 'classnames';
import Icon, { IconProps } from '../Icon/Icon';
import './accordion.css';

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
    <div styleName={classNames('section', { expanded, collapsed: !expanded })}>
      <div styleName="header" onClick={() => setExpanded(!expanded)}>
        {iconProps && <span styleName="icon"><Icon {...iconProps} type="inline" /></span>}

        <div styleName="title">
          {typeof title === 'string'
            ? <div styleName="text-title">{title}</div>
            : title()}
        </div>

        <span styleName="chevron" className={`pyreneIcon-${expanded ? 'chevronUp' : 'chevronDown'}`} />
      </div>

      {expanded && <div styleName="content">{renderContent()}</div>}
    </div>
  );
};

Section.displayName = 'Accordion.Section';

export default Section;
