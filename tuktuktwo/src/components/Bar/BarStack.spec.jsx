import React from 'react';
import { scaleBand, scaleLinear } from '@vx/scale';
import BarStack from './BarStack';
import chartConstants from '../../common/chartConstants';

const parentSize = { width: 500, height: 404 };
const data = [{
  label: 2012,
  values: [12, 37],
}, {
  label: 2013,
  values: [5, 41],
}];
const maxCumulatedValue = 49;
const barWeight = 5;
const colors = ['blue', 'red'];

const props = {
  barWeight: barWeight,
  colors: colors,
  height: parentSize.height,
  maxCumulatedValue: maxCumulatedValue,
  data: data,
  width: parentSize.width,
  keys: ['A', 'B'],
  scaleLabel: scaleBand({
    range: [0, parentSize.width - chartConstants.marginLeftNumerical],
    domain: data.map((d) => d.label),
  }),
  scaleValue: scaleLinear({
    range: [parentSize.height - chartConstants.marginBottom, 0],
    domain: [0, maxCumulatedValue],
  }),
  direction: 'vertical',
  left: chartConstants.marginLeftNumerical,
};

const svgWrapper = (barStack) => (
  <svg width={parentSize.width} height={parentSize.height}>
    {barStack}
  </svg>
);

describe('<Bars />', () => {
  it('renders without crashing', () => {
    shallow(svgWrapper(<BarStack {...props} />));
  });

  it('renders its content vertically', () => {
    const rendered = mount(svgWrapper(<BarStack {...props} />));
    const bars = rendered.find('.vx-bar');
    bars.forEach((bar, index) => {
      expect(bar.prop('height')).toBeCloseTo((data[index % 2].values[Math.floor(index / colors.length)] / maxCumulatedValue) * (props.height - chartConstants.marginBottom));
      expect(bar.prop('width')).toBe(barWeight);
      expect(bar.prop('fill')).toBe(colors[Math.floor(index / colors.length)]);
    });
  });

  it('renders its content horizontally', () => {
    const rendered = mount(svgWrapper(<BarStack
      {...props}
      direction="horizontal"
      scaleLabel={scaleBand({
        range: [0, parentSize.height - chartConstants.marginBottom],
        domain: data.map((d) => d.label),
      })}
      scaleValue={scaleLinear({
        range: [chartConstants.marginLeftCategorical, parentSize.width],
        domain: [0, maxCumulatedValue],
      })}
      left={chartConstants.marginLeftCategorical}
    />));
    const bars = rendered.find('.vx-bar');
    bars.forEach((bar, index) => {
      expect(bar.prop('height')).toBe(barWeight);
      expect(bar.prop('width')).toBeCloseTo((data[index % 2].values[Math.floor(index / colors.length)] / maxCumulatedValue) * (parentSize.width - chartConstants.marginLeftCategorical));
      expect(bar.prop('fill')).toBe(colors[Math.floor(index / colors.length)]);
    });
  });

});
