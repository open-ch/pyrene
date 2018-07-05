import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './loader.css';

/**
 * You spin my head right round..
 */
const Loader = (props) => (
  <div styleName={classNames('pyreneLoader', {[`type-${props.type}`]: true})} />
);

Loader.displayName = 'Loader';

Loader.defaultProps = {
  type: 'default',
};

Loader.propTypes = {
  /**
   * Changes the overall appearance of the loader.
   */
  type: PropTypes.oneOf(['default', 'inverted'])
};

export default Loader;