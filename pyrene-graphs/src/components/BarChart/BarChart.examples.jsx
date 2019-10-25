import { applications } from '../../examples/barData';

const examples = {};

examples.props = {
  data: applications,
  title: 'Top Applications by Volume',
  description: 'A vertical bar chart',
  legend: ['Volume'],
};

examples.category = 'Chart';

export default examples;
