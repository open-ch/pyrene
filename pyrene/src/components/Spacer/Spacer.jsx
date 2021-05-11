import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './spacer.css';

/**
* Spacers separate content.
*/
const Spacer = ({ size }) => (
  <div className={clsx(styles[`spacer-${size}`], styles.spacer)} />
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
