import { applications, nsmSensors } from '../../examples/barData';

const examples = {};

examples.props = {
  data: applications,
  header: 'Top Applications by Volume',
  description: 'A horizontal bar chart',
  legend: ['Volume'],
};

examples.category = 'Chart';

export default examples;
