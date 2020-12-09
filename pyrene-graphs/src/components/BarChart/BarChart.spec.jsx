import React from 'react';
import { Loader } from '@osag/pyrene';
import BarChart from './BarChart';
import { getSITickValue, getSIUnit } from '../..';

const dataMultipleValues = [{
  label: 'Dropbox',
  data: [1147.4, 161.4],
},
{
  label: 'Youtube',
  data: [849.9, 224.4],
}];

const legendMultipleValues = ['Desktop', 'Mobile'];

const props = {
  data: [{
    label: 'Dropbox',
    data: [1147.4],
  },
  {
    label: 'Youtube',
    data: [849.9],
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
    expect(leftAxis.children().find('.vx-axis-tick').length).toBeGreaterThan(0);

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
    expect(bottomAxis.children().find('.vx-axis-tick').length).toBeGreaterThan(0);

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

  it('renders tick labels using axis tick format', () => {
    const rendered = mount(
      <BarChart
        {...props}
        direction="vertical"
        tickFormat={(value) => getSITickValue(value, props.data)}
        unit={getSIUnit(props.data, 'B')}
      />,
    );

    // Numerical left axis
    const leftAxis = rendered.find('.vx-axis-left');
    expect(leftAxis.children().find('.vx-axis-tick').length).toBeGreaterThan(0);
    expect(leftAxis.children().at(1).text()).toBe('0.2');
    expect(rendered.find('.unitContainer').text()).toBe('kB');
  });

  it('renders multiple values', () => {
    const rendered = mount(<BarChart {...props} data={dataMultipleValues} legend={legendMultipleValues} />);

    // Header
    expect(rendered.contains('Title')).toBe(true);
    expect(rendered.contains('Description')).toBe(true);
    expect(rendered.contains(legendMultipleValues[0])).toBe(true);
    expect(rendered.contains(legendMultipleValues[1])).toBe(true);

    // Numerical left axis
    const leftAxis = rendered.find('.vx-axis-left');
    expect(leftAxis.children().find('.vx-axis-tick').length).toBeGreaterThan(0);

    // Categorical bottom axis
    const bottomAxis = rendered.find('.vx-axis-bottom');
    expect(bottomAxis.findWhere((n) => n.text() === 'Dropbox').exists()).toBe(true);
    expect(bottomAxis.findWhere((n) => n.text() === 'Youtube').exists()).toBe(true);
    expect(bottomAxis.findWhere((n) => n.text() === 'Google').exists()).toBe(false);

    // Grid
    expect(rendered.find('.vx-rows').exists()).toBe(true);
    expect(rendered.find('.vx-columns').exists()).toBe(false);

    // Bars
    expect(rendered.find('.vx-bar')).toHaveLength(4);
  });

});
