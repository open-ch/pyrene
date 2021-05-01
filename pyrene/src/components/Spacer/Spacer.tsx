import React, { FunctionComponent } from 'react';
import clsx from 'clsx';

import './spacer.css';

/**
* Spacers separate content.
*/

export interface SpacerProps {
  /**
  * Size/height of the spacer.
  */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge'
}

const Spacer: FunctionComponent<SpacerProps> = ({ size = 'small' }: SpacerProps) => (
  <div styleName={clsx(`spacer-${size}`, 'spacer')} />
);

Spacer.displayName = 'Spacer';

// defaultProps for compatibilty with kitchensink for pyrene documentation
Spacer.defaultProps = {
  size: 'small',
};

export default Spacer;
