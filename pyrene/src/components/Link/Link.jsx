import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './link.css';

/**
 * Links are used to navigate users to a different page, files, locations or any other URL.
 * You can create links that open in the user's email program or Slack to allow them to send a message.
 *
 * We distinguish 2 types of links, the standalone link and the paragraph link. Both types have a different visual weight then paragraph text.
 *
 * A new page should open in the current window unless information may be lost,
 * e.g. when someone is filling out a form or the destination is an external site such as a docs page.
 */
const Link = props => (
  <a
    styleName={classNames('link', { [`type-${props.type}`]: true }, { disabled: props.disabled })}
    href={props.path}
  >
    <span styleName={'label'}>{props.label}</span>
    {props.type === 'standalone' && <span styleName={'icon'} className={'icon-chevronRight'} />}
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
   * Sets the label displayed to the user.
   */
  label: PropTypes.string.isRequired,
  /**
   * Sets the path the user is redirected to.
   */
  path: PropTypes.string.isRequired,
  /**
   * Sets the overall style.
   */
  type: PropTypes.oneOf(['standalone', 'inline']),
};

Link.examples = [
  { label: 'standalone', path: '#' },
  { type: 'inline', label: 'inline link', path: '#' },
];

export default Link;
