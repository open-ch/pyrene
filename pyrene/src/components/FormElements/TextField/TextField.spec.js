import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import TextField from './TextField';
import TextArea from '../TextArea/TextArea';



describe('<TextField />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<TextField />);
  });


  it('is calling onChange when changed', () => {
    const onChange = sinon.spy();
    const rendered = mount(<TextField onChange={onChange} />);
    rendered.find('input[type="text"]').simulate('change');

    expect(onChange).to.have.been.calledOnce;
  });

});