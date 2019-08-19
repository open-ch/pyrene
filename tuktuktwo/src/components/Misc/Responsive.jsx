import React from 'react';
import { ParentSize } from '@vx/responsive';

/**
 * Responsive is used to wrap around other components to make them responsive.
 */
const Responsive = props => (<ParentSize {...props} debounceTime={10} />);

Responsive.displayName = 'Responsive';

export default Responsive;
