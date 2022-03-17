import React from 'react';

import styles from './DescriptionBox.module.css';

const DescriptionBox: React.FC<{}> = (props) => (
  <div className={styles.descriptionBox}>{props.children}</div>
);

DescriptionBox.displayName = 'DescriptionBox';
export default DescriptionBox;
