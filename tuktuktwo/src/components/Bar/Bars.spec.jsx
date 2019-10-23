import React from 'react';
import Bars from './Bars';
import AxisUtils from '../Axis/AxisUtils';
import chartConstants from '../../common/chartConstants';

const parentSize = { width: 500, height: 404 };
const values = [12, 37];
const maxValue = 100;
const barWeight = 5;

const props = {
  barWeight: barWeight,
  color: 'blue',
  maxValue: maxValue,
  values: values,
  width: parentSize.width,
};

const svgWrapper = bars => (
  <svg width={parentSize.width} height={parentSize.height}>
    {bars}
  </svg>
);

describe('<Bars />', () => {
  it('renders without crashing', () => {
    shallow(svgWrapper(<Bars {...props} />));
  });

  it('renders its content vertically', () => {
    const rendered = mount(svgWrapper(<Bars {...props} direction="vertical" />));
    const bars = rendered.find('.vx-bar');
    bars.forEach((bar, index) => {
      expect(bar.prop('height')).toBeCloseTo((values[index] / maxValue) * (chartConstants.height - 16));
      expect(bar.prop('width')).toBe(barWeight);
      expect(bar.prop('fill')).toBe('blue');
    });
  });

  it('renders its content horizontally', () => {
    const rendered = mount(svgWrapper(<Bars {...props} direction="horizontal" />));
    const bars = rendered.find('.vx-bar');
    bars.forEach((bar, index) => {
      expect(bar.prop('height')).toBe(barWeight);
      expect(bar.prop('width')).toBeCloseTo((values[index] / maxValue) * (parentSize.width - AxisUtils.axisLeftCategorical - 16));
      expect(bar.prop('fill')).toBe('blue');
    });
  });

});
