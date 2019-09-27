import { applications, nsmSensors } from '../../examples/barData';

const examples = {};

examples.props = {
  data: applications,
  header: 'Top Applications by Volume',
  description: 'A horizontal bar chart',
  legend: ['Volume'],
};

examples.examples = [{
  props: {
    data: applications,
    header: 'Top Applications by Volume',
    description: 'A horizontal bar chart',
    legend: ['Volume'],
  },
}, {
  props: {
    data: nsmSensors,
    header: 'Dummy',
    description: 'dummy',
    legend: ['high', 'moderate', 'low'],
  },
}];

examples.category = 'Chart';

export default examples;
