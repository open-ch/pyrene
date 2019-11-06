import React from 'react';

import Responsive from './Responsive';

describe('<Responsive />', () => {
  it('renders without crashing', () => {
    shallow(
      <Responsive>
        {(parent) => (
          <div>
            {parent}
          </div>
        )}
      </Responsive>,
    );
  });
});
