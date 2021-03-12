import React from 'react';
import Placeholder from '../../examples/Placeholder';

const examples = {
  props: {
    defaultExpanded: true,
    renderCallback: function displayPlaceholder(): React.ReactElement {
      return (<Placeholder label="Content" width={320} />);
    },
  },
  category: '',
};

examples.category = 'Layout';

export default examples;
