import React from 'react';
import { mount } from 'enzyme';

import Accordion from './Accordion';
import Section from './Section';
import Icon from '../Icon/Icon';

const props = {
  sections: [{
    renderContent: () => 'content',
    title: 'title',
  }, {
    iconProps: {
      name: 'flag',
      color: 'red500',
    },
    renderContent: () => 'bar',
    title: 'foo',
  }, {
    iconProps: {
      name: 'check',
    },
    renderContent: () => <div className="test-class" />, // eslint-disable-line react/display-name
    title: () => <div className="custom-title">custom title</div>, // eslint-disable-line react/display-name
  }],
};

describe('<Accordion />', () => {
  it('renders without crashing', () => {
    const rendered = mount(<Accordion {...props} />);
    expect(rendered.find(Accordion)).toHaveLength(1);
    expect(rendered.find(Section)).toHaveLength(3);
  });

  it('renders the titles', () => {
    const rendered = mount(<Accordion {...props} />);
    expect(rendered.find({ title: 'title' })).toHaveLength(1);
    expect(rendered.find('.custom-title')).toHaveLength(1);
  });

  it('renders the icons', () => {
    const rendered = mount(<Accordion {...props} />);
    expect(rendered.find(Icon).filterWhere((node) => node.props().name === 'flag')).toHaveLength(1);
    expect(rendered.find(Icon).filterWhere((node) => node.props().name === 'check')).toHaveLength(1);
  });

  it('renders all sections initially collapsed', () => {
    const rendered = mount(<Accordion {...props} />);
    expect(rendered.find('.section.collapsed')).toHaveLength(3);
    expect(rendered.find('.test-class')).toHaveLength(0);
  });

  it('expands a section on click', () => {
    const rendered = mount(<Accordion {...props} />);
    rendered.find('.header').first().simulate('click');
    expect(rendered.find('.section.expanded')).toHaveLength(1);
    expect(rendered.find('.section.collapsed')).toHaveLength(2);
    rendered.find('.header').first().simulate('click');
    expect(rendered.find('.section.collapsed')).toHaveLength(3);
  });

  it('renders the contents', () => {
    const rendered = mount(<Accordion {...props} />);
    rendered.find('.header').forEach((node) => node.simulate('click'));
    expect(rendered.find('.test-class')).toHaveLength(1);
  });
});
