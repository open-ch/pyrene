const Link = {};

Link.props = {
  label: 'Click Me',
  path: '#',
};

Link.examples = [
  {
    props: { label: 'standalone', path: '#' },
    description: '',
  }, {
    props: { type: 'inline', label: 'inline link', path: '#' },
    description: '',
  },
];

export default Link;
