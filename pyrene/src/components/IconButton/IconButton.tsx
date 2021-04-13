import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import './iconbutton.css';

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
const IconButton: FunctionComponent<IconButtonProps> = ({
  disabled = false,
  icon,
  onClick = undefined,
  path = '#',
  type = 'neutral',
}) => (
  <a styleName={classNames('iconbutton', { disabled: disabled }, { [`type-${type}`]: true })}
    href={path}
    onClick={onClick ? ((event) => {
      event.preventDefault();
      onClick(event);
    }) : (event) => {
      event.stopPropagation();
    }}
  >
    <span className={`pyreneIcon-${icon}`} />
  </a>
);

export default IconButton;
