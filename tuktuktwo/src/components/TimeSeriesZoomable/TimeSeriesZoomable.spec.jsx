import React from 'react';
import moment from 'moment-timezone';
import TimeSeriesZoomable, { minZoomRangeReached, getBoundedZoomInRange } from './TimeSeriesZoomable';

const zoomableProps = {
  width: 1308,
  height: 320,
  from: 1571646572000,  // 21/10/2019 10:29:32
  to: 1572254972000,  // 28/10/2019 10:29:32
  lowerBound: 1555835372000,  // 04/21/2019 10:29:32
  upperBound: 1587457772000,  // 04/21/2020 10:29:32
  minZoomRange: moment.duration({ minutes: 30 }).valueOf(),
  onZoom: () => {},
  timezone: 'Asia/Shanghai',
};

describe('<TimeSeriesZoomable />', () => {
  it('renders without crashing', () => {
    shallow(<TimeSeriesZoomable {...zoomableProps} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<TimeSeriesZoomable {...zoomableProps} />);
    expect(rendered.find('g').at(0).children().prop('width')).toBe(1308);
    expect(rendered.find('g').at(0).children().prop('height')).toBe(320);
    expect(rendered.find('g').at(0).children().prop('onDragStart')).toHaveLength(1);
    expect(rendered.find('g').at(0).children().prop('onDragEnd')).toHaveLength(1);
    expect(rendered.find('g').at(0).children().prop('resetOnStart')).toBe(true);
  });
});

describe('TimeZoomUtil', () => {
  it('correctly checks whether min zoom range has been reaches', () => {
    const result1 = minZoomRangeReached(zoomableProps.from, zoomableProps.to, zoomableProps.minZoomRange);

    const zoomedInFrom = 1571660972000;  // 21/10/2019 14:29:32
    const zoomedInTo = 1571662772000;  // 21/10/2019 14:59:32
    const result2 = minZoomRangeReached(zoomedInFrom, zoomedInTo, zoomableProps.minZoomRange);

    expect(result1).toBe(false);
    expect(result2).toBe(true);
  });

  it('bounds in zoom-in range', () => {
    const zoomedInFrom1 = 1571653772000;  // 21/10/2019 12:29:32
    const zoomedInTo1 = zoomedInFrom1 + moment.duration({ minutes: 10 }).valueOf();
    const result1 = getBoundedZoomInRange(zoomedInFrom1, zoomedInTo1, zoomableProps.minZoomRange, zoomableProps.lowerBound, zoomableProps.upperBound);

    const zoomedInFrom2 = zoomableProps.lowerBound + moment.duration({ minutes: 5 }).valueOf();
    const zoomedInTo2 = zoomedInFrom2 + moment.duration({ minutes: 10 }).valueOf();
    const result2 = getBoundedZoomInRange(zoomedInFrom2, zoomedInTo2, zoomableProps.minZoomRange, zoomableProps.lowerBound, zoomableProps.upperBound);

    const zoomedInTo3 = zoomableProps.upperBound - moment.duration({ minutes: 5 }).valueOf();
    const zoomedInFrom3 = zoomedInTo3 - moment.duration({ minutes: 10 }).valueOf();
    const result3 = getBoundedZoomInRange(zoomedInFrom3, zoomedInTo3, zoomableProps.minZoomRange, zoomableProps.lowerBound, zoomableProps.upperBound);

    expect(result1.from).toBe(zoomedInFrom1 - moment.duration({ minutes: 10 }).valueOf());
    expect(result1.to).toBe(zoomedInTo1 + moment.duration({ minutes: 10 }).valueOf());
    expect(result2.from).toBe(zoomableProps.lowerBound);
    expect(result2.to).toBe(zoomedInTo2 + moment.duration({ minutes: 15 }).valueOf());
    expect(result3.from).toBe(zoomedInFrom3 - moment.duration({ minutes: 15 }).valueOf())
    expect(result3.to).toBe(zoomableProps.upperBound);
  });
});
