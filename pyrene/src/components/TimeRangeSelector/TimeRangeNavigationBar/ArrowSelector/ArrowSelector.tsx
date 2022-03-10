/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import TRSStepper from './TRSStepper/TRSStepper';
import styles from './ArrowSelector.module.css';

export interface ArrowSelectorProps {
  backInactive: boolean;
  disabled?: boolean;
  forwardInactive: boolean;
  innerWidth: number;
  label: string;
  onNavigateBack: () => void;
  onNavigateForward: () => void;
}

const ArrowSelector: FunctionComponent<ArrowSelectorProps> = ({
  disabled = false,
  backInactive,
  forwardInactive,
  innerWidth,
  label,
  onNavigateBack,
  onNavigateForward,
}) => (
  <div className={styles.arrowSelector}>
    <TRSStepper
      direction="left"
      disabled={disabled}
      inactive={backInactive}
      onClick={(disabled || backInactive) ? () => {} : onNavigateBack}
    />
    <div className={styles.contentOuter}>
      <div className={styles.contentInner} style={{ width: innerWidth }}>
        <div className={clsx(styles.value, { [styles.disabled]: disabled })}>
          {label}
        </div>
      </div>
    </div>
    <TRSStepper
      direction="right"
      disabled={disabled}
      inactive={forwardInactive}
      onClick={(disabled || forwardInactive) ? () => {} : onNavigateForward}
    />
  </div>
);

export default ArrowSelector;
