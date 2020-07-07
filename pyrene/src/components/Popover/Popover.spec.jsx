import React from 'react';
import { shallow } from 'enzyme';

import Popover from './Popover';

const props = {
  children: <div>Children</div>,
  renderPopoverContent: () => <div>Content</div>, // eslint-disable-line react/display-name
  displayPopover: true,
};

describe('<Popover />', () => {
  it('renders without crashing', () => {
    shallow(<Popover {...props} />);
  });
});
