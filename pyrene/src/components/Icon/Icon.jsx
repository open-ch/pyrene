import React from 'react';
import PropTypes from 'prop-types';

import colorConstants from '../../styles/colorConstants';
import styles from './icon.css';


/**
 * IconFont Wrapper. Pass Icon name and color.
 */
const Icon = props => (
  <span
    className={`pyreneIcon-${props.icon} ${styles.icon}`}
    style={{ color: (props.color in colorConstants) ? colorConstants[props.color] : props.color }}
  />
);

Icon.displayName = 'Icon';

Icon.defaultProps = {
  color: 'neutral100',
};

Icon.propTypes = {
  /**
 * Sets the icon color. ( Hint: see colorConstants.js)
 */
  color: PropTypes.string,
  /**
   * Sets the icon.
   */
  icon: PropTypes.string.isRequired,
};

export default Icon;
