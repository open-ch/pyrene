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
  header: 'Applications',
  description: 'Optional description and explanation on how to read the chart',
  onRowDoubleClick: row => alert(row.value),
  colorScheme: colorSchemes.colorSchemeDefault,
  displayedRows: 10,
};

examples.category = 'Chart';

export default examples;
