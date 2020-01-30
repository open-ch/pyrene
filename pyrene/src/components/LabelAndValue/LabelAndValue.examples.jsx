const LabelAndValue = {};

LabelAndValue.props = {
  label: 'bandwidth',
  value: '461.2 kb/s',
  size: 'small',
};

LabelAndValue.examples = [
  {
    props: { label: 'bandwidth', value: '461.2 kb/s', size: 'small' },
    description: 'Small size',
  }, {
    props: { label: 'volume', value: '89 GB', size: 'large' },
    description: 'Large size',
  },
];

LabelAndValue.category = 'Layout';

export default LabelAndValue;
