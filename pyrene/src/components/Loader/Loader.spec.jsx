import React from 'react';

import Loader from './Loader';

describe('<Loader />', () => {
  it('renders without crashing', () => {
    shallow(<Loader />);
  });
});
