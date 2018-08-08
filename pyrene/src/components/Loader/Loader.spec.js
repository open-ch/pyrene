import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Loader from './Loader';


describe('<Loader />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<Loader />);
  });
});