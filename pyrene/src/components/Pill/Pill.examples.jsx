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
      icon: 'trash',
      maxValue: 100,
      value: 6,
      type: 'neutral',
    },
    description: '6 trashed pieces',
  },
  {
    props: {
      icon: 'question',
      maxValue: 99,
      value: 188,
      type: 'warning',
    },
    description: 'More than 99 questions',
  },
  {
    props: {
      icon: 'share',
      maxValue: 99,
      value: 188,
      type: 'info',
    },
    description: 'Mor than 99 shares',
  },
];

export default examples;
