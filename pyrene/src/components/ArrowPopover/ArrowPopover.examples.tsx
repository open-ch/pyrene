import React from 'react';
import { Example } from '../../examples/Example';
import { ArrowPopoverProps } from './ArrowPopover';
import Placeholder from '../../examples/Placeholder';
import Button from '../Button/Button';

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
      popoverContent:
  <div style={{
    width: 250, backgroundColor: '#9BB7D4', border: '1px solid #efefef', padding: '2em 1em 2em 1em', color: 'white',
  }}
  >
    This is a child component
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ marginRight: '16px', display: 'inline-block' }}>
        <Button onClick={() => null} label="Cancel" type="secondary" />
      </div>
      <Button onClick={() => null} label="Test" type="primary" />
    </div>
  </div>,
      children: <Placeholder width={400} />,
    },
  },
];

ArrowPopover.category = 'Layout';

export default ArrowPopover;
