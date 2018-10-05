import React from 'react';

import Popover from './Popover';

const props = {
  children: <div>Children</div>,
  renderPopoverContent: () => <div>Content</div>,
};

describe('<Popover />', () => {
  it('renders without crashing', () => {
    shallow(<Popover {...props} />);
  });
});