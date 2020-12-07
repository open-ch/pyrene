import React from 'react';
import Section, { SectionProps } from './Section';
import './accordion.css';


export interface AccordionProps {
  /**
   * The list of sections for the action bar.
   */
  sections: SectionProps[]
  /**
   * Visual style of the accordion
   */
  style?: 'large' | 'small'
}

const Accordion: React.FC<AccordionProps> = ({
  sections = [],
  style = 'large',
}: AccordionProps) => (
  <div styleName={`accordion accordion-${style}`}>
    {sections.map((sectionProps, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Section key={('title' in sectionProps && sectionProps.title) || ('renderTitle' in sectionProps && sectionProps.renderTitle && btoa(sectionProps.renderTitle.toString())) || index} {...sectionProps} />
    ))}
  </div>
);

Accordion.displayName = 'Accordion';

export default Accordion;
