import React from 'react';
import { scaleLinear } from '@vx/scale';
import Bar from './Bar';
import RelativeBar from './RelativeBar';

const parentSize = { width: 50, height: 40 };
const maxValue = 100;

const props = {
  barWeight: 10,
  color: 'blue',
  maxValue: maxValue,
  value: 53,
  size: parentSize.width,
  scale: scaleLinear({
    range: [parentSize.height, 0],
    domain: [0, maxValue],
  }),
};

const propsRelative = {
  ...props,
  colors: ['blue', 'red'],
};

const svgWrapper = (bar) => (
  <svg width={parentSize.width} height={parentSize.height}>
    {bar}
  </svg>
);

describe('<Bar />', () => {
  it('renders without crashing', () => {
    shallow(svgWrapper(<Bar {...props} />));
  });

  it('renders its content', () => {
    const rendered = mount(svgWrapper(<Bar {...props} />));
    const bar = rendered.find('rect').at(0);
    expect(bar.prop('className')).toBe('vx-bar');
    // width for vertical bar should be equal to barWeight
    expect(bar.prop('width')).toBe(10);
    expect(bar.prop('fill')).toBe('blue');
  });

  it('renders RelativeBar without crashing', () => {
    shallow(svgWrapper(<RelativeBar {...propsRelative} />));
  });

  it('renders RelativeBar content', () => {
    const rendered = mount(svgWrapper(<RelativeBar {...propsRelative} />));
    const bar = rendered.find('rect').at(0);
    expect(bar.prop('className')).toBe('vx-bar');
    // width for vertical bar should be equal to barWeight
    expect(bar.prop('width')).toBe(10);
    expect(bar.prop('fill')).toBe('blue');

    const barRelative = rendered.find('rect').at(1);
    expect(barRelative.prop('className')).toBe('vx-bar');
    // width for vertical bar should be equal to barWeight
    expect(barRelative.prop('width')).toBe(10);
    expect(barRelative.prop('fill')).toBe('red');
  });
});
