import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import styles from './spacer.css';

export interface SpacerProps {
  /**
  * Size/height of the spacer.
  */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge'
}

/**
 * Spacers separate content.
 */
const Spacer: FunctionComponent<SpacerProps> = ({ size = 'small' }: SpacerProps) => (
  <div className={clsx(styles[`spacer-${size}`], styles.spacer)} />
);

Spacer.displayName = 'Spacer';

// defaultProps for compatibilty with kitchensink for pyrene documentation
Spacer.defaultProps = {
  size: 'small',
};

export default Spacer;
