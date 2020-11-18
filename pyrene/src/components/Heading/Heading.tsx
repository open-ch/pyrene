import React from 'react';
import PropTypes from 'prop-types';
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
const Heading: React.FC<HeadingProps> = ({
  children,
  level = 1,
}: HeadingProps) => (
  <div styleName={classNames(`heading${level}`, 'heading')}>
    {children}
  </div>
);

Heading.displayName = 'Heading';

export default Heading;
