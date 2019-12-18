import React from 'react';
import moment from 'moment-timezone';
import { Loader } from 'pyrene';
import TimeSeriesLineChart from './TimeSeriesLineChart';
import timeSeriesData from '../../examples/timeSeriesData';
import colorSchemes from '../../styles/colorSchemes';

const timezone = 'Europe/Zurich';
const initialFrom = moment.tz('2019-10-01 00:00', timezone).valueOf();
const initialTo = moment.tz('2019-10-08 00:00', timezone).valueOf();
const dataFormat = {
  tooltip: (d) => `${d} tooltip`,
  yAxis: (d) => `${d} axis`,
};

const props = {
  dataFormat: dataFormat,
  dataSeries: timeSeriesData.genThreatScores(initialFrom, initialTo, 42),
  description: 'TEST DESCRIPTION',
  error: 'ERROR HANDLING',
  from: initialFrom,
  to: initialTo,
  title: 'TITLE',
  timezone: timezone,
};

describe('<TimeSeriesLineChart />', () => {
  it('renders without crashing', () => {
    shallow(<TimeSeriesLineChart {...props} />);
  });

  it('renders its content correctly', () => {
    const rendered = mount(<TimeSeriesLineChart {...props} />);

    // Header
    expect(rendered.contains('TITLE')).toBe(true);
    expect(rendered.contains('TEST DESCRIPTION')).toBe(true);

    // Numerical left axis
    const yAxis = rendered.find('.vx-axis-left');
    expect(yAxis.children().find('.vx-axis-line').length).toBeGreaterThan(0);
    expect(yAxis.children().find('.vx-axis-tick').length).toBeGreaterThan(0);
    expect(yAxis.children().find('.vx-axis-tick').at(0).text()).toContain(' axis');

    // Time X-Axis
    const xAxis = rendered.find('.vx-axis-bottom');
    expect(xAxis.children().find('.vx-axis-line').length).toBeGreaterThan(0);
    expect(xAxis.children().find('.vx-axis-tick').length).toBeGreaterThan(0);

    // Grid
    expect(rendered.find('.vx-columns').exists()).toBe(true);

    // Lines
    expect(rendered.find('.vx-linepath').length).toBeGreaterThan(0);
    expect(rendered.find('.vx-linepath').at(0).props().stroke).toBe(colorSchemes.colorSchemeDefault.categorical[0]);
    expect(rendered.find('.vx-linepath').at(1).props().stroke).toBe(colorSchemes.colorSchemeDefault.categorical[1]);
    expect(rendered.find('.vx-linepath').at(2).props().stroke).toBe(colorSchemes.colorSchemeDefault.categorical[2]);

    // Tooltip
    const hoverArea = rendered.find('.hoverArea');
    hoverArea.simulate('mousemove');
    expect(rendered.find('.vx-tooltip-portal')).toHaveLength(1);
    expect(rendered.find('.tooltip .data').at(0).text()).toContain(' tooltip');
    expect(rendered.find('.vx-circle').at(0).props().fill).toBe('white');
    expect(rendered.find('.vx-circle').at(0).props().stroke).toBe(colorSchemes.colorSchemeDefault.categorical[0]);
    expect(rendered.find('.vx-line').exists()).toBe(true);
    hoverArea.simulate('mouseout');
    expect(rendered.find('.vx-tooltip-portal')).toHaveLength(0);
  });

  it('renders header, axis lines and loader', () => {
    const rendered = mount(<TimeSeriesLineChart {...props} loading />);

    // Header
    expect(rendered.contains('TITLE')).toBe(true);
    expect(rendered.contains('TEST DESCRIPTION')).toBe(true);

    // Numerical left axis
    const yAxis = rendered.find('.vx-axis-left');
    expect(yAxis.children().find('.vx-axis-line').length).toBeGreaterThan(0);
    expect(yAxis.children().find('.vx-axis-tick')).toHaveLength(0);

    // Time X-Axis
    const xAxis = rendered.find('.vx-axis-bottom');
    expect(xAxis.children().find('.vx-axis-line').length).toBeGreaterThan(0);
    expect(xAxis.children().find('.vx-axis-tick')).toHaveLength(0);

    // Grid
    expect(rendered.find('.vx-columns').exists()).toBe(false);

    // Line
    expect(rendered.find('.vx-linepath')).toHaveLength(0);

    // Loader
    expect(rendered.find(Loader).exists()).toBe(true);
  });

});
