import React, { FunctionComponent, ReactNode } from 'react';

import './paragraph.css';

/**
* Paragraphs hold text that is not part of other components.
*/
export interface ParagraphProps {
  /**
  * The paragraph text. This can be HTML with <br/> or <b>.
  */
  children: ReactNode
}

const Paragraph: FunctionComponent<ParagraphProps> = ({ children }: ParagraphProps) => (
  <div styleName="paragraph">
    {children}
  </div>
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
