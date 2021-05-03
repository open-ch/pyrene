import React from 'react';
import { shallow, mount } from 'enzyme';

import Stepper, { StepperProps } from './Stepper';

const props: StepperProps = {
  direction: 'up',
};

describe('<Stepper />', () => {
  it('renders without crashing', () => {
    shallow(<Stepper {...props} />);
  });

  it('is clickable', () => {
    const onClick = jest.fn();
    const rendered = shallow(<Stepper {...props} onClick={onClick} />);
    rendered.find('button').simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is not clickable if disabled', () => {
    const onClick = jest.fn();
    const rendered = mount(<Stepper {...props} onClick={onClick} disabled />);
    rendered.find('button').simulate('click');

    expect(onClick).not.toHaveBeenCalled();
  });
});
