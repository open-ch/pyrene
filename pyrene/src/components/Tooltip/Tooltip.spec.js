import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Tooltip from './Tooltip';

const props = {
  label: 'TooltipLabel',
  children: <div>Test</div>
};

describe('<Tooltip />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<Tooltip {...props} />);
  });

});