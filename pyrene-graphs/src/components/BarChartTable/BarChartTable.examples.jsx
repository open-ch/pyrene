import {
  tableData,
  tableColumns,
} from '../../examples/tableData';
import colorSchemes from '../../styles/colorSchemes';

const examples = {};

examples.props = {
  actions: [
    {
      label: 'Application',
      onClick: (rowData) => alert(rowData.application), // eslint-disable-line no-alert
    },
    {
      label: 'Volume',
      onClick: (rowData) => alert(rowData.volume), // eslint-disable-line no-alert
    },
  ],
  data: tableData,
  columns: tableColumns,
  type: 'bar',
  title: 'Applications',
  description: 'Optional description and explanation on how to read the chart',
  onRowDoubleClick: (row) => alert(row.volume), // eslint-disable-line no-alert
  colorScheme: colorSchemes.colorSchemeDefault,
  displayedRows: 10,
};

examples.category = 'Chart';

export default examples;
