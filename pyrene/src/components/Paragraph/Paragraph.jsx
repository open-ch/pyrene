import React from 'react';
import PropTypes from 'prop-types';

import './paragraph.css';

const Paragraph = ({ children }) => (
  <div styleName="paragraph">
    {children}
  </div>
);

Paragraph.displayName = 'Paragraph';

Paragraph.defaultProps = {
};

Paragraph.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export default Paragraph;
