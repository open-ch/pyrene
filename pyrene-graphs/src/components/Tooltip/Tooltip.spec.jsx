import React from 'react';
import Tooltip from './Tooltip';

const props = {
  data: [{
    dataValue: 12345,
    dataColor: 'red',
    dataLabel: 'test',
  }],

  left: 55,
  top: 42,

  label: 'Test',
};

describe('<Tooltip />', () => {
  it('renders without crashing', () => {
    shallow(<Tooltip {...props} />);
  });
});
