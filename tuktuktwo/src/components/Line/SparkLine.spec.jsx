import React from 'react';
import { scaleLinear, scaleTime } from '@vx/scale';
import SparkLine from './SparkLine';

const parentSize = { width: 50, height: 40 };
const data = [
  [1, 10],
  [2, 20],
  [3, 15],
];
const maxValue = 20;
const maxTime = 3;

const props = {
  colors: ['red', 'blue'],
  data: data,
  strokeWidth: 4,
  scaleLabel: scaleTime({
    range: [0, parentSize.width],
    domain: [0, maxTime],
  }),
  scaleValue: scaleLinear({
    range: [parentSize.height, 0],
    domain: [0, maxValue],
  }),
};

const svgWrapper = (sparkLine) => (
  <svg width={parentSize.width} height={parentSize.height}>
    {sparkLine}
  </svg>
);

describe('<SparkLine />', () => {
  it('renders without crashing', () => {
    shallow(<SparkLine {...props} />);
  });

  it('renders its content', () => {
    const rendered = mount(svgWrapper(<SparkLine {...props} />));
    // Line
    expect(rendered.find('.vx-linepath')).toHaveLength(1);
    expect(rendered.find('.vx-linepath').at(0).props().stroke).toBe('red');
    expect(rendered.find('.vx-linepath').at(0).props().strokeWidth).toBe(4);

    // Area
    expect(rendered.find('.vx-area-closed')).toHaveLength(1);
    expect(rendered.find('.vx-area-closed').at(0).props().fill).toBe('blue');
  });

});
