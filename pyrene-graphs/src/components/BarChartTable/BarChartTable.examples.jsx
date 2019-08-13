import {
  tableData,
  tableColumns,
} from '../../examples/tableData';

const examples = {};

examples.props = {
  data: tableData,
  columns: tableColumns,
  type: 'bar',
  header: 'Top Applications by Volume',
  description: 'Optional description and explanation on how to read the chart',
};

examples.category = 'Chart';

export default examples;
