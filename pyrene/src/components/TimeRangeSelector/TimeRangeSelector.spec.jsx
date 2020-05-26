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

const RWC_TIMEZONE = 'America/Los_Angeles';
const ZURICH_TIMEZONE = 'Europe/Zurich';
const dateFormat = 'DD.MM.YYYY, HH:mm';

let rendered;

const props = {
  timezone: RWC_TIMEZONE,
  lowerBound: moment().tz(RWC_TIMEZONE).subtract(90, 'days').valueOf(),
  from: moment().tz(RWC_TIMEZONE).subtract(30, 'days').valueOf(),
  to: moment().tz(RWC_TIMEZONE).valueOf(),
  upperBound: moment().tz(RWC_TIMEZONE).valueOf(),
  onChange: (from, to) => { rendered.setProps({ from: from, to: to }); },
  renderRightSection: renderRightSection,
};

const US_DST_START = {
  from: moment.tz('2020-03-09 02:59', RWC_TIMEZONE).subtract(24, 'hours').valueOf(),
  to: moment.tz('2020-03-09 02:59', RWC_TIMEZONE).valueOf(),
  lowerBound: moment.tz('2020-03-09 02:59', RWC_TIMEZONE).subtract(80, 'days').valueOf(),
  upperBound: moment.tz('2020-03-09 02:59', RWC_TIMEZONE).valueOf(),
};

const US_DST_END = {
  from: moment.tz('2020-11-01 01:59', RWC_TIMEZONE).valueOf(),
  to: moment.tz('2020-11-01 01:59', RWC_TIMEZONE).add(24, 'hours').valueOf(),
  lowerBound: moment.tz('2020-11-01 01:59', RWC_TIMEZONE).subtract(80, 'days').valueOf(),
  upperBound: moment.tz('2020-11-01 01:59', RWC_TIMEZONE).valueOf(),
};

const CH_DST_START = {
  from: moment.tz('2020-03-30 02:59', ZURICH_TIMEZONE).subtract(24, 'hours').valueOf(),
  to: moment.tz('2020-03-30 02:59', ZURICH_TIMEZONE).valueOf(),
  lowerBound: moment.tz('2020-03-30 02:59', ZURICH_TIMEZONE).subtract(80, 'days').valueOf(),
  upperBound: moment.tz('2020-03-30 02:59', ZURICH_TIMEZONE).valueOf(),
};

const CH_DST_END = {
  from: moment.tz('2020-10-25 02:59', ZURICH_TIMEZONE).valueOf(),
  to: moment.tz('2020-10-25 02:59', ZURICH_TIMEZONE).add(24, 'hours').valueOf(),
  lowerBound: moment.tz('2020-10-25 02:59', ZURICH_TIMEZONE).subtract(80, 'days').valueOf(),
  upperBound: moment.tz('2020-10-25 02:59', ZURICH_TIMEZONE).valueOf(),
};

const NO_DST_30_DAYS = {
  from: moment('2020-08-30').tz(RWC_TIMEZONE).subtract(30, 'days').valueOf(),
  to: moment('2020-08-30').tz(RWC_TIMEZONE).valueOf(),
  lowerBound: moment('2020-08-30').tz(RWC_TIMEZONE).subtract(80, 'days').valueOf(),
  upperBound: moment('2020-08-30').tz(RWC_TIMEZONE).valueOf(),
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

    const timeStringBeforeClick = `${moment(props.from).tz(RWC_TIMEZONE).format(dateFormat)} - ${moment(props.to).tz(RWC_TIMEZONE).format(dateFormat)}`;

    expect(rendered.find('PresetTimeRanges')).toHaveLength(1);
    let calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(timeStringBeforeClick === calculatedValue).toBeTruthy();
    // Assumes first clickable default preset is 24h
    rendered.find('.horizontalSwitch button').first().simulate('click');
    // We are simulating selecting the 24h preset
    const fromMoment = moment(props.to).tz(RWC_TIMEZONE).subtract(rendered.state().durationInMs);
    const toMoment = moment(props.to).tz(RWC_TIMEZONE);
    const timeStringAfterClick = `${fromMoment.format(dateFormat)} - ${toMoment.format(dateFormat)}`;

    calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(timeStringAfterClick === calculatedValue).toBeTruthy();
  });

  it('the initial values cannot exceed the defined bounds', () => {
    // The lowerbound is just one year, let's try to reduce the initialFrom value and check we are not exceeding it.
    // The upperbound is now, let's try to increase the initialTo value to 2 years from now and check we are not exceeding it.
    // The initial values are at the border of the bounds
    const outboundFrom = moment(props.from).tz(RWC_TIMEZONE).subtract(2, 'years').valueOf();
    const outboundTo = moment(props.from).tz(RWC_TIMEZONE).add(2, 'years').valueOf();
    rendered = mount(<TimeRangeSelector {...props} initialFrom={outboundFrom} initialTo={outboundTo} />);

    // We are simulating selecting the 24h preset
    const initialTimeString = `${moment(props.from).tz(RWC_TIMEZONE).format(dateFormat)} - ${moment(props.to).tz(RWC_TIMEZONE).format(dateFormat)}`;

    expect(rendered.find('PresetTimeRanges')).toHaveLength(1);
    const calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(initialTimeString === calculatedValue).toBeTruthy();
  });

  it('has steppers that are not changing the timerange if disabled', () => {
    rendered = mount(<TimeRangeSelector {...props} />);

    const timeStringBeforeClick = `${moment(props.from).tz(RWC_TIMEZONE).format(dateFormat)} - ${moment(props.to).tz(RWC_TIMEZONE).format(dateFormat)}`;
    rendered.find('TimeRangeNavigationBar').find('button').last().simulate('click');
    const calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(timeStringBeforeClick).toBe(calculatedValue);
  });

  it('has steppers that are changing the timerange if not disabled and are not exceeding the boundaries', () => {
    rendered = mount(<TimeRangeSelector {...props} />);
    rendered.find('.horizontalSwitch button').first().simulate('click');

    // Initial setup
    const fromMoment = moment(props.to).tz(RWC_TIMEZONE).subtract(rendered.state().durationInMs);
    const toMoment = moment(props.to).tz(RWC_TIMEZONE);
    const initialFromString = fromMoment.format(dateFormat);
    const upperBound = rendered.props().upperBound;

    // We are simulating selecting the 24h preset and going 1 day backwards
    const preset24Hours = `${fromMoment.format(dateFormat)} - ${toMoment.format(dateFormat)}`;
    const timeRange48to24HoursBack = `${fromMoment.subtract(rendered.state().durationInMs).format(dateFormat)} - ${toMoment.subtract(rendered.state().durationInMs).format(dateFormat)}`;

    rendered.find('TimeRangeNavigationBar').find('button').first().simulate('click');
    let calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(preset24Hours !== calculatedValue).toBeTruthy();
    expect(timeRange48to24HoursBack).toBe(calculatedValue);

    // Let's click forward two times, we should not exceed the upper bound
    rendered.find('TimeRangeNavigationBar').find('button').last().simulate('click');
    rendered.find('TimeRangeNavigationBar').find('button').last().simulate('click');
    calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(preset24Hours).toBe(calculatedValue);
    const upperBoundReachedString = `${initialFromString} - ${moment(upperBound).tz(RWC_TIMEZONE).format(dateFormat)}`;
    expect(calculatedValue).toBe(upperBoundReachedString);
  });

  it('has presets that are not exceeding the boundaries', () => {
    rendered = mount(<TimeRangeSelector {...props} />);

    const upperBound = rendered.props().upperBound;
    const lowerBound = rendered.props().lowerBound;
    const expectedBounds = `${moment(lowerBound).tz(RWC_TIMEZONE).format(dateFormat)} - ${moment(upperBound).tz(RWC_TIMEZONE).format(dateFormat)}`;

    rendered.find('.horizontalSwitch button').last().simulate('click'); // Switching to years, since the lowerbound is just 90 days should not go beyond that
    const calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(expectedBounds).toBe(calculatedValue);
  });

  it('preset timerange button has no highlight when no preset time range is detected', () => {
    // With DST changes, the actual duration in ms between the two dates would be more than 30 days, so we are choosing a date that does not have DST changes
    rendered = mount(<TimeRangeSelector {...props} from={NO_DST_30_DAYS.from} to={NO_DST_30_DAYS.to} lowerBound={NO_DST_30_DAYS.lowerBound} upperBound={NO_DST_30_DAYS.upperBound} />);
    expect(rendered.find('button.active').props().id).toBe('30d');

    rendered.setProps({ from: moment().tz(RWC_TIMEZONE).subtract(10, 'days').valueOf() });
    expect(rendered.find('button.active')).toHaveLength(0);
  });

  it('preserves timerange button highlight when updated internally by navigation', () => {
    // With DST changes, the actual duration in ms between the two dates would be more than 30 days, so we are choosing a date that does not have DST changes
    rendered = mount(<TimeRangeSelector {...props} from={NO_DST_30_DAYS.from} to={NO_DST_30_DAYS.to} lowerBound={NO_DST_30_DAYS.lowerBound} upperBound={NO_DST_30_DAYS.upperBound} />);
    expect(rendered.find('button.active').props().id).toBe('30d');
    rendered.find('.pyreneIcon-chevronLeft').simulate('click');
    rendered.find('.pyreneIcon-chevronLeft').simulate('click');
    rendered.find('.pyreneIcon-chevronLeft').simulate('click');
    expect(rendered.find('button.active').props().id).toBe('30d');
  });

  it('is consistent with DST start', () => {
    const usRendered = mount(<TimeRangeSelector {...props} timezone={RWC_TIMEZONE} from={US_DST_START.from} to={US_DST_START.to} lowerBound={US_DST_START.lowerBound} upperBound={US_DST_START.upperBound} />);
    const chRendered = mount(<TimeRangeSelector {...props} timezone={ZURICH_TIMEZONE} from={CH_DST_START.from} to={CH_DST_START.to} lowerBound={CH_DST_START.lowerBound} upperBound={CH_DST_START.upperBound} />);
    const usCalculatedValue = usRendered.find('.value').render()[0].children[0].data;
    const chCalculatedValue = chRendered.find('.value').render()[0].children[0].data;
    expect(usCalculatedValue).toBe('08.03.2020, 01:59 - 09.03.2020, 02:59');
    expect(chCalculatedValue).toBe('29.03.2020, 01:59 - 30.03.2020, 02:59');
  });

  it('is consistent with DST end', () => {
    const usRendered = mount(<TimeRangeSelector {...props} timezone={RWC_TIMEZONE} from={US_DST_END.from} to={US_DST_END.to} lowerBound={US_DST_END.lowerBound} upperBound={US_DST_END.upperBound} />);
    const chRendered = mount(<TimeRangeSelector {...props} timezone={ZURICH_TIMEZONE} from={CH_DST_END.from} to={CH_DST_END.to} lowerBound={CH_DST_END.lowerBound} upperBound={CH_DST_END.upperBound} />);
    const usCalculatedValue = usRendered.find('.value').render()[0].children[0].data;
    const chCalculatedValue = chRendered.find('.value').render()[0].children[0].data;
    expect(usCalculatedValue).toBe('01.11.2020, 01:59 - 02.11.2020, 00:59');
    expect(chCalculatedValue).toBe('25.10.2020, 02:59 - 26.10.2020, 01:59');
  });

});
