import React from 'react';
import moment from 'moment-timezone';
import TimeSeriesZoomable, { minZoomRangeReached, getBoundedZoomInRange } from './TimeSeriesZoomable';
import { scaleTime } from '../../common/ScaleUtils';
import chartConstants from '../../common/chartConstants';

const from = moment('2019-10-21 10:29').valueOf();
const to = moment('2019-10-28 10:29').valueOf();

const parentSize = {
  height: 344,
  width: 1308,
};

const zoomableProps = {
  width: parentSize.width,
  height: parentSize.height,
  from: from,
  to: to,
  lowerBound: moment('2019-04-21 10:29').valueOf(),
  upperBound: moment('2020-04-21 10:29').valueOf(),
  minZoomRange: moment.duration({ minutes: 30 }).valueOf(),
  onZoom: () => {},
  tooltipFormat: (d) => d,
  color: '#ff0000',
  scale: scaleTime(from, to, 10, parentSize.width, 'horizontal'),
};

describe('<TimeSeriesZoomable />', () => {
  it('renders without crashing', () => {
    shallow(<TimeSeriesZoomable {...zoomableProps} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<TimeSeriesZoomable {...zoomableProps} />);
    expect(rendered.find('g').at(0).children().prop('width')).toBe(zoomableProps.width - chartConstants.marginLeftNumerical);
    expect(rendered.find('g').at(0).children().prop('height')).toBe(zoomableProps.height - chartConstants.marginBottom);
    expect(rendered.find('g').at(0).children().prop('onDragStart')).toHaveLength(1);
    expect(rendered.find('g').at(0).children().prop('onDragEnd')).toHaveLength(1);
    expect(rendered.find('g').at(0).children().prop('resetOnStart')).toBe(true);
  });
});

describe('ZoomRange', () => {
  it('correctly checks whether min zoom range has been reaches', () => {
    const result1 = minZoomRangeReached(zoomableProps.from, zoomableProps.to, zoomableProps.minZoomRange);

    const zoomedInFrom = moment('2019-10-21 14:29').valueOf();
    const zoomedInTo = moment('2019-10-21 14:59').valueOf();
    const result2 = minZoomRangeReached(zoomedInFrom, zoomedInTo, zoomableProps.minZoomRange);

    expect(result1).toBe(false);
    expect(result2).toBe(true);
  });

  it('bounds in zoom-in range', () => {
    const zoomedInFrom1 = moment('2019-10-21 12:29').valueOf();
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
    expect(result3.from).toBe(zoomedInFrom3 - moment.duration({ minutes: 15 }).valueOf());
    expect(result3.to).toBe(zoomableProps.upperBound);
  });
});
