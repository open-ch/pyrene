import iconExampleSelected from '../Checkbox/checkbox-selected.svg';

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
      icon: 'warning',
      type: 'standalone',
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
  {
    props: {
      icon: iconExampleSelected,
      iconType: 'svg',
    },
    description: 'Example "Selected" icon in SVG format',
  },
];


Icon.category = 'Other';

export default Icon;
