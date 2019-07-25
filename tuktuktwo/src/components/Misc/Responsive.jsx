import React from 'react';
import { ParentSize } from '@vx/responsive';

const Responsive = props => (<ParentSize {...props} debounceTime={10} />);

Responsive.displayName = 'Responsive';

export default Responsive;
