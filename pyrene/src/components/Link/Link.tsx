import React, { FunctionComponent } from 'react';
import clsx from 'clsx';

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

export interface LinkProps {
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean,
  /**
   * Sets the label displayed to the user.
   */
  label: string,
  /**
   * Javascript event handler. Overrides the redirect functionality (path prop ignored).
   */
  onClick?: () => void,
  /**
   * Sets the path the user is redirected to.
   */
  path?: string,
  /**
   * Sets the target.
   */
  target?: string,
  /**
   * Sets the overall style.
   */
  type?: 'standalone' | 'inline',
}

const Link: FunctionComponent<LinkProps> = ({
  label, type = 'standalone', disabled = false, path = undefined, target = undefined, onClick = undefined,
}: LinkProps) => (
  <a
    styleName={clsx('link', { [`type-${type}`]: true }, { disabled })}
    href={path}
    onClick={onClick ? ((event) => {
      event.preventDefault();
      onClick(event);
    }) : (event) => {
      event.stopPropagation();
    }}
    target={target}
  >
    <span styleName="label">{label}</span>
    {type === 'standalone' && <span styleName="icon" className="pyreneIcon-chevronRight" />}
  </a>
);

Link.displayName = 'Link';

export default Link;
