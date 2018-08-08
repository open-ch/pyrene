import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Tooltip from './Tooltip';

const props = {
  label: 'TooltipLabel'
};

describe('<Tooltip />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<Tooltip {...props}><div>Test</div></Tooltip>);
  });

});