import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import ShareDialog from './ShareDialog';

const props = {
  link: 'someLink',
};

describe('<ShareDialog />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<ShareDialog {...props} />);
  });

  it('renders dialog', () => {
    const rendered = shallow(<ShareDialog {...props} />);

    expect(rendered.find('.shareDialog')).to.have.length(1);
  });

});
