import React, { FunctionComponent, MouseEvent } from 'react';
import clsx from 'clsx';
import styles from './Link.module.css';
import { IconNames } from '../types';

export interface LinkProps {
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean;
  /**
   * Sets the label displayed to the user.
   */
  label: string;
  /**
   * Javascript event handler. Overrides the redirect functionality (path prop ignored).
   */
  onClick?: (event: MouseEvent) => void;
  /**
   * Sets the path the user is redirected to.
   */
  path?: string;
  /**
   * Sets the target.
   */
  target?: string;
  /**
   * Sets the overall style.
   */
  type?: 'standalone' | 'inline';
  /**
   * Sets the icon.
   */
  icon?: keyof IconNames;
}

/**
 * Links are used to navigate users to a different page, file, location or any
 * other URL. You can create links that open in the user's email program or
 * Slack to allow them to send a message.
 *
 * We distinguish 2 types of links, the `standalone` link and the paragraph link
 * (`inline`). Both types have a different visual weight than paragraph text.
 *
 * A new page should open in the current window unless information may be lost,
 * e.g. when someone is filling out a form or the destination is an external
 * site such as a docs page.
 */
const Link: FunctionComponent<LinkProps> = ({
  label,
  type = 'standalone',
  disabled = false,
  path,
  target,
  onClick,
  icon,
}: LinkProps) => (
  <a
    className={clsx(styles.link, icon && styles.iconContainer, styles[`type-${type}`], {
      [styles.disabled]: disabled,
    })}
    href={path}
    onClick={
      onClick
        ? (event) => {
            event.preventDefault();
            onClick(event);
          }
        : (event) => {
            event.stopPropagation();
          }
    }
    target={target}
  >
    <span className={styles.label}>{label}</span>
    {(type === 'standalone' || icon) && (
      <span
        className={clsx(
          icon ? styles.extraIcon : styles.icon,
          `pyreneIcon-${icon ?? 'chevronRight'}`
        )}
      />
    )}
  </a>
);

Link.displayName = 'Link';

export default Link;
