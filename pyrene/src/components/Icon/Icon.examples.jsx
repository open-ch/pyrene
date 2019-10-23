const Icon = {};

Icon.props = {
  icon: 'home',
};

Icon.examples = [
  {
    props: {
      icon: 'home',
    },
    description: 'Icon with default color and default type  ',
  },
  {
    props: {
      color: 'dangerFg',
      name: 'warning',
      type: 'standalone',
    },
    description: 'Constants from colorConstants.js.',
  },
  {
    props: {
      color: 'var(--green-500)',
      name: 'circle',
    },
    description: 'CSS vars.',
  },
  {
    props: {
      color: '#0049db',
      name: 'share',
    },
    description: 'HEX',
  },
  {
    props: {
      color: 'rgba(229, 0, 255, 0.96)',
      name: 'pin',
    },
    description: 'rgba',
  },
  {
    props: {
      svg: 'http://s.cdpn.io/3/kiwi.svg',
    },
    description: 'An SVG icon',
  },
];


Icon.category = 'Other';

export default Icon;
