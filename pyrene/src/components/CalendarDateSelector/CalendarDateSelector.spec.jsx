import React from 'react';

import moment from 'moment-timezone';
import DateHelper from './DateHelper';
// eslint-disable-next-line no-unused-vars

import CalendarDateSelector from './CalendarDateSelector';

let rendered;

const props = {
  onChange: (value) => { rendered.setProps({ value: value }); },
};

describe('<CalendarDateSelector />', () => {
  it('renders without crashing', () => {
    shallow(<CalendarDateSelector {...props} />);
  });

  it('displays the content', () => {
    rendered = shallow(<CalendarDateSelector {...props} />);
    expect(rendered.find('TimeRangeSelectionBar')).toHaveLength(1);
    expect(rendered.find('TimeRangeSelectionDropdown')).toHaveLength(1);
  });

  it('has a dropdown that changes the timerange and keeps the full date status', () => {
    rendered = mount(<CalendarDateSelector {...props} />);

    // We are simulating selecting the 24h preset
    const currentDate = moment().tz('utc');
    const timeStringBeforeClick = currentDate.format(DateHelper.MONTH_NAME_WITH_YEAR);
    let timeStringAfterClick = currentDate.format(DateHelper.FULL_DATE);

    expect(rendered.find('.timeRangeSelector--timerange-text')).toHaveLength(1);

    let calculatedValue = rendered.find('.timeRangeSelector--timerange-text').render()[0].children[0].data;
    expect(timeStringBeforeClick === calculatedValue).toBe(true);

    rendered.find('Select').props().onChange({ value: 'day' });
    calculatedValue = rendered.find('.timeRangeSelector--timerange-text').render()[0].children[0].data;
    expect(timeStringAfterClick === calculatedValue).toBe(true);

    timeStringAfterClick = currentDate.format(DateHelper.YEAR);
    rendered.find('Select').props().onChange({ value: 'year' });
    calculatedValue = rendered.find('.timeRangeSelector--timerange-text').render()[0].children[0].data;
    expect(timeStringAfterClick === calculatedValue).toBe(true);
  });

  it('has steppers that are changing the timerange', () => {
    rendered = mount(<CalendarDateSelector {...props} />);

    // We are simulating selecting the 24h preset
    const currentDate = moment().tz('utc');
    const timeStringBeforeClick = currentDate.format(DateHelper.MONTH_NAME_WITH_YEAR);
    let timeStringAfterClick = currentDate.add(-1, 'month').format(DateHelper.MONTH_NAME_WITH_YEAR);

    expect(rendered.find('.timeRangeSelector--timerange-text')).toHaveLength(1);

    let calculatedValue = rendered.find('.timeRangeSelector--timerange-text').render()[0].children[0].data;
    expect(timeStringBeforeClick === calculatedValue).toBe(true);

    rendered.find('TimeRangeSelectionBar').find('button').first().simulate('click');
    calculatedValue = rendered.find('.timeRangeSelector--timerange-text').render()[0].children[0].data;
    expect(timeStringBeforeClick !== calculatedValue).toBe(true);
    expect(timeStringAfterClick === calculatedValue).toBe(true);

    timeStringAfterClick = currentDate.add(+1, 'month').format(DateHelper.MONTH_NAME_WITH_YEAR);

    rendered.find('TimeRangeSelectionBar').find('button').last().simulate('click');
    calculatedValue = rendered.find('.timeRangeSelector--timerange-text').render()[0].children[0].data;

    expect(timeStringBeforeClick === calculatedValue).toBe(true);
    expect(timeStringAfterClick === calculatedValue).toBe(true);
  });

});
