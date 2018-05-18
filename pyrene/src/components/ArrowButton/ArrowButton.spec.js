import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ArrowButton from './ArrowButton';


describe('<ArrowButton />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<ArrowButton direction={'up'} />);
  });

  it('is clickable', () => {
    const onClick = sinon.spy();
    const rendered = shallow(<ArrowButton onClick={onClick} direction={'up'} />);
    rendered.find('button').simulate('click');

    expect(onClick).to.have.property('callCount', 1);
    expect(onClick).to.have.been.calledOnce;
  });

  /** Error: Enzyme::Selector does not support pseudo-element or pseudo-class selectors.
  it('renders the icon', () => {
    const rendered = shallow(<Button icon="share" />);
    expect(rendered.find(':before').exists()).to.equal(true);
  });
  */
});
