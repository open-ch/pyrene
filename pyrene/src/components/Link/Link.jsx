import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './link.css';


const Link = props => (
  <a
    styleName={classNames('link', { [`type-${props.type}`]: true }, { disabled: props.disabled })}
    href={props.path}
  >
    {props.label}
    {props.type === 'standalone' && <span className={'icon-Skip-right'} />}
  </a>
);

Link.displayName = 'Link';

Link.defaultProps = {
  type: 'standalone',
  disabled: false
};

Link.propTypes = {
  /**
   * To be changed according to the use case. "Inline" inherits the style from it's parent.
   */
  type: PropTypes.oneOf(['standalone', 'inline']),
  /**
   * Do you know da wae?
   */
  path: PropTypes.string.isRequired,
  /**
   * Displayed label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool
};

export default Link;
