import React from 'react';
import PropTypes from 'prop-types';

import './icon.css';
import colorConstants from '../../styles/colorConstants';

/**
 * IconFont Wrapper. Pass Icon name and color.
 */
const Icon = props => (
  <span
    className={`pyreneIcon-${props.icon} icon`}
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
