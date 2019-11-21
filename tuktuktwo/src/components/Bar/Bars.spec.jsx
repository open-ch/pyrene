import React from 'react';
import Bars from './Bars';
import chartConstants from '../../common/chartConstants';
import ScaleUtils from '../../common/ScaleUtils';

const parentSize = { width: 500, height: 404 };
const labels = [1, 2];
const values = [12, 37];
const maxValue = 100;
const barWeight = 5;

const labelScaleVertical = ScaleUtils.scaleOrdinal(0, parentSize.height - chartConstants.marginBottom, labels);
const labelScaleHorizontal = ScaleUtils.scaleOrdinal(0, parentSize.width - chartConstants.marginLeftCategorical, labels);

const props = {
  barWeight: barWeight,
  color: 'blue',
  height: parentSize.height,
  maxValue: maxValue,
  values: values,
  width: parentSize.width,
  labelScale: labelScaleVertical,
  labels: labels,
  direction: 'vertical',
  left: chartConstants.marginLeftNumerical,
  labelOffset: labelScaleVertical.bandwidth() / 2,
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
      expect(bar.prop('width')).toBeCloseTo(barWeight);
      expect(bar.prop('fill')).toBe('blue');
    });
  });

  it('renders its content horizontally with fixed barWeight', () => {
    const rendered = mount(svgWrapper(<Bars
      {...props}
      direction="horizontal"
      left={chartConstants.marginLeftCategorical}
      labelScale={labelScaleHorizontal}
      labelOffset={labelScaleHorizontal.bandwidth() / 2}
    />));
    const bars = rendered.find('.vx-bar');
    bars.forEach((bar, index) => {
      expect(bar.prop('height')).toBeCloseTo(barWeight);
      expect(bar.prop('width')).toBeCloseTo((values[index] / maxValue) * (parentSize.width - chartConstants.marginLeftCategorical - chartConstants.marginMaxValueToBorder));
      expect(bar.prop('fill')).toBe('blue');
    });
  });

  // it('does not render bar if label is outside of label axis', () => {
  //   const rendered = mount(svgWrapper(<Bars {...props} labels={[-1, 1]} />));
  //   const bars = rendered.find('.vx-bar');
  //   bars.forEach((bar, index) => {
  //     expect(bar.prop('height')).toBeCloseTo((values[index] / maxValue) * (props.height - chartConstants.marginBottom - chartConstants.marginMaxValueToBorder));
  //     expect(bar.prop('width')).toBeCloseTo(barWeight);
  //     expect(bar.prop('fill')).toBe('blue');
  //   });
  // });

});
