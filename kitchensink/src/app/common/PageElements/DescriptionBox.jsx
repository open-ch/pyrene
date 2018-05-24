import React from 'react';
import PropTypes from 'prop-types';

import '../../../css/descriptionBox.css';

const DescriptionBox = props => (
  <div styleName={'descriptionBox'}>
    {props.children}
  </div>
);


DescriptionBox.displayName = 'DescriptionBox';

DescriptionBox.propTypes = {};

DescriptionBox.defaultProps = {};

export default DescriptionBox;