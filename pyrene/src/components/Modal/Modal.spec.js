import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Modal from './Modal';

const props = {
  title: 'titleLabel',
  size: 'large',
  renderCallback: () => <div>Content</div>,
};

describe('<Modal />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<Modal {...props} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<Modal {...props} />);

    expect(rendered.find('.titleBar')).to.have.length(1);
    expect(rendered.contains(props.title)).to.equal(true);

    expect(rendered.find('.contentContainer')).to.have.length(1);
    expect(rendered.contains(props.renderCallback())).to.equal(true);

    expect(rendered.find('ButtonBar')).to.have.length(1);
  });
});