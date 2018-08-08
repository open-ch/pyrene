import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Collapsible from './Collapsible';

const props = {
  renderCallback: () => (<div>ContentDiv</div>),
  title: 'Show More',
};

describe('<Collapsible />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<Collapsible {...props} />);
  });

  it('renders the content', () => {
    const rendered = shallow(<Collapsible {...props} />);

    expect(rendered.contains('Show More')).to.equal(true);
    expect(rendered.contains('ContentDiv')).to.equal(true);
  });

});
