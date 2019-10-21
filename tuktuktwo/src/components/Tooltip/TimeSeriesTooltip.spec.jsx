import React from 'react';

import TimeSeriesTooltip from './TimeSeriesTooltip';

const props = {
  left: 3,
  top: 2,
  time: 4052305,
  timeFormat: x => x,
  data: 436,
  dataLabel: 'amount of testing monkeys',
  dataColor: 'monkey-brown',
  children: () => (<span className="test-123" />),
};

describe('<TimeSeriesTooltip />', () => {
  it('renders without crashing', () => {
    shallow(
      <TimeSeriesTooltip {...props} />
    );
  });

  it('renders its children', () => {
    const rendered = mount(<TimeSeriesTooltip {...props} />);
    const child = rendered.find('span').at(0);
    expect(child.prop('className')).toBe('test-123');
  });
});
