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
  data: tableData,
  columns: columns,
};

examples.examples = [{
  props: {
    data: tableData,
    columns: columns,
    header: 'Top Applications by Volume',
    description: 'A horizontal bar chart',
  },
  description: 'A horizontal bar chart',
}, {
  props: {
    data: tableData,
    columns: columns,
    header: 'Top Applications by Volume',
    description: 'A vertical bar chart',
    direction: 'vertical',
  },
  description: 'A vertical bar chart',
},
];

examples.category = 'Chart';

export default examples;
