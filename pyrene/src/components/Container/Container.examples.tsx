import React from 'react';
import { ContainerProps } from './Container';
import { Example } from '../../examples/Example';
import Placeholder from '../../examples/Placeholder';

const examples: Example<ContainerProps> = {
  props: {
    title: 'Container',
    defaultExpanded: true,
    renderCallback: () => <Placeholder label="Content" width={320} />, // eslint-disable-line react/display-name
  },
  category: 'Layout',
};

export default examples;
