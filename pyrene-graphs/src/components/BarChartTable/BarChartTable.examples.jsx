import {
  tableData,
  tableColumns,
} from '../../examples/tableData';
import colorSchemes from '../../styles/colorSchemes';

const examples = {};

examples.props = {
  data: tableData,
  columns: tableColumns,
  type: 'bar',
  header: 'Application',
  description: 'Optional description and explanation on how to read the chart',
  onRowDoubleClick: row => alert(row.value),
  colorScheme: colorSchemes.colorSchemeDefault,
  maxRows: 10,
};

examples.category = 'Chart';

export default examples;
