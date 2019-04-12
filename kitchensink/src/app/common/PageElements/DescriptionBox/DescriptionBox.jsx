import React from 'react';
import PropTypes from 'prop-types';

import './descriptionBox.css';

const DescriptionBox = props => (
  <div styleName="descriptionBox">
    {props.children}
  </div>
);


DescriptionBox.displayName = 'DescriptionBox';

DescriptionBox.propTypes = {
  children: PropTypes.node.isRequired,
};

DescriptionBox.defaultProps = {
};

export default DescriptionBox;
