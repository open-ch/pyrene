import React from 'react';
import { shallow, mount } from 'enzyme';

import DateTime from './DateTime';

describe('<DateTime />', () => {
  it('renders without crashing', () => {
    shallow(<DateTime />);
  });

  it('renders icon font', () => {
    const rendered = mount(<DateTime />);
    expect(rendered.find('.pyreneIcon-calendar')).toHaveLength(1);
    expect(rendered.find('.pyreneIcon-clock')).toHaveLength(1);
  });
});
