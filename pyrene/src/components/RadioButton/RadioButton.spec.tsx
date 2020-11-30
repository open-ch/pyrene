import React from 'react';
import { shallow } from 'enzyme';

import RadioButton from './RadioButton';

const props = {
  checked: false,
  disabled: false,
  invalid: false,
  label: 'one',
  name: 'one',
  readonly: false,
  value: 'one',
};

describe('<RadioButton />', () => {
  it('renders without crashing', () => {
    shallow(<RadioButton {...props} />);
  });

  it('calls onchange on click', () => {
    const onChange = jest.fn();
    const rendered = shallow(<RadioButton {...props} onChange={onChange} />);

    rendered.find('input[type="radio"]').first().simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(1);

    rendered.find('input[type="radio"]').last().simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(2);

    rendered.find('input[type="radio"]').last().simulate('change', { target: { checked: false } });
    expect(onChange).toHaveBeenCalledTimes(3);
  });

});
