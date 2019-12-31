import React from 'react';
import SparkLine from './SparkLine';
import { scaleLinear, scaleTime } from '../../common/ScaleUtils';

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
  scaleLabel: scaleTime(0, maxTime, 0, parentSize.width, 'horizontal'),
  scaleValue: scaleLinear(0, maxValue, 0, parentSize.height, 'vertical'),
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
