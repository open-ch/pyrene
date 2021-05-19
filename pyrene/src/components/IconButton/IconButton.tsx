import React from 'react';
import clsx from 'clsx';
import styles from './iconbutton.css';

export interface IconButtonProps {
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean,
  /**
   * Sets the icon shown
   */
  icon: string,
  /**
   * Javascript event handler. Overrides the redirect functionality (path prop ignored).
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void,
  /**
   * Sets the path the user is redirected to.
   */
  path?: string,
  /**
   * Sets the overall style
   */
  type?: 'neutral' | 'info' | 'warning' | 'danger' | 'success',
}

/**
 * An Icon that acts like a Button
 */
const IconButton: React.FC<IconButtonProps> = ({
  disabled = false,
  icon,
  onClick = undefined,
  path = '#',
  type = 'neutral',
}: IconButtonProps) => (
  <a className={clsx(styles.iconButton, styles[`type-${type}`], { [styles.disabled]: disabled })}
    href={path}
    onClick={
      onClick ? ((event) => {
        event.preventDefault();
        onClick(event);
      }) : (event) => {
        event.stopPropagation();
      }
    }
  >
    <span className={`pyreneIcon-${icon}`} />
  </a>
);

IconButton.displayName = 'Icon Button';

export default IconButton;
