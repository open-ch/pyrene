import React from 'react';

import Pill from './Pill';

const props = {
  max: 99,
  number: 188,
  type: 'info',
};

describe('<Pill />', () => {
  it('renders without crashing', () => {
    shallow(<Pill {...props} />);
  });

});
