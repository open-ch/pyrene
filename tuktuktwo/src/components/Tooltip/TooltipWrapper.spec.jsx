import React from 'react';

import TooltipWrapper from './TooltipWrapper';

const props = {
  left: 3,
  top: 2,
  time: 4052305,
  timeFormat: (x) => x,
  data: 436,
  dataLabel: 'amount of testing monkeys',
  dataColor: 'monkey-brown',
  children: (<span className="test-123" />),
};

describe('<TooltipWrapper />', () => {
  it('renders without crashing', () => {
    shallow(
      <TooltipWrapper {...props} />,
    );
  });

  it('renders its children', () => {
    const rendered = shallow(<TooltipWrapper {...props} />);
    const child = rendered.find('span').at(0);
    expect(child.prop('className')).toBe('test-123');
  });
});
