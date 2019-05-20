import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './heading.css';

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
  children: PropTypes.string.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4]),
};

export default Heading;
