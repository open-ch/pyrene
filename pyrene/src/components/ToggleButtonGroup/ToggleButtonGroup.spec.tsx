import React from 'react';
import { shallow } from 'enzyme';

import ToggleButtonGroup from './ToggleButtonGroup';

const props = {
  values: [{ label: 'one', id: 'one' }, { label: 'two', id: 'two' }],
  selected: 'one',
};

describe('<ToggleButtonGroup />', () => {
  it('renders without crashing', () => {
    const onClick = jest.fn();
    shallow(<ToggleButtonGroup {...props} onClick={onClick} />);
  });

  it('calls onchange on click', () => {
    const onClick = jest.fn();
    const rendered = shallow(<ToggleButtonGroup {...props} onClick={onClick} />);

    // The selected button cannot be clicked
    rendered.find('button').first().simulate('click');
    expect(onClick).toHaveBeenCalledTimes(0);

    // The second option can be clicked
    rendered.find('button').last().simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

});
