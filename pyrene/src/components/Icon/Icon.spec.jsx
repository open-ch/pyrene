import React from 'react';

import Icon from './Icon.jsx';

describe('<Icon />', () => {

  it('renders without crashing', () => {
    shallow(<Icon label="" />);
  });
});
