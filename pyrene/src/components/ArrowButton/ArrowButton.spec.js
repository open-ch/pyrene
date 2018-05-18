import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import ArrowButton from './ArrowButton';

const props = {
  direction: 'up'
};

describe('<ArrowButton />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<ArrowButton {...props} />);
  });

  it('is clickable', () => {
    const onClick = sinon.spy();
    const rendered = shallow(<ArrowButton {...props} onClick={onClick} />);
    rendered.find('button').simulate('click');

    expect(onClick).to.have.property('callCount', 1);
  });

  it('is not clickable if disabled', () => {
    const onClick = sinon.spy();
    const rendered = mount(<ArrowButton {...props} onClick={onClick} disabled={true} />);
    rendered.find('button').simulate('click');

    expect(onClick).to.have.property('callCount', 0);
  });
});
