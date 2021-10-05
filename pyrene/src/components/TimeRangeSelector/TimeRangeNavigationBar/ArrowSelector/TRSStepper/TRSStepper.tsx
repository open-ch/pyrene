/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import styles from './trsStepper.css';

export interface TRSStepperProps {
  /**
   * Sets the direction of the arrow.
   */
  direction?: 'right' | 'left',
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean,
  /**
   * The component is inactive due to constraints.
   */
  inactive?: boolean,
  /**
   * Javascript event handler.
   */
  onClick: () => void,
}

/**
 * Custom steppers for the TRS used for previous/next navigation.
 */
const TRSStepper: FunctionComponent<TRSStepperProps> = ({
  direction = 'left',
  disabled = false,
  inactive = false,
  onClick,
}) => {
  const capitalisedDirection = direction.charAt(0).toUpperCase() + direction.slice(1);
  return (
    <button
      type="button"
      className={clsx('unSelectable',
        styles.stepper,
        { [styles.disabled]: disabled },
        { [styles.right]: direction === 'right' },
        { [styles.left]: direction === 'left' })}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={clsx(`pyreneIcon-chevron${capitalisedDirection}`,
        styles.stepperIcon,
        { [styles.disabledIcon]: inactive })}
      />
    </button>
  );
};

export default TRSStepper;
