import React from 'react';
import clsx from 'clsx';

import './heading.css';

export interface HeadingProps {
  /**
   * The title string.
   */
  children: string
  /**
   * Size level, corresponds to h1 - h4.
   */
  level?: 1 | 2 | 3 | 4
}

/**
* Section or page titles.
*/
const Heading: React.FC<HeadingProps> = ({
  children,
  level = 1,
}: HeadingProps) => (
  <div styleName={clsx(`heading${level}`, 'heading')} title={children}>
    {children}
  </div>
);

Heading.displayName = 'Heading';

export default Heading;
