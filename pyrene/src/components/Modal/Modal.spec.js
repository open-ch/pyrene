import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Modal from './Modal';

const props = {
  titleLabel: 'titleLabel',
  size: 'large',
  content: <div>Content</div>,
};

describe('<Modal />', () => {
  it('renders without crashing', () => {
    let rendered = shallow(<Modal {...props} size={'small'}/>);
    rendered = shallow(<Modal {...props} size={'large'} />);
    rendered = shallow(<Modal {...props} size={'xlarge'} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<Modal {...props} />);

    expect(rendered.find('.titleBar')).to.have.length(1);
    expect(rendered.contains(props.titleLabel)).to.equal(true);

    expect(rendered.find('.contentContainer')).to.have.length(1);
    expect(rendered.contains(props.content)).to.equal(true);

    expect(rendered.find('ButtonBar')).to.have.length(1);
  });
});