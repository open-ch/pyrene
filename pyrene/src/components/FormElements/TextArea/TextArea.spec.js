import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import TextArea from './TextArea';


describe('<TextArea />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<TextArea />);
  });

  it('is calling onChange when changed', () => {
    const onChange = sinon.spy();
    const rendered = mount(<TextArea onChange={onChange} />);
    rendered.find('textarea').simulate('change');

    expect(onChange).to.have.been.calledOnce;
  });

});