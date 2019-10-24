import React from 'react';
import Tooltip from './Tooltip';

const props = {
  dataValue: 12345,
  dataColor: 'red',
  dataLabel: 'test',

  time: 92845926,
  timeFormat: d => d,
};

describe('<Tooltip />', () => {
  it('renders without crashing', () => {
    shallow(<Tooltip {...props} />);
  });
});
