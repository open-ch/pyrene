import React from 'react';
import Tooltip from './Tooltip';

const props = {
  dataSeries: [{
    dataValue: 12345,
    dataColor: 'red',
    dataLabel: 'test',
  }],

  left: 55,
  top: 42,

  time: 9284655926,
  timeFormat: (d) => d,
};

describe('<Tooltip />', () => {
  it('renders without crashing', () => {
    shallow(<Tooltip {...props} />);
  });
});
