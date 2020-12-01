import React from 'react';
import { mount, shallow } from 'enzyme';

import RadioGroup from './RadioGroup';

const props = {
  name: 'testgroup',
  options: [{ label: 'one', value: 'one' }, { label: 'two', value: 'two' }, { label: 'three', value: 'three' }],
};

describe('<RadioGroup />', () => {
  it('renders without crashing', () => {
    shallow(<RadioGroup {...props} />);
  });

  it('renders the expected parent component', () => {
    const rendered = shallow(<RadioGroup {...props} />);
    expect(rendered.is('div#testgroup')).toBeTruthy();
  });

  it('calls onchange on click to test child components', () => {
    const onChange = jest.fn();
    const rendered = mount(<RadioGroup {...props} onChange={onChange} />);

    rendered.find('input[type="radio"]').first().simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(1);

    rendered.find('input[type="radio"]').at(1).simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(2);
  });

});
