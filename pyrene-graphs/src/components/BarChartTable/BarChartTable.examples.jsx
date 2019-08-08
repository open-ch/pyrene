import {
  tableData,
  tableColumns,
} from '../../examples/tableData';

const examples = {};

examples.props = {
  data: tableData,
  columns: tableColumns,
  type: 'bar',
  title: 'Top Applications by Volume',
  subtitle: 'A simple table with one column as a relative bar chart',
};

export default examples;
