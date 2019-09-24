const Icon = {};

Icon.props = {
  icon: 'home',
};

Icon.examples = [
  {
    props: {
      color: 'dangerFg',
      icon: 'warning',
    },
    description: 'Constants from colorConstants.js.',
  },
  {
    props: {
      color: 'var(--green-500)',
      icon: 'circle',
    },
    description: 'CSS vars.',
  },
  {
    props: {
      color: '#0049db',
      icon: 'share',
    },
    description: 'HEX',
  },
  {
    props: {
      color: 'rgba(229, 0, 255, 0.96)',
      icon: 'pin',
    },
    description: 'rgba',
  },
];


Icon.category = 'Other';

export default Icon;
