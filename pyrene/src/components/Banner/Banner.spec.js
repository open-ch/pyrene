import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Banner from './Banner.jsx';

const props = {
  label: 'TestMessage',
  type: 'info',
};

describe('<Banner />', () => {

  it('renders without crashing', () => {
    const rendered = shallow(<Banner {...props} />);
  });

  it('is clearable except if it is of type error', () => {
    const onClick = sinon.spy();
    const rendered = shallow(<Banner {...props} onClear={onClick} />);
    rendered.find('.clearIcon').simulate('click');

    expect(onClick).to.have.been.calledOnce;
  });

  it('has a clearIcon', () => {
    let rendered = shallow(<Banner {...props} type={'info'} />);
    expect(rendered.find('.clearIcon')).to.have.length(1);

    rendered = shallow(<Banner {...props} type={'success'}  />);
    expect(rendered.find('.clearIcon')).to.have.length(1);

    rendered = shallow(<Banner {...props} type={'warning'} />);
    expect(rendered.find('.clearIcon')).to.have.length(1);
  });

  it('has no clearIcon when the type is error or loading', () => {
    let rendered = shallow(<Banner {...props} type={'error'} />);
    expect(rendered.find('.clearIcon')).to.have.length(0);

    rendered = shallow(<Banner {...props} type={'loading'} />);
    expect(rendered.find('.clearIcon')).to.have.length(0);
  });

  it('renders the icon', () => {
    const rendered = shallow(<Banner {...props} />);
    expect(rendered.find('.bannerIcon')).to.have.length(1);
  });

  it('renders the message', () => {
    const rendered = shallow(<Banner {...props} />);
    expect(rendered.contains('TestMessage')).to.equal(true);
  });

});
