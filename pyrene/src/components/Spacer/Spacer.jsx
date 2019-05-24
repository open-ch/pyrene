import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './spacer.css';

/**
* Spacers separate content.
*/
const Spacer = ({ size }) => (
  <div styleName={classNames(`spacer-${size}`, 'spacer')} />
);

Spacer.displayName = 'Spacer';

Spacer.defaultProps = {
  size: 'small',
};

Spacer.propTypes = {
  /**
   * Size/height of the spacer.
    */
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge']),
};

export default Spacer;
