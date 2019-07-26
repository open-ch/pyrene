import React from 'react';

import Badge from './Badge';

const props = {
  label: 'Security Alert',
  type: 'danger',
};

describe('<Badge />', () => {
  it('renders without crashing', () => {
    shallow(<Badge {...props} />);
  });

});