import React from 'react';
import moment from 'moment-timezone';
import { Loader } from 'pyrene';
import SparkLineChart from './SparkLineChart';
import timeSeriesData from '../../examples/timeSeriesData';
import colorSchemes from '../../styles/colorSchemes';

const timezone = 'Europe/Zurich';

const props = {
  bigNumber: 10.52,
  dataFormat: (d) => `${d} testFormat`,
  dataSeries: timeSeriesData.genDownloadedVolumes(moment.tz('2019-10-01 00:00', timezone).valueOf(), moment.tz('2019-10-03 12:00', timezone).valueOf(), 24).data,
  axisLabel: 'Axis Label Test',
  timezone: timezone,
};

describe('<SparkLineChart />', () => {
  it('renders without crashing', () => {
    shallow(<SparkLineChart {...props} />);
  });

  it('renders its content correctly', () => {
    const rendered = mount(<SparkLineChart {...props} />);

    // Big Number
    expect(rendered.find('.bigNumber').text()).toBe('10.52 testFormat');

    // Time X-Axis
    const xAxis = rendered.find('.vx-axis-bottom');
    expect(xAxis.children().find('.vx-axis-line').length).toBeGreaterThan(0);
    expect(xAxis.children().find('.vx-axis-tick')).toHaveLength(0);
    expect(xAxis.children().find('.vx-axis-label').at(0).text()).toBe('Axis Label Test');

    // Line
    expect(rendered.find('.vx-linepath')).toHaveLength(1);
    expect(rendered.find('.vx-linepath').at(0).props().stroke).toBe(colorSchemes.colorSchemeDefault.valueGround[0]);

    // Area
    expect(rendered.find('.vx-area-closed')).toHaveLength(1);
    expect(rendered.find('.vx-area-closed').at(0).props().fill).toBe(colorSchemes.colorSchemeDefault.valueGround[1]);
  });

  it('renders axis line, axis label and loader', () => {
    const rendered = mount(<SparkLineChart {...props} loading />);

    // Header
    expect(rendered.find('.bigNumber').text()).toBe('');

    // Time X-Axis
    const xAxis = rendered.find('.vx-axis-bottom');
    expect(xAxis.children().find('.vx-axis-line').length).toBeGreaterThan(0);
    expect(xAxis.children().find('.vx-axis-tick')).toHaveLength(0);
    expect(xAxis.children().find('.vx-axis-label').length).toBeGreaterThan(0);

    // Line
    expect(rendered.find('.vx-linepath')).toHaveLength(0);

    // Area
    expect(rendered.find('.vx-area-closed')).toHaveLength(0);

    // Loader
    expect(rendered.find(Loader).exists()).toBe(true);
  });

});
