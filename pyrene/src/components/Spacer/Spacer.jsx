import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './spacer.css';

const Spacer = ({ size }) => (
  <div styleName={classNames(`spacer-${size}`, 'spacer')} />
);

Spacer.displayName = 'Spacer';

Spacer.defaultProps = {
  size: 'small',
};

Spacer.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
};

export default Spacer;
