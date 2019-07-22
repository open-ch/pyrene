import React from 'react';
import { ParentSize } from '@vx/responsive';

const Responsive = (props) => {
  const newProps = Object.assign({}, props);
  newProps.debounceTime = 10;
  return <ParentSize {...newProps} />;
};

Responsive.displayName = 'Responsive';

export default Responsive;
