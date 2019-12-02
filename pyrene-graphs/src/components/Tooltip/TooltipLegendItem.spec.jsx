import React from 'react';
import TooltipLegendItem from './TooltipLegendItem';

const props = {
  dataColor: 'red',
  dataLabel: 'test',
  dataValue: '547',
};

describe('<TooltipLegendItem />', () => {
  it('renders without crashing', () => {
    shallow(<TooltipLegendItem {...props} />);
  });
});
