const tableData = [
  {
    application: 'INFLUXdev',
    volumeCurrent: 91.3,
    volumePrevious: 103.8,
  },
  {
    application: 'MSS KAFKA (DEV)',
    volumeCurrent: 89.7,
    volumePrevious: 88.8,
  },
  {
    application: 'ORACLEdev',
    volumeCurrent: 89,
    volumePrevious: 79.9,
  },
  {
    application: 'OSAG Proxy',
    volumeCurrent: 57,
    volumePrevious: 53.1,
  },
  {
    application: 'SSH',
    volumeCurrent: 72.3,
    volumePrevious: 63.9,
  },
];

const tableColumns = {
  label: {
    accessor: d => d.application,
    title: 'Application',
  },
  currentValue: {
    accessor: d => d.volumeCurrent,
    title: '',
    formatter: d => `${d} GB`,
  },
  previousValue: {
    accessor: d => d.volumePrevious,
    title: '',
    formatter: d => `${d} GB`,
  },
};

const examples = {};

examples.props = {
  data: tableData,
  columns: tableColumns,
};

examples.examples = [{
  props: {
    data: tableData,
    columns: tableColumns,
    title: 'Volume Comparison by Application',
    subtitle: 'A simple table with one column as a comparison bar chart',
    legend: {
      currentLabel: 'Current period',
      previousLabel: 'Previous period',
    },
  },
  description: 'A simple table with one column as a comparison bar chart',
}, {
  props: {
    data: tableData,
    columns: tableColumns,
    title: 'Volume Comparison by Application',
    subtitle: 'A simple table with one column as a bullet chart',
    legend: {
      currentLabel: 'Current period',
      previousLabel: 'Previous period',
    },
    bullet: true,
  },
  description: 'A simple table with one column as a comparison bar chart',
},
];

export default examples;
