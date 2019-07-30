import React from 'react';

import Pill from './Pill';

const props = {
  icon: 'data',
  maxValue: 99,
  value: 188,
  type: 'info',
};

describe('<Pill />', () => {
  it('renders without crashing', () => {
    shallow(<Pill {...props} />);
  });

  it('renders the icon', () => {
    const rendered = shallow(<Pill {...props} />);
    expect(rendered.find('.pyreneIcon-' + props.icon)).toHaveLength(1);
  });

  it('does not render the icon', () => {
    props.icon = '';
    const rendered = shallow(<Pill {...props} />);
    expect(rendered.find('.pyreneIcon-' + props.icon)).toHaveLength(0);
  });

  it('rendered value does not exceed maximum value', () => {
    const rendered = shallow(<Pill {...props} />);
    expect(rendered.contains(props.maxValue + '+')).toBe(true);
    expect(rendered.contains(props.value)).toBe(false);
  });

  it('rendered value is props.value when not exceeding maximum value', () => {
    props.maxValue = 200;
    const rendered = shallow(<Pill {...props} />);
    expect(rendered.contains(props.maxValue + '+')).toBe(false);
    expect(rendered.contains(props.value)).toBe(true);
  });
});
