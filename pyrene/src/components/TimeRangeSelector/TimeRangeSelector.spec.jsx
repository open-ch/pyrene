import React from 'react';

import moment from 'moment-timezone';
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

let rendered;

const props = {
  timezone: TIMEZONE,
  lowerBound: moment().tz(TIMEZONE).subtract(1, 'years').valueOf(),
  from: moment().tz(TIMEZONE).subtract(1, 'years').valueOf(),
  to: moment().tz(TIMEZONE).valueOf(),
  upperBound: moment().tz(TIMEZONE).valueOf(),
  onChange: (from, to) => { rendered.setProps({ from: from, to: to }); },
  renderRightSection: renderRightSection,
};

describe('<TimeRangeSelector />', () => {
  it('renders without crashing', () => {
    shallow(<TimeRangeSelector {...props} />);
  });

  it('displays the content', () => {
    rendered = shallow(<TimeRangeSelector {...props} />);
    expect(rendered.find('TimeRangeNavigationBar')).toHaveLength(1);
    expect(rendered.find('PresetTimeRanges')).toHaveLength(1);
    expect(rendered.find('PresetTimeRanges').render()[0].children).toHaveLength(4); // 4 default presets
    expect(rendered.find('.pyreneIcon-data')).toHaveLength(1); // The icon in the right element is rendered too
  });

  it('has clickable presets that change the timerange', () => {
    rendered = mount(<TimeRangeSelector {...props} />);

    // We are simulating selecting the 24h preset
    const fromMoment = moment(props.to).tz(TIMEZONE).subtract(1, 'days');
    const toMoment = moment(props.to).tz(TIMEZONE);
    const dateFormat = 'DD.MM.YYYY, HH:mm';
    const timeStringBeforeClick = `${moment(props.from).tz(TIMEZONE).format(dateFormat)} - ${moment(props.to).tz(TIMEZONE).format(dateFormat)}`;
    const timeStringAfterClick = `${fromMoment.format(dateFormat)} - ${toMoment.format(dateFormat)}`;

    expect(rendered.find('PresetTimeRanges')).toHaveLength(1);
    let calculatedValue = rendered.find('.timeRange').render()[0].children[0].data;
    expect(timeStringBeforeClick === calculatedValue).toBe(true);
    // Assumes first clickable default preset is 24h
    rendered.find('.presetTimeRange').first().simulate('click');
    calculatedValue = rendered.find('.timeRange').render()[0].children[0].data;
    expect(timeStringAfterClick === calculatedValue).toBe(true);
  });

  it('the initial values cannot exceed the defined bounds', () => {
    // The lowerbound is just one year, let's try to reduce the initialFrom value and check we are not exceeding it.
    // The upperbound is now, let's try to increase the initialTo value to 2 years from now and check we are not exceeding it.
    // The initial values are at the border of the bounds
    const outboundFrom = moment(props.from).tz(TIMEZONE).subtract(2, 'years').valueOf();
    const outboundTo = moment(props.from).tz(TIMEZONE).add(2, 'years').valueOf();
    rendered = mount(<TimeRangeSelector {...props} initialFrom={outboundFrom} initialTo={outboundTo} />);

    // We are simulating selecting the 24h preset
    const dateFormat = 'DD.MM.YYYY, HH:mm';
    const initialTimeString = `${moment(props.from).tz(TIMEZONE).format(dateFormat)} - ${moment(props.to).tz(TIMEZONE).format(dateFormat)}`;

    expect(rendered.find('PresetTimeRanges')).toHaveLength(1);
    const calculatedValue = rendered.find('.timeRange').render()[0].children[0].data;
    expect(initialTimeString === calculatedValue).toBe(true);
  });

  it('has steppers that are not changing the timerange if disabled', () => {
    rendered = mount(<TimeRangeSelector {...props} />);

    const dateFormat = 'DD.MM.YYYY, HH:mm';
    const timeStringBeforeClick = `${moment(props.from).tz(TIMEZONE).format(dateFormat)} - ${moment(props.to).tz(TIMEZONE).format(dateFormat)}`;
    rendered.find('TimeRangeNavigationBar').find('button').first().simulate('click');
    const calculatedValue = rendered.find('.timeRange').render()[0].children[0].data;
    expect(timeStringBeforeClick === calculatedValue).toBe(true);
  });

  // Jira : MC-17563
  // it('has steppers that are changing the timerange if not disabled and are not exceeding the boundaries', () => {
  //   rendered = mount(<TimeRangeSelector {...props} />);

  //   // Initial setup
  //   const fromMoment = moment(props.to).tz(TIMEZONE).subtract(1, 'days');
  //   const toMoment = moment(props.to).tz(TIMEZONE);
  //   const dateFormat = 'DD.MM.YYYY, HH:mm';
  //   const initialFromString = fromMoment.format(dateFormat);

  //   // We are simulating selecting the 24h preset and going 1 day backwards
  //   const preset24Hours = fromMoment.format(dateFormat) + ' - ' + toMoment.format(dateFormat);
  //   const timeRange48to24HoursBack = fromMoment.subtract(1, 'days').format(dateFormat) + ' - ' + toMoment.subtract(1, 'days').format(dateFormat);

  //   rendered.find('.presetTimeRange').first().simulate('click');
  //   rendered.find('TimeRangeNavigationBar').find('button').first().simulate('click');
  //   let calculatedValue = rendered.find('.timeRange').render()[0].children[0].data;
  //   expect(preset24Hours !== calculatedValue).toBe(true);
  //   expect(timeRange48to24HoursBack === calculatedValue).toBe(true);

  //   // Let's click forward two times, we should not exceed the upper bound
  //   rendered.find('TimeRangeNavigationBar').find('button').last().simulate('click');
  //   rendered.find('TimeRangeNavigationBar').find('button').last().simulate('click');
  //   calculatedValue = rendered.find('.timeRange').render()[0].children[0].data;
  //   expect(preset24Hours === calculatedValue).toBe(true);
  //   const upperBoundReachedString = initialFromString + ' - ' + moment(rendered.state('upperBound')).tz(TIMEZONE).format(dateFormat);
  //   expect(calculatedValue === upperBoundReachedString).toBe(true);
  // });

});
