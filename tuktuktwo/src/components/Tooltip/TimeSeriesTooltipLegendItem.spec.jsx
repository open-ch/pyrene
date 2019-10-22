import React from 'react';

import TimeSeriesTooltipLegendItem from './TimeSeriesTooltipLegendItem';

const props = {
  className: 'class',
  color: 'monkey-brown',
  dataLabel: 'Monkeys per hours',
  dataLabelClassName: 'dataClass',
  dataValue: 1234,
  dataValueClassName: 'valueClass',
};

describe('<TimeSeriesTooltipLegendItem />', () => {
  it('renders without crashing', () => {
    shallow(
      <TimeSeriesTooltipLegendItem {...props} />
    );
  });
});
