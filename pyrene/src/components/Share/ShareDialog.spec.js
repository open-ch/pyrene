import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import ShareDialog from './ShareDialog';
import Button from '../Button/Button';

const props = {
  link: 'someLink',
};

describe('<ShareDialog />', () => {
  it('renders without crashing', () => {
    const rendered = mount(<ShareDialog {...props} />);
  });

  it('renders dialog on click', () => {
    const rendered = mount(<ShareDialog {...props} />);
    rendered.find(Button).simulate('click');
  });

});
