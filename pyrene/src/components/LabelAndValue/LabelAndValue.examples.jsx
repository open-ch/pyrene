const LabelAndValue = {};

LabelAndValue.props = {
  label: 'bandwidth',
  value: '461.2 kb/s',
  size: 'small',
};

LabelAndValue.examples = [
  {
    props: { label: 'Punch card', value: '12/80', size: 'tiny' },
    description: 'Tiny size',
  }, {
    props: { label: 'Bandwidth', value: '461.2 kb/s', size: 'small' },
    description: 'Small size',
  }, {
    props: { label: 'Volume', value: '89 GB', size: 'large' },
    description: 'Large size',
  },
];

LabelAndValue.category = 'Layout';

export default LabelAndValue;
