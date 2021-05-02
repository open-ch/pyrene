import React, { FunctionComponent } from 'react';
import clsx from 'clsx';

import './stepper.css';

/**
 * Steppers are used for previous/next navigation.
 *
 * Steppers are often used in the detail view of a data table entry (modal view) to navigate through the table entries without leaving the modal view.
 */

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
      className="unSelectable"
      styleName={
        clsx('stepper',
          { disabled },
          { [`type-${type}`]: true })
      }
      onClick={onClick}
      disabled={disabled}
    >
      <span className={iconName} styleName="icon" />
    </button>
  );
};

Stepper.displayName = 'Stepper';

Stepper.defaultProps = {
  direction: 'right',
  type: 'bordered',
  disabled: false,
  onClick: () => null,
};

export default Stepper;
