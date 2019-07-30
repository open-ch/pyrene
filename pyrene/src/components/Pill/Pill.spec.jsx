import React from 'react';

import Pill from './Pill';

const props = {
  icon: 'data',
  maxValue: 99,
  value: 188,
  type: 'info',
};

describe('<Pill />', () => {
  it('renders without crashing', () => {
    shallow(<Pill {...props} />);
  });

});
