import React from 'react';
import ChartOverlay from './ChartOverlay';

const props = {
  children: (
    <a>Hello</a>
  ),
};

describe('<ChartOverlay />', () => {
  it('renders without crashing', () => {
    shallow(<ChartOverlay {...props} />);
  });

  it('renders its content', () => {
    const rendered = mount(<ChartOverlay {...props} />);
    expect(rendered.contains('Hello')).toBe(true);
  });
});
