import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

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
const Heading: FunctionComponent<HeadingProps> = ({
  children,
  level = 1,
}) => (
  <div styleName={classNames(`heading${level}`, 'heading')} title={children}>
    {children}
  </div>
);

export default Heading;
