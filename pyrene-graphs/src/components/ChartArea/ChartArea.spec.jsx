import React from 'react';
import { chartConstants } from 'tuktuktwo';
import ChartArea from './ChartArea';

const props = {
  width: 100,
  height: 100,
};

describe('<ChartArea />', () => {
  it('renders without crashing', () => {
    shallow(<ChartArea {...props} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<ChartArea {...props} />);
    const rect = rendered.find('.chartArea');
    expect(rect).toHaveLength(1);
    expect(rect.prop('width')).toBe(props.width - chartConstants.marginLeftNumerical);
    expect(rect.prop('height')).toBe(props.height - chartConstants.marginBottom);
    expect(rect.prop('fill')).toBe('transparent');
  });
});
