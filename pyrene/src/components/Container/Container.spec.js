import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Container from './Container';
import Button from '../Button/Button';

const props = {
  renderCallback: () => (<div>ContentDiv</div>),
  title: 'Show More',
};



describe('<Container />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<Container {...props} />);
  });

  it('renders the content', () => {
    const rendered = shallow(<Container {...props} />);

    expect(rendered.contains('Show More')).to.equal(true);
    expect(rendered.contains('ContentDiv')).to.equal(true);
  });

  it('renders the admin button and triggers the action onclick', () => {
    const adminAction = {
      icon: 'info',
      label: 'admin',
      action: sinon.spy(),
    };

    const rendered = mount(<Container {...props} adminAction={adminAction} />);
    rendered.find('button').simulate('click');

    expect(adminAction.action).to.have.been.calledOnce;
  });
});
