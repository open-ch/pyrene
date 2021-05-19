import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import styles from './stepper.css';

export interface StepperProps {
  /**
   * Sets the direction of the arrow.
  */
  direction?: 'up' | 'down' | 'right' | 'left',
  /**
  * Disables any interaction with the component.
  */
  disabled?: boolean,
  /**
  * Javascript event handler.
  */
  onClick?: () => void,
  /**
  * Sets the overall style.
  */
  type?: 'bordered' | 'minimal',
}

/**
 * Steppers are used for previous/next navigation.
 *
 * Steppers are often used in the detail view of a data table entry (modal view) to navigate through the table entries without leaving the modal view.
 */
const Stepper: FunctionComponent<StepperProps> = ({
  direction = 'right',
  disabled = false,
  onClick = () => null,
  type = 'bordered',
}: StepperProps) => {
  const capitalisedDirection = direction.charAt(0).toUpperCase() + direction.slice(1);
  const iconName = `pyreneIcon-chevron${capitalisedDirection}`;
  return (
    <button
      type="button"
      className={
        clsx('unSelectable',
          styles.stepper,
          { disabled },
          styles[`type-${type}`])
      }
      onClick={onClick}
      disabled={disabled}
    >
      <span className={clsx(iconName, styles.icon)} />
    </button>
  );
};

Stepper.displayName = 'Stepper';

/**
 * defaultProps for compatibilty with kitchensink for pyrene documentation
 */
Stepper.defaultProps = {
  direction: 'right',
  type: 'bordered',
  disabled: false,
  onClick: () => null,
};

export default Stepper;
