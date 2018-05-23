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

  it('changes state on click', () => {
    const onChange = sinon.spy();
    const rendered = shallow(<Checkbox {...props} onChange={onChange} />);

    rendered.find('input[type="checkbox"]').simulate('change');
    expect(onChange).to.have.been.calledOnce;
    expect(rendered.state().checked).to.equal(true);

    rendered.find('input[type="checkbox"]').simulate('change');
    expect(onChange).to.have.been.calledTwice;
    expect(rendered.state().checked).to.equal(false);
  });

  it('does not change state if disabled', () => {
    const onChange = sinon.spy();
    const rendered = shallow(<Checkbox {...props} onChange={onChange} disabled={true} />);
    rendered.find('input[type="checkbox"]').simulate('change');

    expect(rendered.state().checked).to.equal(false);
  });
});