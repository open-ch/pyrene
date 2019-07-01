import React from 'react';
import { Categories } from 'pyrene/dist/pyrene.examples';
import Placeholder from '../../examples/Placeholder';

const examples = {
  props: {
    title: 'Bar Chart',
    renderCallback: () => <Placeholder label="Content" width={320} />, // eslint-disable-line react/display-name
  },
};

examples.category = Categories.CHART;

export default examples;
