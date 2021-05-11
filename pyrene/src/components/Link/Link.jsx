import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './link.css';

/**
 * Links are used to navigate users to a different page, files, locations or any other URL.
 * You can create links that open in the user's email program or Slack to allow them to send a message.
 *
 * We distinguish 2 types of links, the standalone link and the paragraph link. Both types have a different visual weight then paragraph text.
 *
 * A new page should open in the current window unless information may be lost,
 * e.g. when someone is filling out a form or the destination is an external site such as a docs page.
 */
const Link = (props) => (
  <a
    className={clsx(styles.link, styles[`type-${props.type}`], { [styles.disabled]: props.disabled })}
    href={props.path}
    onClick={props.onClick ? ((event) => {
      event.preventDefault();
      props.onClick(event);
    }) : (event) => {
      event.stopPropagation();
    }}
    target={props.target}
  >
    <span className={styles.label}>{props.label}</span>
    {props.type === 'standalone' && <span className={clsx(styles.icon, 'pyreneIcon-chevronRight')} />}
  </a>
);

Link.displayName = 'Link';

Link.defaultProps = {
  type: 'standalone',
  disabled: false,
  onClick: undefined,
  path: undefined,
  target: undefined,
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
   * Javascript event handler. Overrides the redirect functionality (path prop ignored).
   */
  onClick: PropTypes.func,
  /**
   * Sets the path the user is redirected to.
   */
  path: PropTypes.string,
  /**
   * Sets the target.
   */
  target: PropTypes.string,
  /**
   * Sets the overall style.
   */
  type: PropTypes.oneOf(['standalone', 'inline']),
};

export default Link;
