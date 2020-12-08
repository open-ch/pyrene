import React, { useState } from 'react';
import classNames from 'classnames';
import Icon, { IconProps } from '../Icon/Icon';
import './accordion.css';

export interface SectionProps {
  /**
   * Icon on the left of the section header
   */
  iconProps?: IconProps
  /**
   * Render prop for the section content
   */
  renderContent: () => React.ReactNode
  /**
   * Render prop for the title, for custom titles if a string is not enough
   */
  renderTitle?: () => React.ReactNode
  /**
   * Title string
   */
  title?: string
}

const Section: React.FC<SectionProps> = ({
  iconProps,
  renderContent,
  renderTitle,
  title,
}: SectionProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div styleName={classNames('section', { expanded, collapsed: !expanded })}>
      <div styleName="header" onClick={() => setExpanded(!expanded)}>
        {iconProps && <span styleName="icon"><Icon {...iconProps} type="inline" /></span>}

        {title && <div styleName="title text-title">{title}</div>}
        {!(title) && renderTitle && <div styleName="title">{renderTitle()}</div>}

        {!expanded && <Icon type="inline" name="chevronDown" color="neutral500" />}
        {expanded && <Icon type="inline" name="chevronUp" color="neutral500" />}
      </div>
      <div styleName="content">
        {renderContent()}
      </div>
    </div>
  );
};

Section.displayName = 'Accordion.Section';

export default Section;
