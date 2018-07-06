import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './loader.css';

/**
 * You spin my head right round..
 */
const Loader = (props) => (
  <div styleName={classNames('canvas', {[`size-${props.size}`]: true })}>
    <div styleName={classNames('pyreneLoader', {[`type-${props.type}`]: true}, {[`size-${props.size}`]: true })} />
  </div>
);

Loader.displayName = 'Loader';

Loader.defaultProps = {
  type: 'default',
};

Loader.propTypes = {
  /**
   * Sets the size of the loader.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']).isRequired,
  /**
   * Changes the overall appearance of the loader.
   */
  type: PropTypes.oneOf(['default', 'inverted']),
};

export default Loader;