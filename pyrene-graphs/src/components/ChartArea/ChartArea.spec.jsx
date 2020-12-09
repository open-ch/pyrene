import React from 'react';
import { chartConstants } from '@osag/tuktuktwo';
import ChartArea from './ChartArea';

const props = {
  width: 100,
  height: 100 - chartConstants.marginBottom,
  left: chartConstants.marginLeftNumerical,
};

describe('<ChartArea />', () => {
  it('renders without crashing', () => {
    shallow(<ChartArea {...props} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<ChartArea {...props} />);
    const rect = rendered.find('.chartArea');
    expect(rect).toHaveLength(1);
    expect(rect.prop('width')).toBe(100 - chartConstants.marginLeftNumerical);
    expect(rect.prop('height')).toBe(100 - chartConstants.marginBottom);
    expect(rect.prop('x')).toBe(chartConstants.marginLeftNumerical);
    expect(rect.prop('fill')).toBe('transparent');
  });
});
