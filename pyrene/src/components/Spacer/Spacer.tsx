import React, { FunctionComponent } from 'react';
import clsx from 'clsx';

import './spacer.css';

/**
* Spacers separate content.
*/

export interface SpacerProps {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge'
}

const Spacer: FunctionComponent<SpacerProps> = ({ size = 'small' }) => (
  <div styleName={clsx(`spacer-${size}`, 'spacer')} />
);

Spacer.displayName = 'Spacer';

export default Spacer;
