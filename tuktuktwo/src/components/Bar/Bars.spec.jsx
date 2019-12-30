import React from 'react';
import { scaleBand, scaleLinear, scaleTime } from '@vx/scale';
import Bars from './Bars';
import chartConstants from '../../common/chartConstants';

const parentSize = { width: 500, height: 404 };
const labels = [1, 2];
const values = [12, 37];
const maxValue = 100;
const barWeight = () => 5;

const labelScaleVertical = scaleBand({
  range: [0, parentSize.height - chartConstants.marginBottom],
  domain: labels,
});
const labelScaleHorizontal = scaleBand({
  range: [0, parentSize.width - chartConstants.marginLeftNumerical],
  domain: labels,
});
const valueScaleVertical = scaleLinear({
  range: [parentSize.height - chartConstants.marginBottom, 0],
  domain: [0, maxValue],
});
const valueScaleHorizontal = scaleLinear({
  range: [chartConstants.marginLeftCategorical, parentSize.width],
  domain: [0, maxValue],
});

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
const labelScaleTimeHorizontal = scaleTime({
  range: [chartConstants.marginLeftNumerical, parentSize.width],
  domain: [from, to],
});
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
      expect(bar.prop('height')).toBeCloseTo((values[index] / maxValue) * (parentSize.height - chartConstants.marginBottom));
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
      expect(bar.prop('width')).toBeCloseTo((values[index] / maxValue) * (parentSize.width - chartConstants.marginLeftCategorical));
      expect(bar.prop('fill')).toBe('blue');
    });
  });

  it('does not render bar if label is outside of label axis', () => {
    const rendered = mount(svgWrapper(<Bars {...propsShiftedLabels} />));
    const bars = rendered.find('.vx-bar');
    bars.forEach((bar, index) => {
      if (labels.includes(labelsShifted[index])) expect(bar.prop('width')).toBe(propsShiftedLabels.barWeight());
      else expect(bar.prop('width')).toBe(0);
      expect(bar.prop('height')).toBeCloseTo((values[index] / maxValue) * (props.height - chartConstants.marginBottom));
      expect(bar.prop('fill')).toBe('blue');
    });
  });

});
