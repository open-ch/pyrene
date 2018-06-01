import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './descriptionBox.css';

const DescriptionBox = props => (
  <div styleName={classNames('descriptionBox', { large: props.large })}>
    {props.children}
  </div>
);


DescriptionBox.displayName = 'DescriptionBox';

DescriptionBox.propTypes = {
  large: PropTypes.bool,
};

DescriptionBox.defaultProps = {
  large: false,
};

export default DescriptionBox;
