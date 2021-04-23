const Link = {};

Link.props = {
  label: 'Click Me',
  path: '#',
};

Link.examples = [
  {
    props: { label: 'Standalone', path: '#' },
    description: '',
  }, {
    props: { type: 'inline', label: 'inline link', path: '#' },
    description: '',
  },
];

Link.category = 'Interaction';

export default Link;
