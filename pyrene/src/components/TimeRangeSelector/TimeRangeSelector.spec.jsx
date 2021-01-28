import React from 'react';
import { mount, shallow } from 'enzyme';

import {
  getTime, subDays, subHours, addHours,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

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

let rendered;

// Using date-fns to create the timestamps
// getTime returns the timestamp in ms
// eveything can be replaced with the ms vlaue if needed
const props = {
  timezone: RWC_TIMEZONE,
  lowerBound: getTime(subDays(zonedTimeToUtc(new Date('1994-07-17 02:59'), RWC_TIMEZONE), 90)),
  from: getTime(subDays(zonedTimeToUtc(new Date('1994-07-17 02:59'), RWC_TIMEZONE), 30)),
  to: getTime(zonedTimeToUtc(new Date('1994-07-17 02:59'), RWC_TIMEZONE)),
  upperBound: getTime(zonedTimeToUtc(new Date('1994-07-17 02:59'), RWC_TIMEZONE)),
  onChange: (from, to) => { rendered.setProps({ from: from, to: to }); },
  renderRightSection: renderRightSection,
};

const US_DST_START = {
  from: getTime(subHours(zonedTimeToUtc(new Date('2020-03-09 02:59'), RWC_TIMEZONE), 24)),
  to: getTime(zonedTimeToUtc(new Date('2020-03-09 02:59'), RWC_TIMEZONE)),
  lowerBound: getTime(subDays(zonedTimeToUtc(new Date('2020-03-09 02:59'), RWC_TIMEZONE), 80)),
  upperBound: getTime(zonedTimeToUtc(new Date('2020-03-09 02:59'), RWC_TIMEZONE)),
};

const US_DST_END = {
  from: getTime(zonedTimeToUtc(new Date('2020-11-01 01:59'), RWC_TIMEZONE)),
  to: getTime(addHours(zonedTimeToUtc(new Date('2020-11-01 01:59'), RWC_TIMEZONE), 24)),
  lowerBound: getTime(subDays(zonedTimeToUtc(new Date('2020-11-01 01:59'), RWC_TIMEZONE), 80)),
  upperBound: getTime(zonedTimeToUtc(new Date('2020-11-01 01:59'), RWC_TIMEZONE)),
};

const CH_DST_START = {
  from: getTime(subHours(zonedTimeToUtc(new Date('2020-03-30 02:59'), ZURICH_TIMEZONE), 24)),
  to: getTime(zonedTimeToUtc(new Date('2020-03-30 02:59'), ZURICH_TIMEZONE)),
  lowerBound: getTime(subDays(zonedTimeToUtc(new Date('2020-03-30 02:59'), ZURICH_TIMEZONE), 80)),
  upperBound: getTime(zonedTimeToUtc(new Date('2020-03-30 02:59'), ZURICH_TIMEZONE)),
};

const CH_DST_END = {
  from: getTime(zonedTimeToUtc(new Date('2020-10-25 02:59'), ZURICH_TIMEZONE)),
  to: getTime(addHours(zonedTimeToUtc(new Date('2020-10-25 02:59'), ZURICH_TIMEZONE), 24)),
  lowerBound: getTime(subDays(zonedTimeToUtc(new Date('2020-10-25 02:59'), ZURICH_TIMEZONE), 80)),
  upperBound: getTime(zonedTimeToUtc(new Date('2020-10-25 02:59'), ZURICH_TIMEZONE)),
};

const NO_DST_30_DAYS = {
  from: getTime(subDays(zonedTimeToUtc(new Date('2020-08-30'), RWC_TIMEZONE), 30)),
  to: getTime(zonedTimeToUtc(new Date('2020-08-30'), RWC_TIMEZONE)),
  lowerBound: getTime(subDays(zonedTimeToUtc(new Date('2020-08-30'), RWC_TIMEZONE), 80)),
  upperBound: getTime(zonedTimeToUtc(new Date('2020-08-30'), RWC_TIMEZONE)),
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

    expect(rendered.find('PresetTimeRanges')).toHaveLength(1);

    // Check that correct values are set
    let calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(calculatedValue).toEqual('17.06.1994, 02:59 - 17.07.1994, 02:59');


    // Assumes first clickable default preset is 24h
    rendered.find('.toggleButtonGroup button').first().simulate('click');

    calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(calculatedValue).toEqual('16.07.1994, 02:59 - 17.07.1994, 02:59');
  });

  // it('the initial values cannot exceed the defined bounds', () => {
  //   // The initial values are at the border of the bounds
  //   const localProps = {
  //     ...props,
  //     lowerBound: getTime(zonedTimeToUtc(new Date('1994-07-17 17:00'), RWC_TIMEZONE)),
  //     from: getTime(zonedTimeToUtc(new Date('1994-07-16 18:00'), RWC_TIMEZONE)),
  //     to: getTime(zonedTimeToUtc(new Date('1994-07-19 02:59'), RWC_TIMEZONE)),
  //     upperBound: getTime(zonedTimeToUtc(new Date('1994-07-18 02:59'), RWC_TIMEZONE)),
  //   };

  //   rendered = mount(<TimeRangeSelector {...localProps} />);

  //   // We are simulating selecting the 24h preset
  //   expect(rendered.find('PresetTimeRanges')).toHaveLength(1);
  //   const calculatedValue = rendered.find('.value').render()[0].children[0].data;
  //   //  value should be set to the lowerBound/upperBound
  //   expect(calculatedValue).toEqual('17.06.1994, 17:00 - 18.07.1994, 02:59');
  // });

  //   it('the initial values cannot exceed the defined bounds', () => {
  //   // The lowerbound is just one year, let's try to reduce the initialFrom value and check we are not exceeding it.
  //   // The upperbound is now, let's try to increase the initialTo value to 2 years from now and check we are not exceeding it.
  //   // The initial values are at the border of the bounds
  //   const outboundFrom = moment(props.from).tz(RWC_TIMEZONE).subtract(2, 'years').valueOf();
  //   const outboundTo = moment(props.from).tz(RWC_TIMEZONE).add(2, 'years').valueOf();
  //   rendered = mount(<TimeRangeSelector {...props} initialFrom={outboundFrom} initialTo={outboundTo} />);

  //   // We are simulating selecting the 24h preset
  //   const initialTimeString = `${moment(props.from).tz(RWC_TIMEZONE).format(dateFormat)} - ${moment(props.to).tz(RWC_TIMEZONE).format(dateFormat)}`;

  //   expect(rendered.find('PresetTimeRanges')).toHaveLength(1);
  //   const calculatedValue = rendered.find('.value').render()[0].children[0].data;
  //   expect(initialTimeString === calculatedValue).toBeTruthy();
  // });

  it('has steppers that do not change the timerange if disabled', () => {
    rendered = mount(<TimeRangeSelector {...props} />);

    rendered.find('TimeRangeNavigationBar').find('button').last().simulate('click');
    const calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(calculatedValue).toBe('17.06.1994, 02:59 - 17.07.1994, 02:59');
  });

  it('has steppers that change the timerange if not disabled and do not exceed the boundaries', () => {
    const localProps = {
      ...props,
      timezone: ZURICH_TIMEZONE,
      lowerBound: getTime(zonedTimeToUtc(new Date('1994-07-16 17:00'), ZURICH_TIMEZONE)),
      from: getTime(zonedTimeToUtc(new Date('1994-07-16 18:00'), ZURICH_TIMEZONE)),
      to: getTime(zonedTimeToUtc(new Date('1994-07-17 02:59'), ZURICH_TIMEZONE)),
      upperBound: getTime(zonedTimeToUtc(new Date('1994-07-25 03:59'), ZURICH_TIMEZONE)),
    };

    rendered = mount(<TimeRangeSelector {...localProps} />);

    let calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(calculatedValue).toEqual('16.07.1994, 18:00 - 17.07.1994, 02:59');

    // 24h
    rendered.find('.toggleButtonGroup button').first().simulate('click');
    calculatedValue = rendered.find('.value').render()[0].children[0].data;
    //  doing this seems to set the to value to the upperBound value
    //  and the from value to upperBound - 24h
    //  that is also what happens when testing it in pyrene
    //  is that intended?
    expect(calculatedValue).toEqual('24.07.1994, 03:59 - 25.07.1994, 03:59');

    // left
    rendered.find('TimeRangeNavigationBar').find('button').first().simulate('click');
    calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(calculatedValue).toBe('23.07.1994, 03:59 - 24.07.1994, 03:59');
    // left
    rendered.find('TimeRangeNavigationBar').find('button').first().simulate('click');
    calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(calculatedValue).toBe('22.07.1994, 03:59 - 23.07.1994, 03:59');

    // Let's click forward three times, we should not exceed the upper bound
    // right
    rendered.find('TimeRangeNavigationBar').find('button').last().simulate('click');
    calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(calculatedValue).toBe('23.07.1994, 03:59 - 24.07.1994, 03:59');
    rendered.find('TimeRangeNavigationBar').find('button').last().simulate('click');
    calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(calculatedValue).toBe('24.07.1994, 03:59 - 25.07.1994, 03:59');
    rendered.find('TimeRangeNavigationBar').find('button').last().simulate('click');
    calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(calculatedValue).toBe('24.07.1994, 03:59 - 25.07.1994, 03:59');
  });

  it('has presets do not exceed the boundaries', () => {
    rendered = mount(<TimeRangeSelector {...props} />);

    // Switching to years, since the lowerbound is just 90 days should not go beyond that
    rendered.find('.toggleButtonGroup button').last().simulate('click');

    const calculatedValue = rendered.find('.value').render()[0].children[0].data;
    expect(calculatedValue).toBe('18.04.1994, 02:59 - 17.07.1994, 02:59');
  });

  it('preset timerange button has no highlight when no preset time range is detected', () => {
    // With DST changes, the actual duration in ms between the two dates would be more than 30 days, so we are choosing a date that does not have DST changes
    rendered = mount(<TimeRangeSelector {...props} from={NO_DST_30_DAYS.from} to={NO_DST_30_DAYS.to} lowerBound={NO_DST_30_DAYS.lowerBound} upperBound={NO_DST_30_DAYS.upperBound} />);
    expect(rendered.find('button.active').props().id).toBe('30d');

    // add 1 ms so that it is no longer in the range
    rendered.setProps({ from: NO_DST_30_DAYS.from + 1 });
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
    expect(chCalculatedValue).toBe('25.10.2020, 02:59 - 26.10.2020, 02:59');
  });

});
