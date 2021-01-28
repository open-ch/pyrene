import React from 'react';
import { shallow, mount } from 'enzyme';

import CalendarDateSelector from './CalendarDateSelector';
import ToggleButtonGroup from '../ToggleButtonGroup/ToggleButtonGroup';

let rendered;

const props = {
  onChange: (value, timeUnit) => { rendered.setProps({ value: value, timeUnit: timeUnit }); },
  //  1 August 2019
  value: { day: 17, month: 7, year: 2019 },
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

    expect(rendered.find(ToggleButtonGroup)).toHaveLength(1);

    let calculatedValue = rendered.find('ArrowSelector .value').render()[0].children[0].data;
    expect(calculatedValue).toBe('July 2019');

    // We are simulating selecting the 24h preset
    // @ts-ignore
    rendered.find(ToggleButtonGroup).props().onChange('day');
    calculatedValue = rendered.find('ArrowSelector .value').render()[0].children[0].data;
    expect(calculatedValue).toBe('17 July 2019');

    // @ts-ignore
    rendered.find(ToggleButtonGroup).props().onChange('year');
    calculatedValue = rendered.find('ArrowSelector .value').render()[0].children[0].data;
    expect(calculatedValue).toBe('2019');
  });

  it('has a dropdown that changes the timerange and sets the day to 1 if months or year have been changed', () => {
    rendered = mount(<CalendarDateSelector {...props} />);

    let calculatedValue = rendered.props().value;
    expect(calculatedValue).toEqual(props.value);

    //  left
    rendered.find('ArrowSelector').find('button').first().simulate('click');
    calculatedValue = rendered.props().value;
    expect(calculatedValue).toEqual({ day: 1, month: 6, year: 2019 });

    // right
    rendered.find('ArrowSelector').find('button').last().simulate('click');
    calculatedValue = rendered.props().value;
    expect(calculatedValue).toEqual({ day: 1, month: 7, year: 2019 });
  });

  it('has a dropdown that changes the timerange and sets the day and month to 1 if the year has been changed', () => {
    rendered = mount(<CalendarDateSelector {...props} />);

    // We are simulating changing a year
    // @ts-ignore
    rendered.find(ToggleButtonGroup).props().onChange('year');

    const dateBeforeClick = props.value;
    const dateAfterClick = { day: 1, month: 1, year: dateBeforeClick.year - 1 };

    let calculatedValue = rendered.props().value;
    expect(dateBeforeClick).toBe(calculatedValue);

    rendered.find('ArrowSelector').find('button').first().simulate('click');
    // @ts-ignore
    rendered.find(ToggleButtonGroup).props().onChange('day');
    calculatedValue = rendered.props().value;
    expect(dateBeforeClick).not.toStrictEqual(calculatedValue);
    expect(dateAfterClick).toStrictEqual(calculatedValue);
  });

});
