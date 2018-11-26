import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './loader.css';

/**
 * Loaders display an unspecified wait time.
 *
 * The Loader is not a progress indicator and should not be used if the load time is to be displayed.
 */
const Loader = (props) => (
  <div styleName={classNames('canvas', { [`size-${props.size}`]: true })}>
    <div styleName={classNames('pyreneLoader', { [`type-${props.type}`]: true }, { [`size-${props.size}`]: true })} />
  </div>
);

Loader.displayName = 'Loader';

Loader.defaultProps = {
  type: 'dark',
  size: 'medium',
};

Loader.propTypes = {
  /**
   * Sets the size.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  /**
   * Sets the overall style.
   */
  type: PropTypes.oneOf(['dark', 'light']),
};

export default Loader;
