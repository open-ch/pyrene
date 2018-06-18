import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './link.css';

/**
 * Links are used primarily on ....
 */
const Link = props => (
  <a
    styleName={classNames('link', { [`type-${props.type}`]: true }, { disabled: props.disabled })}
    href={props.path}
  >
    {props.label}
    {props.type === 'standalone' && <span className={'icon-chevronRight'} />}
  </a>
);

Link.displayName = 'Link';

Link.defaultProps = {
  type: 'standalone',
  disabled: false,
};

Link.propTypes = {
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Displayed label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Do you know da wae?
   */
  path: PropTypes.string.isRequired,
  /**
   * To be changed according to the use case. "Inline" inherits the style from it's parent.
   */
  type: PropTypes.oneOf(['standalone', 'inline']),
};

Link.examples = [
  { label: 'standalone', path: '#' },
  { type: 'inline', label: 'inline link', path: '#' },
];

export default Link;
