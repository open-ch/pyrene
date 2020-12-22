import React from 'react';
import Section, { SectionProps } from './Section';
import './accordion.css';


export interface AccordionProps {
  /**
   * The list of sections for the accordion. A section is { expanded?: boolean, iconProps?: IconProps, renderContent: () => React.ReactNode, title: string | (() => React.ReactNode)}
   */
  sections: SectionProps[]
  /**
   * Visual style of the accordion
   */
  type?: 'regular' | 'custom'
}

/**
 * The accordion component delivers large amounts of content in a small space through progressive disclosure. The header title gives the user a high level overview of the content allowing the user to decide which sections to read.
 * Accordions can make information processing and discovering more effective. However, it does hide content from users and it’s important to account for a user not noticing or reading all of the included content.
 *
 * Accordions can be grouped or function independently. If icons are used in the header title, all header titles should have an icon. The default state for accordions is closed, but in specific situations it may make sense to have one already expanded.
 *
 * There is a regular type for the accordion component that is used in most cases. However, the accordion function can also be used for a custom implementation.
 */
const Accordion: React.FC<AccordionProps> = ({
  sections = [],
  type = 'regular',
}: AccordionProps) => (
  <div styleName={`accordion accordion-${type}`}>
    {sections.map((sectionProps, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Section key={index} {...sectionProps} />
    ))}
  </div>
);

Accordion.displayName = 'Accordion';

export default Accordion;
