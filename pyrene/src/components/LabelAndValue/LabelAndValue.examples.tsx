import { Example } from '../../examples/Example';
import { LabelAndValueProps } from './LabelAndValue';

const LabelAndValue: Example<LabelAndValueProps> = {};

LabelAndValue.props = {
  label: 'bandwidth',
  value: '461.2 kb/s',
  size: 'small',
};

LabelAndValue.examples = [
  {
    props: { label: 'Frequency', value: '42 Hz', size: 'tiny' },
    description: 'Tiny size',
  }, {
    props: { label: 'Bandwidth', value: '461.2 kb/s', size: 'small' },
    description: 'Small size',
  }, {
    props: {
      label: 'Volume', value: '89 GB', size: 'large', type: 'danger',
    },
    description: 'Large size',
  },
];

LabelAndValue.category = 'Layout';

export default LabelAndValue;
