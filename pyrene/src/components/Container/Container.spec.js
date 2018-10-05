import React from 'react';

import Container from './Container';

const props = {
  renderCallback: () => (<div>ContentDiv</div>),
  title: 'Show More',
};

describe('<Container />', () => {
  it('renders without crashing', () => {
    shallow(<Container {...props} />);
  });

  it('renders the content', () => {
    const rendered = shallow(<Container {...props} />);

    expect(rendered.contains('Show More')).toBe(true);
    expect(rendered.contains('ContentDiv')).toBe(true);
  });

  it('renders the admin button and triggers the action onclick', () => {
    const adminAction = {
      icon: 'info',
      label: 'admin',
      action: jest.fn(),
    };

    const rendered = mount(<Container {...props} adminAction={adminAction} />);
    rendered.find('button').simulate('click');

    expect(adminAction.action).toHaveBeenCalledTimes(1);
  });
});
