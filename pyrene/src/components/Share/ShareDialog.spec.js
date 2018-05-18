import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import ShareDialog from './ShareDialog';


describe('<ShareDialog />', () => {
  it('renders without crashing', () => {
    const rendered = shallow( <ShareDialog />);
  });


  it('is clickable', () => {
    const onClick = sinon.spy();
    const rendered = shallow(<ShareDialog onClick={onClick} />);
    rendered.find('button').simulate('click');

    expect(onClick).to.have.property('callCount', 1);
    expect(onClick).to.have.been.calledOnce;
  });

  /** Some Render
  it('renders the label', () => {
    const rendered = shallow(<Button label="My Label" />);
    expect(rendered.contains('My Label')).to.equal(true);
  }); */

});