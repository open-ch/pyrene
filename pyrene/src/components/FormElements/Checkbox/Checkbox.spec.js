import React from 'react';

import Checkbox from './Checkbox';

const props = {
  label: 'checkboxLabel',
};

describe('<Checkbox />', () => {
  it('renders without crashing', () => {
    shallow(<Checkbox {...props} />);
  });

  it('calls onchange on click', () => {
    const onChange = jest.fn();
    const rendered = shallow(<Checkbox {...props} onChange={onChange} />);

    rendered.find('input[type="checkbox"]').simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);

    rendered.find('input[type="checkbox"]').simulate('change');
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('does not call onclick when disabled', () => {
    const onChange = jest.fn();
    const rendered = shallow(<Checkbox {...props} onChange={onChange} disabled={true} />);
    rendered.find('input[type="checkbox"]').simulate('change');

    expect(onChange).not.toHaveBeenCalled();
  });
});