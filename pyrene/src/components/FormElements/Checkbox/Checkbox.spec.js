import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Checkbox from './Checkbox';

const props = {
  label: 'checkboxLabel',
};

describe('<Checkbox />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<Checkbox {...props} />);
  });

  it('calls onchange on click', () => {
    const onChange = sinon.spy();
    const rendered = shallow(<Checkbox {...props} onChange={onChange} />);

    rendered.find('input[type="checkbox"]').simulate('change');
    expect(onChange).to.have.been.calledOnce;

    rendered.find('input[type="checkbox"]').simulate('change');
    expect(onChange).to.have.been.calledTwice;
  });

  it('does not call onclick when disabled', () => {
    const onChange = sinon.spy();
    const rendered = shallow(<Checkbox {...props} onChange={onChange} disabled={true} />);
    rendered.find('input[type="checkbox"]').simulate('change');

    expect(onChange).to.not.have.been.called;
  });
});