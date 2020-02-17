import React from 'react';
import moment from 'moment-timezone';
import { Banner, Loader } from 'pyrene';
import { chartConstants, scaleTime } from 'tuktuktwo';
import TimeSeriesBucketChart from './TimeSeriesBucketChart';
import { getSITickValueForTimeRange, getSIUnitForTimeRange, INDEX_START_TS } from '../..';
import { getCurrentBucketEndTS, getCurrentBucketIndex, getTimeFrameOfLastBucket } from './bucketUtil';
import timeSeriesData from '../../examples/timeSeriesData';
import colorSchemes from '../../styles/colorSchemes';

const fullBucketSeries = timeSeriesData.genDownloadedVolumes(moment.tz('2019-10-01 00:00', 'Europe/Zurich').valueOf(), moment.tz('2019-10-03 12:00', 'Europe/Zurich').valueOf(), 24);
const singleBucketSeries = timeSeriesData.genDownloadedVolumes(moment.tz('2019-10-02 00:00', 'Europe/Zurich').valueOf(), moment.tz('2019-10-02 02:00', 'Europe/Zurich').valueOf(), 1);
const zeroBucketSeries = { label: 'Volume', data: [] };

const props = {
  data: fullBucketSeries,
  description: 'Downloaded volume',
  from: moment.tz('2019-10-01 00:00', 'Europe/Zurich').valueOf(),
  tickFormat: (value) => getSITickValueForTimeRange(value, fullBucketSeries, moment.tz('2019-10-01 00:00', 'Europe/Zurich').valueOf(), moment.tz('2019-10-03 12:00', 'Europe/Zurich').valueOf(), true),
  title: 'Volume',
  timezone: 'Europe/Zurich',
  to: moment.tz('2019-10-03 12:00', 'Europe/Zurich').valueOf(),
  tooltipFormat: (d) => d,
  timeFormat: (d) => `${d}`,
  unit: getSIUnitForTimeRange(fullBucketSeries, moment.tz('2019-10-01 00:00', 'Europe/Zurich').valueOf(), moment.tz('2019-10-03 12:00', 'Europe/Zurich').valueOf(), 'B', true),
};

const propsSingleBar = {
  data: singleBucketSeries,
  description: 'Downloaded volume',
  from: moment.tz('2019-10-01 00:00', 'Europe/Zurich').valueOf(),
  title: 'Volume',
  timezone: 'Europe/Zurich',
  to: moment.tz('2019-10-03 12:00', 'Europe/Zurich').valueOf(),
  timeFormat: (d) => `${d}`,
};

const propsZeroBar = {
  data: zeroBucketSeries,
  description: 'Downloaded volume',
  from: moment.tz('2019-10-01 00:00', 'Europe/Zurich').valueOf(),
  loading: false,
  timezone: 'Europe/Zurich',
  title: 'Volume',
  to: moment.tz('2019-10-03 12:00', 'Europe/Zurich').valueOf(),
  timeFormat: (d) => `${d}`,
};

const propsZeroBarLoading = {
  data: zeroBucketSeries,
  description: 'Downloaded volume',
  from: moment.tz('2019-10-01 00:00', 'Europe/Zurich').valueOf(),
  loading: true,
  timezone: 'Europe/Zurich',
  title: 'Volume',
  to: moment.tz('2019-10-03 12:00', 'Europe/Zurich').valueOf(),
  timeFormat: (d) => `${d}`,
};

const propsZeroBarError = {
  data: zeroBucketSeries,
  description: 'Downloaded volume',
  error: 'No data is found',
  from: moment.tz('2019-10-01 00:00', 'Europe/Zurich').valueOf(),
  loading: false,
  timezone: 'Europe/Zurich',
  title: 'Volume',
  to: moment.tz('2019-10-03 12:00', 'Europe/Zurich').valueOf(),
  timeFormat: (d) => `${d}`,
};

describe('<TimeSeriesBucketChart />', () => {
  it('renders without crashing', () => {
    shallow(<TimeSeriesBucketChart {...props} />);
  });

  it('renders its content correctly', () => {
    const rendered = mount(<TimeSeriesBucketChart {...props} />);
    const renderedSingleBar = mount(<TimeSeriesBucketChart {...propsSingleBar} />);

    // Header
    expect(rendered.contains(props.title)).toBe(true);
    expect(rendered.contains(props.description)).toBe(true);

    // Numerical Y-Axis
    const yAxis = rendered.find('.vx-axis-left');
    expect(yAxis.children().find('.vx-axis-line').length).toBeGreaterThan(0);
    expect(yAxis.children().find('.vx-axis-tick').length).toBeGreaterThan(0);

    // Unit
    const unit = rendered.find('.unitContainer');
    expect(unit.text()).toBe('kB');

    // Time X-Axis
    const xAxis = rendered.find('.vx-axis-bottom');
    expect(xAxis.children().find('.vx-axis-line').length).toBeGreaterThan(0);
    expect(xAxis.children().find('.vx-axis-tick').length).toBeGreaterThan(0);

    // Bars
    expect(rendered.find('.vx-bar')).toHaveLength(props.data.data.length);
    expect(renderedSingleBar.find('.vx-bar')).toHaveLength(propsSingleBar.data.data.length);
    expect(rendered.find('.vx-bar').at(0).props().fill).toBe(colorSchemes.colorSchemeDefault.categorical[0]);
  });

  it('zooms correctly', () => {
    const zoom = {
      lowerBound: moment.tz('2018-10-01 00:00', 'Europe/Zurich').valueOf(),
      minZoomRange: moment.duration({ minutes: 30 }).valueOf(),
      onZoom: jest.fn(),
      upperBound: moment.tz('2020-10-01 00:00', 'Europe/Zurich').valueOf(),
    };

    // Zoom buttons
    const rendered = mount(<TimeSeriesBucketChart {...props} zoom={zoom} />);
    const zoomInBtn = rendered.find('.pyreneIcon-zoomIn');
    const zoomOutBtn = rendered.find('.pyreneIcon-zoomOut');
    zoomInBtn.simulate('click');
    zoomOutBtn.simulate('click');
    expect(zoom.onZoom).toHaveBeenCalledTimes(2);

    // Zoomable component
    const dragArea = rendered.find('.dragArea');
    expect(dragArea).toHaveLength(1);
    dragArea.simulate('mouseover').simulate('mouseup');
    expect(zoom.onZoom).toHaveBeenCalledTimes(3);
  });

  it('renders loading state correctly', () => {
    const rendered = mount(<TimeSeriesBucketChart {...propsZeroBarLoading} />);

    expect(rendered.contains(propsZeroBarLoading.title)).toBe(true);
    expect(rendered.contains(propsZeroBarLoading.description)).toBe(true);
    expect(rendered.find('.vx-bar')).toHaveLength(0);
    expect(rendered.find('.vx-axis-line').length).toBeGreaterThan(0);
    expect(rendered.find('.vx-axis-tick')).toHaveLength(0);
    expect(rendered.find(Loader).exists()).toBe(true);
  });

  it('renders error message correctly', () => {
    const rendered = mount(<TimeSeriesBucketChart {...propsZeroBarError} />);

    expect(rendered.contains(propsZeroBarError.title)).toBe(true);
    expect(rendered.contains(propsZeroBarError.description)).toBe(true);
    expect(rendered.find('.vx-bar')).toHaveLength(0);
    expect(rendered.find('.vx-axis-line').length).toBeGreaterThan(0);
    expect(rendered.find('.vx-axis-tick')).toHaveLength(0);
    expect(rendered.find(Banner).exists()).toBe(true);
  });

  // Tooltip related
  it('has no hover area or tooltip when there is no bar', () => {
    const rendered = mount(<TimeSeriesBucketChart {...propsZeroBar} />);
    const hoverArea = rendered.find('.hoverArea');
    expect(hoverArea).toHaveLength(0);
  });

  it('gets the time frame for last bucket', () => {
    const parentWidth = 76;
    const xScaleFullBuckets = scaleTime(moment.tz('2019-10-01 00:00', 'Europe/Zurich').valueOf(), moment.tz('2019-10-03 12:00', 'Europe/Zurich').valueOf(), chartConstants.marginLeftNumerical, parentWidth, 'horizontal');
    const xScaleSingleBucket = scaleTime(moment.tz('2019-10-02 00:00', 'Europe/Zurich').valueOf(), moment.tz('2019-10-02 02:00', 'Europe/Zurich').valueOf(), chartConstants.marginLeftNumerical, parentWidth, 'horizontal');

    const lastBucketTimeFrameFull = getTimeFrameOfLastBucket(fullBucketSeries.data, xScaleFullBuckets);
    const lastBucketTimeFrameSingle = getTimeFrameOfLastBucket(singleBucketSeries.data, xScaleSingleBucket);

    expect(lastBucketTimeFrameFull).toBe(moment.duration(2.5, 'hours').valueOf());
    expect(lastBucketTimeFrameSingle).toBe(moment.duration(0.5, 'hours').valueOf());
  });

  it('calculates the index of the currently hovered-over bucket', () => {
    const parentWidth = 76;
    const xScaleFullBuckets = scaleTime(moment.tz('2019-10-01 00:00', 'Europe/Zurich').valueOf(), moment.tz('2019-10-03 12:00', 'Europe/Zurich').valueOf(), chartConstants.marginLeftNumerical, parentWidth, 'horizontal');
    const xScaleSingleBucket = scaleTime(moment.tz('2019-10-02 00:00', 'Europe/Zurich').valueOf(), moment.tz('2019-10-02 02:00', 'Europe/Zurich').valueOf(), chartConstants.marginLeftNumerical, parentWidth, 'horizontal');

    const lastBucketTimeFrameFull = getTimeFrameOfLastBucket(fullBucketSeries.data, xScaleFullBuckets);
    const lastBucketTimeFrameSingle = getTimeFrameOfLastBucket(singleBucketSeries.data, xScaleSingleBucket);

    // Full bucket series
    const lastBucketEndTS = fullBucketSeries.data[fullBucketSeries.data.length - 1][INDEX_START_TS] + lastBucketTimeFrameFull;
    const tsBegin = fullBucketSeries.data[0][INDEX_START_TS];
    const tsEnd = moment.tz('2019-10-03 12:00', 'Europe/Zurich').valueOf();
    const tsOutOfRangeBefore = moment.tz('2019-09-30 23:59', 'Europe/Zurich').valueOf();
    const tsOutOfRangeAfter = moment.tz('2019-10-03 12:01', 'Europe/Zurich').valueOf();
    const tsInRange = moment.tz('2019-10-01 00:01', 'Europe/Zurich').valueOf();

    expect(getCurrentBucketIndex(tsBegin, lastBucketEndTS, fullBucketSeries.data)).toBe(0);
    expect(getCurrentBucketIndex(tsEnd, lastBucketEndTS, fullBucketSeries.data)).toBe(fullBucketSeries.data.length - 1);
    expect(getCurrentBucketIndex(tsOutOfRangeBefore, lastBucketEndTS, fullBucketSeries.data)).toBe(-1);
    expect(getCurrentBucketIndex(tsOutOfRangeAfter, lastBucketEndTS, fullBucketSeries.data)).toBe(-1);
    expect(getCurrentBucketIndex(tsInRange, lastBucketEndTS, fullBucketSeries.data)).toBe(0);

    // Single bucket
    const singleBucketBegin = singleBucketSeries.data[0][INDEX_START_TS];
    const singleBucketEnd = singleBucketSeries.data[0][INDEX_START_TS] + lastBucketTimeFrameSingle;

    expect(getCurrentBucketIndex(singleBucketBegin, singleBucketEnd, singleBucketSeries.data)).toBe(0);
    expect(getCurrentBucketIndex(singleBucketEnd, singleBucketEnd, singleBucketSeries.data)).toBe(0);
    expect(getCurrentBucketIndex(singleBucketBegin - 1, singleBucketEnd, singleBucketSeries.data)).toBe(-1);
    expect(getCurrentBucketIndex(singleBucketEnd + 1, singleBucketEnd, singleBucketSeries.data)).toBe(-1);
    expect(getCurrentBucketIndex(singleBucketBegin + 1, singleBucketEnd, singleBucketSeries.data)).toBe(0);
  });

  it('gets the end TS for the current bucket', () => {
    const parentWidth = 76;
    const xScaleFullBuckets = scaleTime(moment.tz('2019-10-01 00:00', 'Europe/Zurich').valueOf(), moment.tz('2019-10-03 12:00', 'Europe/Zurich').valueOf(), chartConstants.marginLeftNumerical, parentWidth, 'horizontal');
    const xScaleSingleBucket = scaleTime(moment.tz('2019-10-02 00:00', 'Europe/Zurich').valueOf(), moment.tz('2019-10-02 02:00', 'Europe/Zurich').valueOf(), chartConstants.marginLeftNumerical, parentWidth, 'horizontal');

    const lastBucketEndTS = fullBucketSeries.data[fullBucketSeries.data.length - 1][INDEX_START_TS] + getTimeFrameOfLastBucket(fullBucketSeries.data, xScaleFullBuckets);
    const lastBucketEndTSSingle = singleBucketSeries.data[0][INDEX_START_TS] + getTimeFrameOfLastBucket(singleBucketSeries.data, xScaleSingleBucket);

    expect(getCurrentBucketEndTS(0, lastBucketEndTS, fullBucketSeries.data)).toBe(fullBucketSeries.data[1][INDEX_START_TS]);
    expect(getCurrentBucketEndTS(1, lastBucketEndTS, fullBucketSeries.data)).toBe(fullBucketSeries.data[2][INDEX_START_TS]);
    expect(getCurrentBucketEndTS(fullBucketSeries.data.length - 1, lastBucketEndTS, fullBucketSeries.data)).toBe(lastBucketEndTS);
    expect(getCurrentBucketEndTS(0, lastBucketEndTSSingle, singleBucketSeries.data)).toBe(lastBucketEndTSSingle);
  });

});
