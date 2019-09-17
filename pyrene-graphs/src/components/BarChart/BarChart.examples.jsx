import {
  tableData,
} from '../../examples/tableData';

const columns = {
  label: {
    accessor: d => d.application,
    title: 'Application',
  },
  value: {
    accessor: d => d.volume,
    title: 'Volume',
    formatter: d => `${d} GB`,
  },
};

const examples = {};

examples.props = {
  data: tableData.slice(0, 7),
  columns: columns,
  header: 'Top Applications by Volume',
  description: 'A horizontal bar chart',
};

examples.category = 'Chart';

export default examples;
