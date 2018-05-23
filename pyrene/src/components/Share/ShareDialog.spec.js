import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import ShareDialog from './ShareDialog';

const props = {
  link: 'someLink',
};

describe('<ShareDialog />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<ShareDialog {...props} />);
  });

  it('renders dialog on click', () => {
    const onClick = sinon.spy();
    const rendered = mount(<ShareDialog {...props} onClick={onClick} />);
    rendered.find('button').simulate('click');

    expect(rendered.find('.shareDialog')).to.have.length(1);
  });

  it('is not clickable if disabled', () => {
    const onClick = sinon.spy();
    const rendered = mount(<ShareDialog {...props} onClick={onClick} disabled={true} />);
    rendered.find('button').simulate('click');

    expect(onClick).to.have.not.been.called;
  });

  it('renders elements of dialog and their content', () => {
    const onClick = sinon.spy();
    const rendered = mount(<ShareDialog {...props} onClick={onClick} />);
    rendered.find('button').simulate('click');

    expect(rendered.find('.title')).to.have.length(1);

    expect(rendered.find('input')).to.have.length(1);
    expect(rendered.find('input').props()).to.have.property('value', props.link);

    expect(rendered.find('button')).to.have.length(3);
    rendered.find('button').last().simulate('click');

    expect(rendered.find('.shareDialog')).to.have.length(0);
  });

});
