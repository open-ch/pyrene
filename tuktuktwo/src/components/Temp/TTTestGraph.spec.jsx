import React from 'react';

import TTTestGraph from './TTTestGraph';

describe('<TTTestGraph />', () => {
  it('renders without crashing', () => {
    shallow(
      <TTTestGraph tooltipChildren={() => (<div/>)}/>
    );
  });
});
