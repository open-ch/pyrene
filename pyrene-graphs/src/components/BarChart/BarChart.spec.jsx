import React from 'react';
import { Loader } from 'pyrene';
import BarChart from './BarChart';

const props = {
  data: [{
    label: 'Dropbox',
    values: [1147.4],
  },
  {
    label: 'Youtube',
    values: [849.9],
  }],
  title: 'Title',
  description: 'Description',
  legend: ['Volume'],
};

describe('<BarChart />', () => {
  it('renders without crashing', () => {
    shallow(<BarChart {...props} />);
  });

  it('renders its content vertically', () => {
    const rendered = mount(<BarChart {...props} direction="vertical" />);

    // Header
    expect(rendered.contains('Title')).toBe(true);
    expect(rendered.contains('Description')).toBe(true);
    expect(rendered.contains('Volume')).toBe(true);

    // Numerical left axis
    const leftAxis = rendered.find('.vx-axis-left');
    expect(leftAxis.findWhere((n) => n.text() === '0').exists()).toBe(false);
    expect(leftAxis.findWhere((n) => n.text() === '200').exists()).toBe(true);
    expect(leftAxis.findWhere((n) => n.text() === '400').exists()).toBe(true);
    expect(leftAxis.findWhere((n) => n.text() === '600').exists()).toBe(true);
    expect(leftAxis.findWhere((n) => n.text() === '800').exists()).toBe(true);
    expect(leftAxis.findWhere((n) => n.text() === '1000').exists()).toBe(true);
    expect(leftAxis.findWhere((n) => n.text() === '1200').exists()).toBe(false);

    // Categorical bottom axis
    const bottomAxis = rendered.find('.vx-axis-bottom');
    expect(bottomAxis.findWhere((n) => n.text() === 'Dropbox').exists()).toBe(true);
    expect(bottomAxis.findWhere((n) => n.text() === 'Youtube').exists()).toBe(true);
    expect(bottomAxis.findWhere((n) => n.text() === 'Google').exists()).toBe(false);

    // Grid
    expect(rendered.find('.vx-rows').exists()).toBe(true);
    expect(rendered.find('.vx-columns').exists()).toBe(false);

    // Bars
    expect(rendered.find('.vx-bar')).toHaveLength(2);
  });

  it('renders its content horizontally', () => {
    const rendered = mount(<BarChart {...props} direction="horizontal" />);

    // Header
    expect(rendered.contains('Title')).toBe(true);
    expect(rendered.contains('Description')).toBe(true);
    expect(rendered.contains('Volume')).toBe(true);

    // Categorical left axis
    const leftAxis = rendered.find('.vx-axis-left');
    expect(leftAxis.findWhere((n) => n.text() === 'Dropbox').exists()).toBe(true);
    expect(leftAxis.findWhere((n) => n.text() === 'Youtube').exists()).toBe(true);
    expect(leftAxis.findWhere((n) => n.text() === 'Google').exists()).toBe(false);

    // Numerical bottom axis
    const bottomAxis = rendered.find('.vx-axis-bottom');
    expect(bottomAxis.findWhere((n) => n.text() === '0').exists()).toBe(false);
    expect(bottomAxis.findWhere((n) => n.text() === '200').exists()).toBe(true);
    expect(bottomAxis.findWhere((n) => n.text() === '400').exists()).toBe(true);
    expect(bottomAxis.findWhere((n) => n.text() === '600').exists()).toBe(true);
    expect(bottomAxis.findWhere((n) => n.text() === '800').exists()).toBe(true);
    expect(bottomAxis.findWhere((n) => n.text() === '1000').exists()).toBe(true);
    expect(bottomAxis.findWhere((n) => n.text() === '1200').exists()).toBe(false);

    // Grid
    expect(rendered.find('.vx-columns').exists()).toBe(true);
    expect(rendered.find('.vx-rows').exists()).toBe(false);

    // Bars
    expect(rendered.find('.vx-bar')).toHaveLength(2);
  });

  it('renders header, axis lines and loader', () => {
    const rendered = mount(<BarChart {...props} loading />);

    // Header
    expect(rendered.contains('Title')).toBe(true);
    expect(rendered.contains('Description')).toBe(true);
    expect(rendered.contains('Volume')).toBe(true);

    // Categorical left axis
    const leftAxis = rendered.find('.vx-axis-left');
    expect(leftAxis.findWhere((n) => n.text() === 'Dropbox').exists()).toBe(false);
    expect(leftAxis.find('.vx-axis-line').exists()).toBe(true);

    // Numerical bottom axis
    const bottomAxis = rendered.find('.vx-axis-bottom');
    expect(bottomAxis.findWhere((n) => n.text() === '200').exists()).toBe(false);
    expect(bottomAxis.find('.vx-axis-line').exists()).toBe(true);

    // Grid
    expect(rendered.find('.vx-columns').exists()).toBe(false);

    // Bars
    expect(rendered.find('.vx-bar')).toHaveLength(0);

    // Loader
    expect(rendered.find(Loader).exists()).toBe(true);
  });

  it('renders tick labels using tickFormatNumerical', () => {
    const rendered = mount(
      <BarChart
        {...props}
        direction="vertical"
        tickFormatNumerical={(d) => (parseFloat(d) >= 100000 ? `${parseFloat(d) / 1000}k` : d)} data={props.data.map((d) => ({
          label: d.label,
          values: d.values.map((e) => e * 100),
        }))}
      />,
    );

    // Numerical left axis
    const leftAxis = rendered.find('.vx-axis-left');
    expect(leftAxis.findWhere((n) => n.text() === '20000').exists()).toBe(true);
    expect(leftAxis.findWhere((n) => n.text() === '40000').exists()).toBe(true);
    expect(leftAxis.findWhere((n) => n.text() === '60000').exists()).toBe(true);
    expect(leftAxis.findWhere((n) => n.text() === '80000').exists()).toBe(true);
    expect(leftAxis.findWhere((n) => n.text() === '100k').exists()).toBe(true);
  });

});
