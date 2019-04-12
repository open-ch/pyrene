import React from 'react';
import Placeholder from '../../examples/Placeholder';

const examples = {
  props: {
    displayPopover: true,
    renderPopoverContent: () => <Placeholder width={400} />, // eslint-disable-line react/display-name
    children: <Placeholder width={200} />,
  },
};

export default examples;
