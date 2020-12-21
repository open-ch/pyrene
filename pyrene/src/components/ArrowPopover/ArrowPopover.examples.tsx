import React from 'react';
import { Example } from '../../examples/Example';
import { ArrowPopoverProps } from './ArrowPopover';
import Placeholder from '../../examples/Placeholder';

const ArrowPopover: Example<ArrowPopoverProps> = {};

ArrowPopover.props = {
  align: 'center',
  closePopover: () => null,
  distanceToTarget: 12,
  preferredPosition: ['top', 'left'],
  displayPopover: false,
  popoverContent: <Placeholder width={400} />,
  children: <Placeholder width={200} />,
};

ArrowPopover.examples = [
  {
    props: {
      align: 'center',
      closePopover: () => null,
      distanceToTarget: 12,
      preferredPosition: ['top', 'left'],
      displayPopover: false,
      popoverContent: <Placeholder width={400} />,
      children: <Placeholder width={200} />,
    },
  },
  {
    props: {
      align: 'center',
      closePopover: () => null,
      distanceToTarget: 12,
      preferredPosition: ['bottom', 'right'],
      displayPopover: false,
      popoverContent: <Placeholder width={400} />,
      children: <Placeholder width={400} />,
    },
  },
];

ArrowPopover.category = 'Layout';

export default ArrowPopover;
