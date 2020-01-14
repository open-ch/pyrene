import { applications } from '../../examples/barData';
import { getSITickValue, getSIUnit } from '../../common/Formats';

const examples = {};

examples.props = {
  axis: {
    format: (value) => getSITickValue(value, applications.data),
    unit: getSIUnit(applications.data, 'B'),
  },
  data: applications.data,
  error: 'There was an error while loading data.',
  title: 'Top Applications by Volume',
  description: 'A vertical bar chart',
  legend: applications.legend,
  tooltipFormat: (d) => d,
};

examples.category = 'Chart';

export default examples;
