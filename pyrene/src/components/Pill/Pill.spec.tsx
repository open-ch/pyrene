import React from 'react';
import { shallow } from 'enzyme';

import Pill from './Pill';

const props = {
  value: 188,
  type: 'info' as const,
};

describe('<Pill />', () => {
  it('renders without crashing', () => {
    shallow(<Pill {...props} />);
  });

  it('does not render the icon', () => {
    const icon = 'data';
    const rendered = shallow(<Pill {...props} />);
    expect(rendered.find(`.pyreneIcon-${icon}`)).toHaveLength(0);
  });

  it('renders the icon', () => {
    const icon = 'data';
    const rendered = shallow(<Pill {...props} icon={icon} />);
    expect(rendered.find(`.pyreneIcon-${icon}`)).toHaveLength(1);
  });

  it('rendered value does not exceed maximum value', () => {
    const rendered = shallow(<Pill {...props} />);
    expect(rendered.contains('99+')).toBe(true);
    expect(rendered.contains(props.value)).toBe(false);
  });

  it('rendered value is props.value when not exceeding maximum value', () => {
    const maxValue = 200;
    const rendered = shallow(<Pill {...props} maxValue={maxValue} />);
    expect(rendered.contains(`${maxValue}+`)).toBe(false);
    expect(rendered.contains(props.value)).toBe(true);
  });
});
