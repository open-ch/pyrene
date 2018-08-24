import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Popover from './Popover';

const props = {
  children: <div>Children</div>,
  renderPopoverContent: () => <div>Content</div>,
};

describe('<Popover />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<Popover {...props} />);
  });
});