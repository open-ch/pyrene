import React from 'react';

import TimeSeriesTooltipWrapper from './TimeSeriesTooltipWrapper';

const props = {
  left: 3,
  top: 2,
  time: 4052305,
  timeFormat: x => x,
  data: 436,
  dataLabel: 'amount of testing monkeys',
  dataColor: 'monkey-brown',
  children: (<span className="test-123" />),
};

describe('<TimeSeriesTooltipWrapper />', () => {
  it('renders without crashing', () => {
    shallow(
      <TimeSeriesTooltipWrapper {...props} />
    );
  });

  it('renders its children', () => {
    const rendered = shallow(<TimeSeriesTooltipWrapper {...props} />);
    const child = rendered.find('span').at(0);
    expect(child.prop('className')).toBe('test-123');
  });
});
