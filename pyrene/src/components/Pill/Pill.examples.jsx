const examples = {};

examples.props = {
  icon: 'data',
  iconType: 'neutral',
  maxValue: 99,
  value: 188,
  type: 'info',
  onClick: () => alert('Max value ' + examples.props.value + ' exceeded!'),
};

examples.examples = [
  {
    props: {
      icon: 'hot',
      iconType: 'danger',
      maxValue: 99,
      value: 66,
      type: 'danger',
    },
    description: '66 isolated hosts. Not clickable.',
  },
  {
    props: {
      icon: 'eye',
      iconType: 'neutral-light',
      maxValue: 99,
      value: 66,
      type: 'success',
      onClick: () => alert('Found 66 investigations.'),
    },
    description: '66 investigations. Clickable.',
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
      iconType: 'info',
      maxValue: 99,
      value: 188,
      type: 'info',
    },
    description: 'More than 99 shares. Not clickable.',
  },
  {
    props: {
      icon: 'data',
      iconType: 'neutral',
      maxValue: 99,
      value: 188,
      type: 'info',
      onClick: () => alert('Max value ' + examples.props.value + ' exceeded!'),
    },
    description: 'More than 99 data items. Clickable.',
  },
];

export default examples;
