import React from 'react';

import TimeXAxis from './TimeXAxis';
import { getTickValues } from './TimeXUtil';

const props = {
  from: 1569944216000,
  to: 1572303296000,
  timezone: 'Europe/Zurich',
  showTickLabels: true,
  showGrid: true,
};

const expectedTickValues = [1570399200000, 1571004000000, 1571608800000, 1572217200000];    // 07/14/21/28 October, 2019, 00:00

describe('<TimeXAxis />', () => {
  it('renders without crashing', () => {
    shallow(<TimeXAxis {...props} />);
  });

  it('displays the content', () => {
    const rendered = mount(<TimeXAxis {...props} />);
    expect(rendered.find('.vx-axis-bottom').children().find('.vx-axis-tick').length).toBeGreaterThan(0);
    expect(rendered.find('.vx-columns').children().find('.vx-line').length).toBeGreaterThan(0);
  });
});

describe('TickValues', () => {
  it('calculates the correct tick values', () => {
    const result = getTickValues(props.from, props.to, props.timezone);
    expect(result).toStrictEqual(expectedTickValues);
  });
});
