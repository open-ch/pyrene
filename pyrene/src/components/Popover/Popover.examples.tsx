/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import Placeholder from '../../examples/Placeholder';
import { Example } from '../../examples/Example';
import { PopoverProps } from './Popover';

const examples: Example<PopoverProps> = {
  props: {
    displayPopover: true,
    renderPopoverContent: () => <Placeholder width={400} />,
    children: <Placeholder width={200} />,
  },
  category: 'Layout',
};

export default examples;
