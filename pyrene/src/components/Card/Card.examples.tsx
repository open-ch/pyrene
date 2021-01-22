import React from 'react';
import { Example } from '../../examples/Example';
import { CardProps } from './Card';

const examples: Example<CardProps> = {};

examples.props = {
  children: <div>Card content</div>,
};

examples.category = 'Layout';

export default examples;
