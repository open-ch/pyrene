import React from 'react';

import styles from './Paragraph.module.css';

interface ParagraphProps {
  title?: string;
}

const Paragraph: React.FC<ParagraphProps> = (props) => (
  <div className={styles.paragraph}>
    {props.title && <div className={styles.title}>{props.title}</div>}
    <div>{props.children}</div>
  </div>
);

Paragraph.displayName = 'Paragraph';
export default Paragraph;
