import React from 'react';
import { shallow } from 'enzyme';

import Tooltip from './Tooltip';

const props = {
  label: 'TooltipLabel',
  children: <div>Test</div>,
};

describe('<Tooltip />', () => {
  it('renders without crashing', () => {
    shallow(<Tooltip {...props} />);
  });

});
