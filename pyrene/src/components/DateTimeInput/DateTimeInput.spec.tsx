import React from 'react';
import { shallow, mount } from 'enzyme';

import DateTimeInput from './DateTimeInput';


describe('<DateTimeInput />', () => {
  it('renders without crashing', () => {
    shallow(<DateTimeInput onChange={jest.fn()} />);
  });

  it('renders icon font', () => {
    const rendered = mount(<DateTimeInput onChange={jest.fn()} />);
    expect(rendered.find('.pyreneIcon-calendar')).toHaveLength(1);
    expect(rendered.find('.pyreneIcon-clock')).toHaveLength(1);
  });

  it('Displays correct date.', () => {
    const props = {
      onChange: jest.fn(),
      timeStamp: 946681199000,
    };

    const rendered = mount(<DateTimeInput {...props} />);
    expect(rendered.find('input').first().props().value).toEqual('31.12.1999');
  });

  it('Invalid timestamp displays placeholder.', () => {
    const props = {
      onChange: jest.fn(),
      timeStamp: 734587698769878726587236,
    };

    const rendered = mount(<DateTimeInput {...props} />);
    const dateInput = rendered.find('input').first();
    const timeInput = rendered.find('input').last();

    expect(dateInput.props().placeholder?.includes('DD.MM.YYY') && dateInput.props().value === '').not.toBeFalsy();
    expect(timeInput.props().placeholder?.includes('HH:MM') && timeInput.props().value === '').not.toBeFalsy();
  });

  it('Valid timestamp input calls onChange with timestamp.', () => {
    const onchange = jest.fn();
    const props = {
      timeStamp: 946681199000, // This timestamp contains seconds
      onChange: onchange,
    };

    const rendered = mount(<DateTimeInput {...props} />);
    const timeInput = rendered.find('input').last();
    timeInput.simulate('change');

    // Timestamp returned should not contain seconds because component is DD.MM.YYYY HH:MM
    expect(onchange).toBeCalledWith(946681140000);
  });

  it('Valid text input calls onChange with timestamp.', () => {
    const onchange = jest.fn();
    const props = {
      name: 'test',
      onChange: onchange,
    };

    const rendered = mount(<DateTimeInput {...props} />);
    const dateInput = rendered.find('input').first();
    const timeInput = rendered.find('input').last();

    const dateInputDom = dateInput.getDOMNode<HTMLInputElement>();
    const timeInputDom = timeInput.getDOMNode<HTMLInputElement>();

    dateInputDom.value = '31.12.1999';
    dateInput.simulate('change');

    timeInputDom.value = '23:59';
    timeInput.simulate('change');

    // The expected value will change with respect to the default time zone of the component.
    expect(onchange).toBeCalledWith(946681140000);
  });

  it('number | undefined timestamp test.', () => {
    // Valid number section
    const onchange = jest.fn();
    let ts: number | undefined = 946681140000;

    const props = {
      timeStamp: ts,
      onChange: onchange,
    };

    const rendered = mount(<DateTimeInput {...props} />);
    let timeInput = rendered.find('input').last();
    timeInput.simulate('change');

    expect(onchange).toBeCalledWith(946681140000);

    // Invalid undefined section
    ts = undefined;
    rendered.setProps({ timeStamp: ts });

    timeInput = rendered.find('input').last();
    timeInput.simulate('change');

    expect(onchange).toBeCalledWith(null);
  });

  it('Invalid text input calls onChange with null.', () => {
    const onchange = jest.fn();
    const props = {
      name: 'test',
      onChange: onchange,
    };

    const rendered = mount(<DateTimeInput {...props} />);
    const dateInput = rendered.find('input').first();
    const timeInput = rendered.find('input').last();

    const dateInputDom = dateInput.getDOMNode<HTMLInputElement>();
    const timeInputDom = timeInput.getDOMNode<HTMLInputElement>();

    dateInputDom.value = '33.54.0101';
    dateInput.simulate('change');

    timeInputDom.value = '78:90';
    timeInput.simulate('change');

    expect(onchange).toBeCalledWith(null);
  });

  it('Maximum date test.', () => {
    const onchange = jest.fn();
    const props = {
      timeStamp: 1614700000000,
      maxDateTime: 1614696951000,
      onChange: onchange,
    };

    const rendered = mount(<DateTimeInput {...props} />);
    const timeInput = rendered.find('input').last();
    timeInput.simulate('change');
    const error = rendered.find('.dateTimeInputErrorMsg');

    expect(error.html()).toContain('Larger than maximum date');
  });

  it('Minimum date test.', () => {
    const onchange = jest.fn();
    const props = {
      timeStamp: 1614600000000,
      minDateTime: 1614696951000,
      onChange: onchange,
    };

    const rendered = mount(<DateTimeInput {...props} />);
    const timeInput = rendered.find('input').last();
    timeInput.simulate('change');
    const error = rendered.find('.dateTimeInputErrorMsg');

    expect(error.html()).toContain('Less than minimum date');
  });

});

describe('Tests for time zones', () => {
  it('DateTimeInputs with same date and time string but with different time zones', () => {
    let tz1 = 0;
    let tz2 = 0;

    const onchange1 = jest.fn((value: number | null | undefined) => {
      if (value) {
        tz1 = value;
      }
    });
    const onchange2 = jest.fn((value: number | null | undefined) => {
      if (value) {
        tz2 = value;
      }
    });

    const timeZoneOne = 'America/New_York';
    const timeZoneTwo = 'Europe/Zurich';
    const dateStr = '18.01.2009';
    const timeStr = '12:34';
    const offset = 21600000; // Milliseconds offset between the two timezones

    const props1 = {
      name: 'test1',
      onChange: onchange1,
      timeZone: timeZoneOne,
    };

    const props2 = {
      name: 'test2',
      onChange: onchange2,
      timeZone: timeZoneTwo,
    };


    const rendered1 = mount(<DateTimeInput {...props1} />);
    const rendered2 = mount(<DateTimeInput {...props2} />);

    const dateInput1 = rendered1.find('input').first();
    const timeInput1 = rendered1.find('input').last();

    const dateInput2 = rendered2.find('input').first();
    const timeInput2 = rendered2.find('input').last();

    const dateInput1Dom = dateInput1.getDOMNode<HTMLInputElement>();
    const timeInput1Dom = timeInput1.getDOMNode<HTMLInputElement>();

    const dateInput2Dom = dateInput2.getDOMNode<HTMLInputElement>();
    const timeInput2Dom = timeInput2.getDOMNode<HTMLInputElement>();

    dateInput1Dom.value = dateStr;
    dateInput1.simulate('change');

    timeInput1Dom.value = timeStr;
    timeInput1.simulate('change');

    dateInput2Dom.value = dateStr;
    dateInput2.simulate('change');

    timeInput2Dom.value = timeStr;
    timeInput2.simulate('change');

    expect((tz1 - tz2)).toBeGreaterThanOrEqual(offset);
  });
});
