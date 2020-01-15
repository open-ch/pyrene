import { applications } from '../../examples/barData';
import { getSITickValue, getSIUnit } from '../../common/Formats';

const examples = {};

examples.props = {
  data: applications.data,
  error: 'There was an error while loading data.',
  title: 'Top Applications by Volume',
  description: 'A vertical bar chart',
  legend: applications.legend,
  tickFormat: (value) => getSITickValue(value, applications.data),
  tooltipFormat: (d) => d,
  unit: getSIUnit(applications.data, 'B'),
};

examples.category = 'Chart';

export default examples;
