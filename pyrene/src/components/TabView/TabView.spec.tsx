import React from 'react';
import { shallow, mount } from 'enzyme';

import TabView from './TabView';

const props = {
  initialTabName: 'Tab 2',
  tabs: [
    {
      name: 'Tab 1',
      renderAuxiliaryInfo: () => <div className="auxiliaryInfo" />, // eslint-disable-line react/display-name
      renderCallback: () => <div>Tab1Content</div>, // eslint-disable-line react/display-name
      disabled: false,
    },
    {
      name: 'Tab 2',
      renderCallback: () => <div>Tab2Content</div>, // eslint-disable-line react/display-name
      disabled: true,
    },
  ],
};

describe('<TabView />', () => {
  it('renders without crashing', () => {
    shallow(<TabView {...props} />);
  });

  it('displays the content', () => {
    const rendered = shallow(<TabView {...props} />);
    expect(rendered.contains('Tab2Content')).toBe(true);
  });

  it('displays the name with auxiliary info callback', () => {
    const rendered = shallow(<TabView {...props} />);
    expect(rendered.find('.tabBar').childAt(0).find('.auxiliaryInfo')).toHaveLength(1);
    expect(rendered.find('.tabBar').childAt(1).find('.auxiliaryInfo')).toHaveLength(0);
  });

  it('has clickable tabs', () => {
    const rendered = mount(<TabView {...props} />);

    expect(rendered.contains('Tab2Content')).toBe(true);
    rendered.find('.tab').first().simulate('click');
    expect(rendered.contains('Tab1Content')).toBe(true);
  });

  it('has tabs that are not clickable if disabled', () => {
    const rendered = mount(<TabView {...props} initialTabName="Tab 1" />);
    expect(rendered.contains('Tab1Content')).toBe(true);
    rendered.find('.tab').last().simulate('click');
    expect(rendered.contains('Tab1Content')).toBe(true);
  });
});
