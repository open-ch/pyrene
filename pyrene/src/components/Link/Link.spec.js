import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Link from './Link';

const props = {
  path: 'somePath',
  label: 'someLabel'
};

describe('<Link />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<Link {...props} />);
  });

  it('renders label', () => {
    const rendered = shallow(<Link {...props} />);
    expect(rendered.contains(props.label)).to.equal(true);
  });

  it('has path corresponding to prop', () => {
    const onClick = sinon.spy();
    const rendered = shallow(<Link {...props} />);

    expect(rendered.find('a').props()).to.have.property('href', props.path);
  });
});