import React from 'react';
import ChartContainer from './ChartContainer';

const props = {
  chart: (
    <a>Chart Test</a>
  ),
  chartOverlay: (
    <a>ChartOverlay Test</a>
  ),
  header: (
    <a>Header Test</a>
  ),
};

describe('<ChartContainer />', () => {
  it('renders without crashing', () => {
    shallow(<ChartContainer {...props} />);
  });

  it('renders its content', () => {
    const rendered = mount(<ChartContainer {...props} />);
    expect(rendered.find('.chart').at(0).text()).toEqual('Chart Test');
    expect(rendered.find('.chartOverlay').at(0).text()).toEqual('ChartOverlay Test');
    expect(rendered.contains('Header Test')).toBe(true);
  });
});
