import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './loader.css';

/**
 * Loaders display an unspecified wait time.
 *
 * The Loader is not a progress indicator and should not be used if the load time is to be displayed.
 */
const Loader = props => (
  <React.Fragment>
    { props.type === 'standalone'
    && (
      <div styleName={classNames('canvas', { [`size-${props.size}`]: true })}>
        <div styleName={classNames('standaloneLoader', { [`styling-${props.type}`]: true }, { [`size-${props.size}`]: true })} />
      </div>
    )
    }
    {' '}
    { props.type === 'inline'
      && (
        <span styleName={classNames('inlineLoader')} />
      )
    }
  </React.Fragment>
);

Loader.displayName = 'Loader';

Loader.defaultProps = {
  type: 'standalone',
  styling: 'dark',
  size: 'medium',
};

Loader.propTypes = {
  /**
   * Sets the size.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  /**
   * Sets the standalone color
   */
  // eslint-disable-next-line react/no-unused-prop-types
  styling: PropTypes.oneOf(['dark', 'light']),
  /**
   * Sets the type (and based on type its color)
   */
  type: PropTypes.oneOf(['standalone', 'inline']),
};

export default Loader;
