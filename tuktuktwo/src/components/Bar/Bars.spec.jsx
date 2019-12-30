import React from 'react';
import Bars from './Bars';
import chartConstants from '../../common/chartConstants';
import { scaleLabels, scaleTime, scaleValueInBounds } from '../../common/ScaleUtils';

const parentSize = { width: 500, height: 404 };
const labels = [1, 2];
const values = [12, 37];
const maxValue = 100;
const barWeight = () => 5;

const labelScaleVertical = scaleLabels(0, parentSize.height - chartConstants.marginBottom, labels);
const labelScaleHorizontal = scaleLabels(0, parentSize.width - chartConstants.marginLeftCategorical, labels);
const valueScaleVertical = scaleValueInBounds(parentSize, maxValue, 'vertical');
const valueScaleHorizontal = scaleValueInBounds(parentSize, maxValue, 'horizontal');

const props = {
  barWeight: barWeight,
  color: 'blue',
  height: parentSize.height,
  values: values,
  width: parentSize.width,
  scaleLabel: labelScaleVertical,
  scaleValue: valueScaleVertical,
  labels: labels,
  direction: 'vertical',
  left: chartConstants.marginLeftNumerical,
  labelOffset: labelScaleVertical.bandwidth() / 2,
};

const from = Math.min(...labels);
const to = Math.max(...labels);
const labelScaleTimeHorizontal = scaleTime(from, to, chartConstants.marginLeftNumerical, parentSize.width, 'horizontal');
const labelsShifted = labels.map((d) => d - 1);

const propsShiftedLabels = {
  barWeight: () => labelScaleTimeHorizontal(from + (labelsShifted[1] - labelsShifted[0])) - chartConstants.marginLeftNumerical,
  color: 'blue',
  height: parentSize.height,
  maxValue: maxValue,
  values: values,
  width: parentSize.width,
  scaleLabel: labelScaleTimeHorizontal,
  scaleValue: valueScaleVertical,
  labels: labelsShifted,
  direction: 'vertical',
  left: chartConstants.marginLeftNumerical,
};

const svgWrapper = (bars) => (
  <svg width={parentSize.width} height={parentSize.height}>
    {bars}
  </svg>
);

describe('<Bars />', () => {
  it('renders without crashing', () => {
    shallow(svgWrapper(<Bars {...props} />));
  });

  it('renders its content vertically with fixed barWeight', () => {
    const rendered = mount(svgWrapper(<Bars {...props} />));
    const bars = rendered.find('.vx-bar');
    bars.forEach((bar, index) => {
      expect(bar.prop('height')).toBeCloseTo((values[index] / maxValue) * (props.height - chartConstants.marginBottom - chartConstants.marginMaxValueToBorder));
      expect(bar.prop('width')).toBeCloseTo(barWeight());
      expect(bar.prop('fill')).toBe('blue');
    });
  });

  it('renders its content horizontally with fixed barWeight', () => {
    const rendered = mount(svgWrapper(<Bars
      {...props}
      direction="horizontal"
      left={chartConstants.marginLeftCategorical}
      scaleLabel={labelScaleHorizontal}
      scaleValue={valueScaleHorizontal}
      labelOffset={labelScaleHorizontal.bandwidth() / 2}
    />));
    const bars = rendered.find('.vx-bar');
    bars.forEach((bar, index) => {
      expect(bar.prop('height')).toBeCloseTo(barWeight());
      expect(bar.prop('width')).toBeCloseTo((values[index] / maxValue) * (parentSize.width - chartConstants.marginLeftCategorical - chartConstants.marginMaxValueToBorder));
      expect(bar.prop('fill')).toBe('blue');
    });
  });

  it('does not render bar if label is outside of label axis', () => {
    const rendered = mount(svgWrapper(<Bars {...propsShiftedLabels} />));
    const bars = rendered.find('.vx-bar');
    bars.forEach((bar, index) => {
      if (labels.includes(labelsShifted[index])) expect(bar.prop('width')).toBe(propsShiftedLabels.barWeight());
      else expect(bar.prop('width')).toBe(0);
      expect(bar.prop('height')).toBeCloseTo((values[index] / maxValue) * (props.height - chartConstants.marginBottom - chartConstants.marginMaxValueToBorder));
      expect(bar.prop('fill')).toBe('blue');
    });
  });

});
