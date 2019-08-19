import React from 'react';
import Placeholder from '../../examples/Placeholder';

const examples = {
  props: {
    defaultExpanded: true,
    renderCallback: () => <Placeholder label="Content" width={320} />, // eslint-disable-line react/display-name
  },
};

examples.category = 'Layout';

export default examples;
