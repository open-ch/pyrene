import React from 'react';
import TooltipTimeSeries from './TooltipTimeSeries';

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

describe('<TooltipTimeSeries />', () => {
  it('renders without crashing', () => {
    shallow(<TooltipTimeSeries {...props} />);
  });
});
