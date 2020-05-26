import React from 'react';

import DateHelper from './DateHelper';
// eslint-disable-next-line no-unused-vars

import CalendarDateSelector from './CalendarDateSelector';
import { getCurrentDate, convertToInternalMomentJs } from './CalendarDateSelectorUtils';

let rendered;

const props = {
  onChange: (value, timeUnit) => { rendered.setProps({ value: value, timeUnit: timeUnit }); },
  value: {
    ...getCurrentDate(),
  },
  timeUnit: 'month',
};

describe('<CalendarDateSelector />', () => {
  it('renders without crashing', () => {
    shallow(<CalendarDateSelector {...props} />);
  });

  it('displays the content', () => {
    rendered = shallow(<CalendarDateSelector {...props} />);
    expect(rendered.find('ArrowSelector')).toHaveLength(1);
    expect(rendered.find('TimeUnitSelectionDropdown')).toHaveLength(1);
  });

  it('renders the date with the specified formats based on the timeUnitSelector chosen', () => {
    rendered = mount(<CalendarDateSelector {...props} />);

    const currentDate = convertToInternalMomentJs(props.value);
    const timeStringBeforeClick = currentDate.format(DateHelper.MONTH_NAME_WITH_YEAR);
    let timeStringAfterClick = currentDate.format(DateHelper.FULL_DATE);

    expect(rendered.find('HorizontalSwitch')).toHaveLength(1);

    let calculatedValue = rendered.find('ArrowSelector .value').render()[0].children[0].data;
    expect(timeStringBeforeClick).toBe(calculatedValue);

    // We are simulating selecting the 24h preset
    rendered.find('HorizontalSwitch').props().onClick({ value: 'day', label: 'day', id: 'day' });
    calculatedValue = rendered.find('ArrowSelector .value').render()[0].children[0].data;
    expect(timeStringAfterClick).toBe(calculatedValue);

    // We are simulating selecting the year preset
    timeStringAfterClick = currentDate.format(DateHelper.YEAR);
    rendered.find('HorizontalSwitch').props().onClick({ value: 'year', label: 'year', id: 'year' });
    calculatedValue = rendered.find('ArrowSelector .value').render()[0].children[0].data;
    expect(timeStringAfterClick).toBe(calculatedValue);
  });

  it('has a dropdown that changes the timerange and sets the day to 1 if months or year have been changed', () => {
    rendered = mount(<CalendarDateSelector {...props} />);

    // We are simulating selecting the month preset
    const dateBeforeClick = props.value;
    const dateAfterClick = dateBeforeClick.month === 1
      ? { day: 1, month: 12, year: dateBeforeClick.year - 1 }
      : { day: 1, month: dateBeforeClick.month - 1, year: dateBeforeClick.year };

    let calculatedValue = rendered.props().value;
    expect(dateBeforeClick).toBe(calculatedValue);

    rendered.find('ArrowSelector').find('button').first().simulate('click');
    calculatedValue = rendered.props().value;
    expect(dateBeforeClick).not.toStrictEqual(calculatedValue);
    expect(dateAfterClick).toStrictEqual(calculatedValue);

    rendered.find('ArrowSelector').find('button').last().simulate('click');

    const dateAfterBackAndForth = dateAfterClick.month === 12
      ? { day: 1, month: 1, year: dateAfterClick.year + 1 }
      : { day: 1, month: dateAfterClick.month + 1, year: dateAfterClick.year };

    calculatedValue = rendered.props().value;
    expect(dateAfterBackAndForth).toStrictEqual(calculatedValue);
  });

  it('has a dropdown that changes the timerange and sets the day and month to 1 if the year has been changed', () => {
    rendered = mount(<CalendarDateSelector {...props} />);

    // We are simulating changing a year
    rendered.find('HorizontalSwitch').props().onClick({ value: 'year', label: 'year', id: 'year' });

    const dateBeforeClick = props.value;
    const dateAfterClick = { day: 1, month: 1, year: dateBeforeClick.year - 1 };

    let calculatedValue = rendered.props().value;
    expect(dateBeforeClick).toBe(calculatedValue);

    rendered.find('ArrowSelector').find('button').first().simulate('click');
    rendered.find('HorizontalSwitch').props().onClick({ value: 'day', label: 'day', id: 'day' });
    calculatedValue = rendered.props().value;
    expect(dateBeforeClick).not.toStrictEqual(calculatedValue);
    expect(dateAfterClick).toStrictEqual(calculatedValue);
  });

});
