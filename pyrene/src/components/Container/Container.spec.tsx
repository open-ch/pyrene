import React from 'react';
import { shallow } from 'enzyme';

import Container from './Container';

const props = {
  renderCallback: () => (<div>ContentDiv</div>), // eslint-disable-line react/display-name
  title: 'Show More',
};

describe('<Container />', () => {
  it('renders without crashing', () => {
    shallow(<Container {...props} />);
  });

  it('renders the content', () => {
    const rendered = shallow(<Container {...props} />);

    expect(rendered.contains('Show More')).toBe(true);
    expect(rendered.contains('ContentDiv')).toBe(true);
  });

});
