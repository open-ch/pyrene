import React from 'react';
import clsx from 'clsx';

import styles from './button.css';
import Loader from '../Loader/Loader';

export type Type = 'primary' | 'secondary' | 'danger' | 'ghost' | 'action' | 'success';
export type ActionType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  /**
   * Sets the type attribute.
   */
  actionType?: ActionType,
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean,
  /**
   * Adds an icon to the element.
   */
  icon?: string;
  /**
   * Sets the label displayed to the user.
   */
  label: string | React.ReactElement,
  /**
   * Disables the component and displays a loader inside of it.
   */
  loading?: boolean,
  /**
   * Javascript event handler.
   */
  onClick?: (e: React.MouseEvent) => void;
  /**
   * Sets the overall style.
   */
  type?: Type,
}

/**
 * Buttons are used primarily on action items and to communicate what action the user can take.
 * They are placed throughout the UI and can be found in places like forms, modals, dialogues etc.
 *
 * Do not use Buttons as navigational elements.
 * Instead, use Links because it takes the user to a new page and is not associated with an action.
 */
const Button: React.FC<ButtonProps> = ({
  actionType = 'submit',
  disabled = false,
  icon,
  loading = false,
  type = 'primary',
  onClick = () => null,
  label,
}: ButtonProps) => (
  <div className={styles.buttonContainer}>
    <button
      // eslint-disable-next-line react/button-has-type
      type={actionType}
      className={
        clsx('unSelectable', styles.button,
          styles[`type-${type}`],
          { [styles.disabled]: disabled },
          { [styles.loading]: loading })
      }
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={clsx(styles.icon, `pyreneIcon-${icon}`)} />}
      <span className={styles.label}>{label}</span>
    </button>
    {loading && ((type === 'primary' || type === 'danger' || type === 'success')
      ? <span className={styles.loader}><Loader size="small" styling="light" /></span>
      : <span className={styles.loader}><Loader size="small" styling="dark" /></span>)}
  </div>
);

Button.displayName = 'Button';

export default Button;
