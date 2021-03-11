import React from 'react';
import { shallow } from 'enzyme';

import Collapsible from './Collapsible';

const props = {
  renderCallback: function displayPlaceholder(): React.ReactElement {
    return (<div>ContentDiv</div>);
  },
  labelCollapsed: 'More information',
  labelExpanded: 'Less information',
};

describe('<Collapsible />', () => {
  it('renders without crashing', () => {
    shallow(<Collapsible {...props} />);
  });

  it('renders the content', () => {
    const rendered = shallow(<Collapsible {...props} />);

    expect(rendered.contains('More information')).toBe(true);
    expect(rendered.contains('ContentDiv')).toBe(true);
  });

  it('renders the content when the `expanded` option is selected by default', () => {
    const defaultExpandedProps = { ...props, defaultExpanded: true };
    const rendered = shallow(<Collapsible {...defaultExpandedProps} />);

    expect(rendered.contains('Less information')).toBe(true);
    expect(rendered.contains('ContentDiv')).toBe(true);
  });

  it('renders expanded content when label is clicked on', () => {
    const rendered = shallow(<Collapsible {...props} />);
    rendered.find('.unSelectable').simulate('click');

    expect(rendered.contains('Less information')).toBe(true);
    expect(rendered.contains('ContentDiv')).toBe(true);
  });

  it('expands and collapses the content when the respective label is clicked on', () => {
    const rendered = shallow(<Collapsible {...props} />);

    rendered.find('.unSelectable').simulate('click');
    expect(rendered.contains('Less information')).toBe(true);

    rendered.find('.unSelectable').simulate('click');
    expect(rendered.contains('More information')).toBe(true);
  });

});
