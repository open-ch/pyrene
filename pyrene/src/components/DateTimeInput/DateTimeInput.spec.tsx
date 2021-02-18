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
      timeStamp: 946681199000,
      onChange: onchange,
    };

    const rendered = mount(<DateTimeInput {...props} />);
    const timeInput = rendered.find('input').last();
    timeInput.simulate('change');

    // Minus seconds
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

    expect(onchange).toBeCalledWith(946681140000);
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

    dateInputDom.value = 'aa.bb.cccc';
    dateInput.simulate('change');

    timeInputDom.value = 'ee:ff';
    timeInput.simulate('change');

    expect(onchange).toBeCalledWith(null);
  });
});
