import React from 'react';

import BarChart from './BarChart';

const props = {
  renderCallback: () => (<div>ContentDiv</div>), // eslint-disable-line react/display-name
};

describe('<BarChart />', () => {
  it('renders without crashing', () => {
    shallow(<BarChart {...props} />);
  });

  it('renders the content', () => {
    const rendered = shallow(<BarChart {...props} />);

    expect(rendered.contains('ContentDiv')).toBe(true);
  });
});
