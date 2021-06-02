import React, { FunctionComponent, ReactNode } from 'react';

import styles from './paragraph.css';

export interface ParagraphProps {
  /**
  * The paragraph text. This can be HTML with <br/> or <b>.
  */
  children: ReactNode
}

/**
 * Paragraphs hold text that is not part of other components.
 */
const Paragraph: FunctionComponent<ParagraphProps> = ({ children }: ParagraphProps) => (
  <div className={styles.paragraph}>
    {children}
  </div>
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
