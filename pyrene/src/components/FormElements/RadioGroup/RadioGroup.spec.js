import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import RadioGroup from './RadioGroup';

const props = {
  radioLabels: ['one', 'two'],
};

describe('<RadioGroup />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<RadioGroup {...props} />);
  });

  it('calls onchange on click', () => {
    const onChange = sinon.spy();
    const rendered = shallow(<RadioGroup {...props} onChange={onChange} />);

    rendered.find('input[type="radio"]').first().simulate('change');
    expect(onChange).to.have.been.calledOnce;

    rendered.find('input[type="radio"]').last().simulate('change');
    expect(onChange).to.have.been.calledTwice;
  });

});