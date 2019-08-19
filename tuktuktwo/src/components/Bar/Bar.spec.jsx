import React from 'react';

import Bar from './Bar';
import RelativeBar from './RelativeBar';


const props = {
  barWeight: 10,
  color: 'blue',
  maxValue: 100,
  value: 53,
};

const propsRelative = {
  ...props,
  colorScheme: ['blue', 'red'],
};

describe('<Bar />', () => {
  it('renders without crashing', () => {
    shallow(<Bar {...props} />);
  });

  it('renders its content', () => {
    const rendered = mount(<Bar {...props} />);
    const bar = rendered.find('rect').at(0);
    expect(bar.prop('className')).toBe('vx-bar');
    // height for horizontal bar should be equal to barWeight
    expect(bar.prop('height')).toBe(10);
    expect(bar.prop('fill')).toBe('blue');
  });

  it('renders RelativeBar without crashing', () => {
    shallow(<RelativeBar {...propsRelative} />);
  });

  it('renders RelativeBar content', () => {
    const rendered = mount(<RelativeBar {...propsRelative} />);
    const bar = rendered.find('rect').at(0);
    expect(bar.prop('className')).toBe('vx-bar');
    // height for horizontal bar should be equal to barWeight
    expect(bar.prop('height')).toBe(10);
    expect(bar.prop('fill')).toBe('blue');

    const barRelative = rendered.find('rect').at(1);
    expect(barRelative.prop('className')).toBe('vx-bar');
    // height for horizontal bar should be equal to barWeight
    expect(barRelative.prop('height')).toBe(10);
    expect(barRelative.prop('fill')).toBe('red');
  });
});
