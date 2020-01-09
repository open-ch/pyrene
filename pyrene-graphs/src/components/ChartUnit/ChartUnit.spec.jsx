import React from 'react';
import ChartUnit from './ChartUnit';

const props = {
  unit: 'MB',
};

describe('<ChartUnit />', () => {
  it('renders without crashing', () => {
    shallow(<ChartUnit {...props} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<ChartUnit {...props} />);
    expect(rendered.contains('MB')).toBe(true);
  });
});
