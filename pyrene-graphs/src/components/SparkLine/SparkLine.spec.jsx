import React from 'react';
import moment from 'moment-timezone';
import SparkLine from './SparkLine';
import timeSeriesData from '../../examples/timeSeriesData';
import colorSchemes from '../../styles/colorSchemes';

const timezone = 'Europe/Zurich';

const props = {
  tooltipFormat: (d) => `${d} testFormat`,
  data: timeSeriesData.genDownloadedVolumes(moment.tz('2019-10-01 00:00', timezone).valueOf(), moment.tz('2019-10-03 12:00', timezone).valueOf(), 24).data,
};

describe('<SparkLine />', () => {
  it('renders without crashing', () => {
    shallow(<SparkLine {...props} />);
  });

  it('renders its content correctly', () => {
    const rendered = mount(<SparkLine {...props} />);

    // Line
    expect(rendered.find('.vx-linepath')).toHaveLength(1);
    expect(rendered.find('.vx-linepath').at(0).props().stroke).toBe(colorSchemes.colorSchemeDefault.valueGroundLight[0]);

    // Area
    expect(rendered.find('.vx-area-closed')).toHaveLength(1);
    expect(rendered.find('.vx-area-closed').at(0).props().fill).toBe(colorSchemes.colorSchemeDefault.valueGroundLight[1]);

    // Tooltip
    const hoverArea = rendered.find('.hoverArea');
    hoverArea.simulate('mousemove');
    expect(rendered.find('.vx-tooltip-portal')).toHaveLength(1);
    expect(rendered.find('.vx-circle').props().fill).toBe('white');
    expect(rendered.find('.vx-circle').props().stroke).toBe(colorSchemes.colorSchemeDefault.valueGroundLight[0]);
    hoverArea.simulate('mouseout');
    expect(rendered.find('.vx-tooltip-portal')).toHaveLength(0);
    expect(rendered.find('.vx-circle').props().stroke).toBe('white');
    expect(rendered.find('.vx-circle').props().fill).toBe(colorSchemes.colorSchemeDefault.valueGroundLight[0]);

  });

});
