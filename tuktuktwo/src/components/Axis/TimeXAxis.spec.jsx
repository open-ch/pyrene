import React from 'react';
import moment from 'moment';
import TimeXAxis from './TimeXAxis';
import { getTickValues } from './TimeXUtil';
import { scaleTime } from '../../common/ScaleUtils';

const testTimeRanges = [
  {
    id: '0.5h',
    from: moment.tz('2019-10-01 23:47', 'Asia/Shanghai').valueOf(),
    to: moment.tz('2019-10-02 00:12', 'Asia/Shanghai').valueOf(),
    timezone: 'Asia/Shanghai',
    expectedValues: [
      moment.tz('2019-10-01 23:50', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-02 00:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-02 00:10', 'Asia/Shanghai').valueOf(),
    ],
    minMarginRight: 100,
  },
  {
    id: '1h',
    from: moment.tz('2019-10-01 13:44', 'Europe/Zurich').valueOf(),
    to: moment.tz('2019-10-01 14:33', 'Europe/Zurich').valueOf(),
    timezone: 'Europe/Zurich',
    expectedValues: [
      moment.tz('2019-10-01 14:00', 'Europe/Zurich').valueOf(),
      moment.tz('2019-10-01 14:20', 'Europe/Zurich').valueOf(),
    ],
    minMarginRight: 100,
  },
  {
    id: '6h',
    from: moment.tz('2019-10-01 11:55', 'Asia/Shanghai').valueOf(),
    to: moment.tz('2019-10-01 16:20', 'Asia/Shanghai').valueOf(),
    timezone: 'Asia/Shanghai',
    expectedValues: [
      moment.tz('2019-10-01 12:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-01 13:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-01 14:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-01 15:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-01 16:00', 'Asia/Shanghai').valueOf(),
    ],
    minMarginRight: 100,
  },
  {
    id: '12h',
    from: moment.tz('2019-10-01 18:33', 'Asia/Shanghai').valueOf(),
    to: moment.tz('2019-10-02 04:14', 'Asia/Shanghai').valueOf(),
    timezone: 'Asia/Shanghai',
    expectedValues: [
      moment.tz('2019-10-01 20:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-01 22:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-02 00:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-02 02:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-02 04:00', 'Asia/Shanghai').valueOf(),
    ],
    minMarginRight: 100,
  },
  {
    id: '1d',
    from: moment.tz('2019-10-01 18:33', 'Europe/Zurich').valueOf(),
    to: moment.tz('2019-10-02 15:14', 'Europe/Zurich').valueOf(),
    timezone: 'Europe/Zurich',
    expectedValues: [
      moment.tz('2019-10-01 20:00', 'Europe/Zurich').valueOf(),
      moment.tz('2019-10-02 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2019-10-02 04:00', 'Europe/Zurich').valueOf(),
      moment.tz('2019-10-02 08:00', 'Europe/Zurich').valueOf(),
      moment.tz('2019-10-02 12:00', 'Europe/Zurich').valueOf(),
    ],
    minMarginRight: 100,
  },
  {
    id: '2d',
    from: moment.tz('2020-10-01 18:33', 'Europe/Zurich').valueOf(),
    to: moment.tz('2020-10-03 15:14', 'Europe/Zurich').valueOf(),
    timezone: 'Europe/Zurich',
    expectedValues: [
      moment.tz('2020-10-02 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2020-10-02 08:00', 'Europe/Zurich').valueOf(),
      moment.tz('2020-10-02 16:00', 'Europe/Zurich').valueOf(),
      moment.tz('2020-10-03 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2020-10-03 08:00', 'Europe/Zurich').valueOf(),
    ],
    minMarginRight: 100,
  },
  {
    id: '1w',
    from: moment.tz('2019-10-01 18:33', 'Asia/Shanghai').valueOf(),
    to: moment.tz('2019-10-07 15:14', 'Asia/Shanghai').valueOf(),
    timezone: 'Asia/Shanghai',
    expectedValues: [
      moment.tz('2019-10-02 00:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-03 00:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-04 00:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-05 00:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-06 00:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-07 00:00', 'Asia/Shanghai').valueOf(),
    ],
    minMarginRight: 100,
  },
  {
    id: '1m',
    from: moment.tz('2019-10-01 18:33', 'Asia/Shanghai').valueOf(),
    to: moment.tz('2019-10-28 15:14', 'Asia/Shanghai').valueOf(),
    timezone: 'Asia/Shanghai',
    expectedValues: [
      moment.tz('2019-10-07 00:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-14 00:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-21 00:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2019-10-28 00:00', 'Asia/Shanghai').valueOf(),
    ],
    minMarginRight: 100,
  },
  {
    id: '3m',
    from: moment.tz('2019-10-01 18:33', 'Europe/Zurich').valueOf(),
    to: moment.tz('2019-12-13 15:14', 'Europe/Zurich').valueOf(),
    timezone: 'Europe/Zurich',
    expectedValues: [
      moment.tz('2019-10-14 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2019-10-28 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2019-11-11 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2019-11-25 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2019-12-09 00:00', 'Europe/Zurich').valueOf(),
    ],
    minMarginRight: 100,
  },
  {
    id: '6m',
    from: moment.tz('2019-10-01 18:33', 'Europe/Zurich').valueOf(),
    to: moment.tz('2020-02-23 15:14', 'Europe/Zurich').valueOf(),
    timezone: 'Europe/Zurich',
    expectedValues: [
      moment.tz('2019-11-01 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2019-12-01 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2020-01-01 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2020-02-01 00:00', 'Europe/Zurich').valueOf(),
    ],
    minMarginRight: 100,
  },
  {
    id: '1y',
    from: moment.tz('2019-10-01 18:33', 'Asia/Shanghai').valueOf(),
    to: moment.tz('2020-07-23 15:14', 'Asia/Shanghai').valueOf(),
    timezone: 'Asia/Shanghai',
    expectedValues: [
      moment.tz('2019-11-01 00:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2020-01-01 00:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2020-03-01 00:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2020-05-01 00:00', 'Asia/Shanghai').valueOf(),
      moment.tz('2020-07-01 00:00', 'Asia/Shanghai').valueOf(),
    ],
    minMarginRight: 100,
  },
  {
    id: '2y',
    from: moment.tz('2019-10-01 18:33', 'Europe/Zurich').valueOf(),
    to: moment.tz('2021-03-23 15:14', 'Europe/Zurich').valueOf(),
    timezone: 'Europe/Zurich',
    expectedValues: [
      moment.tz('2020-01-01 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2020-05-01 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2020-09-01 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2021-01-01 00:00', 'Europe/Zurich').valueOf(),
    ],
    minMarginRight: 100,
  },
  {
    id: '>2y',
    from: moment.tz('2019-10-01 18:33', 'Europe/Zurich').valueOf(),
    to: moment.tz('2022-03-23 15:14', 'Europe/Zurich').valueOf(),
    timezone: 'Europe/Zurich',
    expectedValues: [
      moment.tz('2020-01-01 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2020-07-01 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2021-01-01 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2021-07-01 00:00', 'Europe/Zurich').valueOf(),
      moment.tz('2022-01-01 00:00', 'Europe/Zurich').valueOf(),
    ],
    minMarginRight: 100,
  },
];

const props = {
  width: 1308,
  height: 360,
  from: 1569944216000,
  to: 1572303296000,
  timezone: 'Europe/Zurich',
  showTickLabels: true,
  strokeColor: '#e0e2e5',
  tickLabelColors: ['#979ca8', '#6b7282'],
  scale: scaleTime(testTimeRanges[0].from, testTimeRanges[0].to, 10, 1334, 'horizontal'),
};

const svgWrapper = (bar) => (
  <svg width="1334" height="320">
    {bar}
  </svg>
);

describe('<TimeXAxis />', () => {
  it('renders without crashing', () => {
    shallow(<TimeXAxis {...props} />);
  });

  it('displays the content', () => {
    const rendered = mount(svgWrapper(<TimeXAxis {...props} />));
    expect(rendered.find('.vx-group').length).toBeGreaterThan(0);
    expect(rendered.find('.vx-axis').length).toBeGreaterThan(0);
    expect(rendered.find('.vx-columns').length).toBeGreaterThan(0);
  });

  it('does not render grid', () => {
    const rendered = mount(svgWrapper(<TimeXAxis showGrid={false} {...props} />));
    expect(rendered.find('.vx-columns')).toHaveLength(0);
  });
});

describe('TickValues', () => {
  testTimeRanges.forEach((testTimeRange) => {
    it('calculates the correct tick values', () => {
      const scale = scaleTime(testTimeRange.from, testTimeRange.to, 0, 1334, 'horizontal');
      const result = getTickValues(testTimeRange.from, testTimeRange.to, testTimeRange.timezone, scale);
      expect(result).toStrictEqual(testTimeRange.expectedValues);
    });
  });
});
