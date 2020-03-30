import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './heading.css';

/**
* Section or page titles.
*/
const Heading = ({ children, level }) => (
  <div styleName={classNames(`heading${level}`, 'heading')}>
    {children}
  </div>
);

Heading.displayName = 'Heading';

Heading.defaultProps = {
  level: 1,
};

Heading.propTypes = {
  /**
    * The title string.
    */
  children: PropTypes.string.isRequired,
  /**
  * Size level, corresponds to h1 - h4.
  */
  level: PropTypes.oneOf([1, 2, 3, 4]),
};

export default Heading;
