import React from 'react';
import Section, { SectionProps } from './Section';
import './accordion.css';


export interface AccordionProps {
  /**
   * The list of sections for the action bar. A section is { iconProps?: IconProps, renderContent: () => React.ReactNode, title: string | (() => React.ReactNode)}
   */
  sections: SectionProps[]
  /**
   * Visual style of the accordion
   */
  type?: 'regular' | 'custom'
}

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
