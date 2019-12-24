import React from 'react';
import BarStack from './BarStack';
import chartConstants from '../../common/chartConstants';
import { scaleLabels, scaleValueInBounds } from '../../common/ScaleUtils';

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
  scaleLabel: scaleLabels(chartConstants.marginBottom, parentSize.height, data.map((d) => d.label)),
  scaleValue: scaleValueInBounds(parentSize, maxCumulatedValue, 'vertical'),
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
      expect(bar.prop('height')).toBeCloseTo((data[index % 2].values[Math.floor(index / colors.length)] / maxCumulatedValue) * (props.height - chartConstants.marginBottom - chartConstants.marginMaxValueToBorder));
      expect(bar.prop('width')).toBe(barWeight);
      expect(bar.prop('fill')).toBe(colors[Math.floor(index / colors.length)]);
    });
  });

  it('renders its content horizontally', () => {
    const rendered = mount(svgWrapper(<BarStack
      {...props}
      direction="horizontal"
      scaleLabel={scaleLabels(chartConstants.marginLeftNumerical, parentSize.width, data.map((d) => d.label))}
      scaleValue={scaleValueInBounds(parentSize, maxCumulatedValue, 'horizontal')}
      left={chartConstants.marginLeftCategorical}
    />));
    const bars = rendered.find('.vx-bar');
    bars.forEach((bar, index) => {
      expect(bar.prop('height')).toBe(barWeight);
      expect(bar.prop('width')).toBeCloseTo((data[index % 2].values[Math.floor(index / colors.length)] / maxCumulatedValue) * (parentSize.width - chartConstants.marginLeftCategorical - chartConstants.marginMaxValueToBorder));
      expect(bar.prop('fill')).toBe(colors[Math.floor(index / colors.length)]);
    });
  });

});
