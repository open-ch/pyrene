import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import TabView from './TabView';

const props = {
  initialTabName: 'Tab 2',
  tabs: [
    { name: 'Tab 1', renderCallback: () => <div>Tab1Content</div>, disabled: false },
    { name: 'Tab 2', renderCallback: () => <div>Tab2Content</div>, disabled: true }
  ],
};

describe('<TabView />', () => {
  it('renders without crashing', () => {
    const rendered = shallow(<TabView {...props} />);
  });

  it('displays the content', () => {
    const rendered = shallow(<TabView {...props} />);
    expect(rendered.contains('Tab2Content')).to.equal(true);
  });


  it('has clickable tabs', () => {
    const rendered = mount(<TabView {...props} />);

    expect(rendered.contains('Tab2Content')).to.equal(true);
    rendered.find('.tab').first().simulate('click');
    expect(rendered.contains('Tab1Content')).to.equal(true);
  });

  it('has tabs that are not clickable if disabled', () => {
    const rendered = mount(<TabView {...props} initialTabName={'Tab 1'}/>);
    expect(rendered.contains('Tab1Content')).to.equal(true);
    rendered.find('.tab').last().simulate('click');
    expect(rendered.contains('Tab1Content')).to.equal(true);
  });
});