
import React from 'react';

const examples = {};

examples.props = {
  children: <div>test</div>,
};

examples.examples = [{
  props: {
    header: <div>Header</div>,
    children: <div>Content</div>,
    footer: <div>Footer</div>,
  },
  description: 'Card with Header and Footer.',
},
{
  props: {
    children: <div>Content</div>,
  },
  description: 'Plain Card.',
}];


export default examples;
