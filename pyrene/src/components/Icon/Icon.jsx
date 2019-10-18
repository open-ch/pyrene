import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import colorConstants from '../../styles/colorConstants';
import './icon.css';


/**
 * IconFont Wrapper. Pass Icon name and color.
 */
const Icon = props => (
  <div
    className={`pyreneIcon-${props.icon}`}
    styleName={classNames(
      'icon',
      { [`type-${props.type}`]: true }
    )}
    style={{ color: (props.color in colorConstants) ? colorConstants[props.color] : props.color }}
  />
);

Icon.displayName = 'Icon';

Icon.defaultProps = {
  type: 'inline',
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
  /**
   * Sets the overall style.
   */
  type: PropTypes.oneOf(['standalone', 'inline']),
};

export default Icon;
