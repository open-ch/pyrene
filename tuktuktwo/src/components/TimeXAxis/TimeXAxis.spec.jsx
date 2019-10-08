import React from 'react';

import TimeXAxis from './TimeXAxis';
import { getTickValues } from './TimeXUtil';

const props = {
  from: 1569944216000,
  to: 1572303296000,
  timezone: 'Europe/Zurich',
  showTickLabels: true,
};

const testTimeRanges = [
  {
    id: '0.5h',
    from: 1569944820000,       // 2019-10-01 23:47
    to: 1569946320000,         // 2019-10-01 00:12
    timezone: 'Asia/Shanghai',
    expectedValues: [1569945000000, 1569945600000, 1569946200000],    // 23:50, 00:00, 00:10
  },
  {
    id: '1h',
    from: 1569908640000,       // 2019-10-01 13:44
    to: 1569911580000,         // 2019-10-01 14:33
    timezone: 'Europe/Zurich',
    expectedValues: [1569909600000, 1569910800000],    // 14:00, 14:20
  },
  {
    id: '6h',
    from: 1569902100000,       // 2019-10-01 11:55
    to: 1569918000000,         // 2019-10-01 16:20
    timezone: 'Asia/Shanghai',
    expectedValues: [1569902400000, 1569906000000, 1569909600000, 1569913200000, 1569916800000],    // 12:00, 13:00, 14:00, 15:00, 16:00
  },
  {
    id: '12h',
    from: 1569925980000,       // 2019-10-01 18:33
    to: 1569960840000,         // 2019-10-02 04:14
    timezone: 'Asia/Shanghai',
    expectedValues: [1569931200000, 1569938400000, 1569945600000, 1569952800000, 1569960000000],    // 20:00, 22:00, 00:00, 02:00, 04:00
  },
  {
    id: '1d',
    from: 1601569980000,       // 2019-10-01 18:33
    to: 1601644440000,         // 2019-10-02 15:14
    timezone: 'Europe/Zurich',
    expectedValues: [1601575200000, 1601589600000, 1601604000000, 1601618400000, 1601632800000],    // 20:00, 00:00, 04:00, 08:00, 12:00
  },
  {
    id: '2d',
    from: 1601569980000,       // 2020-10-01 18:33
    to: 1601730840000,         // 2020-10-03 15:14
    timezone: 'Europe/Zurich',
    expectedValues: [1601589600000, 1601618400000, 1601647200000, 1601676000000, 1601704800000],    // 00:00, 08:00, 16:00, 00:00, 08:00
  },
  {
    id: '1w',
    from: 1569925980000,       // 2019-10-01 18:33
    to: 1570432440000,         // 2019-10-07 15:14
    timezone: 'Asia/Shanghai',
    expectedValues: [1569945600000, 1570032000000, 1570118400000, 1570204800000, 1570291200000, 1570377600000],    // 00:00 of each day
  },
  {
    id: '1m',
    from: 1569925980000,       // 2019-10-01 18:33
    to: 1572246840000,         // 2019-10-28 15:14
    timezone: 'Asia/Shanghai',
    expectedValues: [1570377600000, 1570982400000, 1571587200000, 1572192000000],    // 00:00 of each Monday
  },
  {
    id: '3m',
    from: 1569947580000,       // 2019-10-01 18:33
    to: 1576246440000,         // 2019-12-13 15:14
    timezone: 'Europe/Zurich',
    expectedValues: [1571004000000, 1572217200000, 1573426800000, 1574636400000, 1575846000000],    // 00:00 of every other Monday
  },
  {
    id: '6m',
    from: 1569947580000,       // 2019-10-01 18:33
    to: 1582467240000,         // 2020-02-23 15:14
    timezone: 'Europe/Zurich',
    expectedValues: [1572562800000, 1575154800000, 1577833200000, 1580511600000],    // 00:00 of first day of a month
  },
  {
    id: '1y',
    from: 1569925980000,       // 2019-10-01 18:33
    to: 1595488440000,         // 2020-07-23 15:14
    timezone: 'Asia/Shanghai',
    expectedValues: [1572537600000, 1577808000000, 1582992000000, 1588262400000, 1593532800000],    // 00:00 of first day of every other month
  },
  {
    id: '2y',
    from: 1569925980000,       // 2019-10-01 18:33
    to: 1629724440000,         // 2021-03-23 15:14
    timezone: 'Europe/Zurich',
    expectedValues: [1577833200000, 1588284000000, 1598911200000, 1609455600000, 1619820000000],    // 00:00 of first day of every 4th month
  },
  {
    id: '>2y',
    from: 1569925980000,       // 2019-10-01 18:33
    to: 1661260440000,         // 2022-03-23 15:14
    timezone: 'Europe/Zurich',
    expectedValues: [1577833200000, 1593554400000, 1609455600000, 1625090400000, 1640991600000, 1656626400000],    // 00:00 of first day of every 6th month
  },
];

describe('<TimeXAxis />', () => {
  it('renders without crashing', () => {
    shallow(<TimeXAxis {...props} />);
  });

  it('displays the content', () => {
    const rendered = mount(<TimeXAxis {...props} />);
    expect(rendered.find('.vx-axis-bottom').children().find('.vx-axis-tick').length).toBeGreaterThan(0);
    expect(rendered.find('.vx-columns').children().find('.vx-line').length).toBeGreaterThan(0);
  });

  it('does not render grid', () => {
    const rendered = mount(<TimeXAxis showGrid={false} {...props} />);
    expect(rendered.find('.vx-axis-bottom').children().find('.vx-axis-tick').length).toBeGreaterThan(0);
    expect(rendered.find('.vx-columns').children().find('.vx-line')).toHaveLength(0);
  });
});

describe('TickValues', () => {
  testTimeRanges.forEach((testTimeRange) => {
    it('calculates the correct tick values', () => {
      const result = getTickValues(testTimeRange.from, testTimeRange.to, testTimeRange.timezone);
      expect(result).toStrictEqual(testTimeRange.expectedValues);
    });
  });
});
