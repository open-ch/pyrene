import React from 'react';
import { shallow, mount } from 'enzyme';

import DateTimeInput from './DateTimeInput';

describe('<DateTimeInput />', () => {
  it('renders without crashing', () => {
    shallow(<DateTimeInput />);
  });

  it('renders icon font', () => {
    const rendered = mount(<DateTimeInput />);
    expect(rendered.find('.pyreneIcon-calendar')).toHaveLength(1);
    expect(rendered.find('.pyreneIcon-clock')).toHaveLength(1);
  });
});
