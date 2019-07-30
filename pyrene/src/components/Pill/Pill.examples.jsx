const examples = {};

examples.props = {
  icon: 'data',
  maxValue: 99,
  value: 188,
  type: 'info',
};

examples.examples = [
  {
    props: {
      icon: 'hot',
      maxValue: 99,
      value: 66,
      type: 'danger',
    },
    description: '66 isolated hosts',
  },
  {
    props: {
      icon: 'warning',
      maxValue: 99,
      value: 66,
      type: 'success',
    },
    description: '66 warnings',
  },
  {
    props: {
      maxValue: 100,
      value: 6,
      type: 'neutral',
    },
  },
  {
    props: {
      maxValue: 99,
      value: 188,
      type: 'warning',
    },
  },
  {
    props: {
      icon: 'share',
      maxValue: 99,
      value: 188,
      type: 'info',
    },
    description: 'More than 99 shares',
  },
];

export default examples;
