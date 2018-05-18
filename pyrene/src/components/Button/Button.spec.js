import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Button from './Button.jsx';

describe('<Button />', () => {

  it('renders without crashing', () => {
    const rendered = shallow(<Button />);
  });

  it('is clickable', () => {
    const onClick = sinon.spy();
    const rendered = shallow(<Button onClick={onClick} />);
    rendered.find('button').simulate('click');

    expect(onClick).to.have.property('callCount', 1);
    expect(onClick).to.have.been.calledOnce;
  });

  it('is not clickable if disabled', () => {
    const onClick = sinon.spy();
    const rendered = mount(<Button onClick={onClick} disabled={true} />);
    rendered.find('button').click();

    expect(onClick).to.have.not.been.called;
  });

  it('renders the label', () => {
    const rendered = shallow(<Button label="My Label" />);
    expect(rendered.contains('My Label')).to.equal(true);
  });
});
