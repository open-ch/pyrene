import React from 'react';

import DropdownButton from './DropdownButton';

const props = {
  label: 'tbd',
  actions: [{ label: 'sub', onClick: jest.fn() }],
};

describe('<DropdownButton />', () => {
  it('renders without crashing', () => {
    mount(<DropdownButton {...props} />);
  });

  it('renders dropdown on click', () => {
    const rendered = mount(<DropdownButton {...props} />);
    rendered.find('button').simulate('click');
  });

});
