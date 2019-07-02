import React from 'react';

import RadioGroup from './RadioGroup';

const props = {
  options: [{ label: 'one', value: 'one' }, { label: 'two', value: 'two' }],
};

describe('<RadioGroup />', () => {
  it('renders without crashing', () => {
    shallow(<RadioGroup {...props} />);
  });

  it('calls onchange on click', () => {
    const onChange = jest.fn();
    const rendered = shallow(<RadioGroup {...props} onChange={onChange} />);

    rendered.find('input[type="radio"]').first().simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(1);

    rendered.find('input[type="radio"]').last().simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(2);
  });

});
