import React from 'react';

import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import momentTz from 'moment-timezone';
// eslint-disable-next-line no-unused-vars
import classNames from 'classnames';

import TimeRangeSelector from './TimeRangeSelector';

const fontStyle = {
  fontSize: '16px',
  color: 'blue',
  marginRight: '8px',
};

const textStyle = {
  fontSize: '13px',
  color: 'blue',
};

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
};

function renderRightSection() {
  return (
    <div style={wrapperStyle}>
      <span className="pyreneIcon-data" style={fontStyle} />
      <div style={textStyle}>Export</div>
    </div>
  );
}

const TIMEZONE = 'America/Los_Angeles';

const props = {
  timezone: TIMEZONE,
  lowerBound: moment().tz(TIMEZONE).subtract(1, 'years').valueOf(),
  initialFrom: moment().tz(TIMEZONE).subtract(1, 'years').valueOf(),
  initialTo: moment().tz(TIMEZONE).valueOf(),
  onChange: () => {},
  renderRightSection: renderRightSection,
};

describe('<TimeRangeSelector />', () => {
  it('renders without crashing', () => {
    shallow(<TimeRangeSelector {...props} />);
  });

  it('displays the content', () => {
    const rendered = shallow(<TimeRangeSelector {...props} />);
    expect(rendered.find('TimeRangeNavigationBar')).toHaveLength(1);
    expect(rendered.find('PresetTimeRanges')).toHaveLength(1);
    expect(rendered.find('PresetTimeRanges').render()[0].children.length === 4); // 4 default presets
    expect(rendered.find('.pyreneIcon-data')).toHaveLength(1); // The icon in the right element is rendered too
  });

  it('has clickable presets that change the timerange', () => {
    const rendered = mount(<TimeRangeSelector {...props} />);

    // We are simulating selecting the 24h preset
    const fromMoment = moment(props.initialTo).tz(TIMEZONE).subtract(1, 'days');
    const toMoment = moment(props.initialTo).tz(TIMEZONE);
    const dateFormat = 'DD.MM.YYYY, HH:mm';
    const timeStringBeforeClick = moment(props.initialFrom).tz(TIMEZONE).format(dateFormat) + ' - ' + moment(props.initialTo).tz(TIMEZONE).format(dateFormat);
    const timeStringAfterClick = fromMoment.format(dateFormat) + ' - ' + toMoment.format(dateFormat);

    expect(rendered.find('PresetTimeRanges')).toHaveLength(1);
    let calculatedValue = rendered.find('.timeRange').render()[0].children[0].data;
    expect(timeStringBeforeClick === calculatedValue).toBe(true);
    // Assumes first clickable default preset is 24h
    rendered.find('.presetTimeRange').first().simulate('click');
    calculatedValue = rendered.find('.timeRange').render()[0].children[0].data;
    expect(timeStringAfterClick === calculatedValue).toBe(true);
  });

  it('has steppers that are not changing the timerange if disabled', () => {
    const rendered = mount(<TimeRangeSelector {...props} />);

    const dateFormat = 'DD.MM.YYYY, HH:mm';
    const timeStringBeforeClick = moment(props.initialFrom).tz(TIMEZONE).format(dateFormat) + ' - ' + moment(props.initialTo).tz(TIMEZONE).format(dateFormat);
    rendered.find('TimeRangeNavigationBar').find('button').first().simulate('click');
    const calculatedValue = rendered.find('.timeRange').render()[0].children[0].data;
    expect(timeStringBeforeClick === calculatedValue).toBe(true);
  });

  it('has steppers that are changing the timerange if not disabled', () => {
    const rendered = mount(<TimeRangeSelector {...props} />);

    // We are simulating selecting the 24h preset and going 1 day backwards
    const fromMoment = moment(props.initialTo).tz(TIMEZONE).subtract(1, 'days');
    const toMoment = moment(props.initialTo).tz(TIMEZONE);
    const dateFormat = 'DD.MM.YYYY, HH:mm';
    const presetTimeRangeOneDay = fromMoment.format(dateFormat) + ' - ' + toMoment.format(dateFormat);
    const timeRangeTwoDaysBack = fromMoment.subtract(1, 'days').format(dateFormat) + ' - ' + toMoment.subtract(1, 'days').format(dateFormat);

    rendered.find('.presetTimeRange').first().simulate('click');
    rendered.find('TimeRangeNavigationBar').find('button').first().simulate('click');
    const calculatedValue = rendered.find('.timeRange').render()[0].children[0].data;
    expect(presetTimeRangeOneDay !== calculatedValue).toBe(true);
    expect(timeRangeTwoDaysBack === calculatedValue).toBe(true);
  });

});