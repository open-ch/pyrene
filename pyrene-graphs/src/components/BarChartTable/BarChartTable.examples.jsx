const tableData = [
  {
    application: 'INFLUXdev',
    volume: 91.3,
    shareOfTotal: 12.76,
  },
  {
    application: 'MSS KAFKA (DEV)',
    volume: 89.7,
    shareOfTotal: 12.55,
  },
  {
    application: 'ORACLEdev',
    volume: 89,
    shareOfTotal: 12.44,
  },
  {
    application: 'OSAG Proxy',
    volume: 57,
    shareOfTotal: 7.96,
  },
  {
    application: 'SSH',
    volume: 72.3,
    shareOfTotal: 10.11,
  },
];

const tableDataComparison = [
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
  primaryValue: {
    accessor: d => d.volume,
    title: 'Volume',
    formatter: d => `${d} GB`,
  },
  secondaryValue: {
    accessor: d => d.shareOfTotal,
    title: 'Share of Total',
    formatter: d => `${d} %`,
  },
};

const tableColumnsComparison = {
  label: {
    accessor: d => d.application,
    title: 'Application',
  },
  primaryValue: {
    accessor: d => d.volumeCurrent,
    title: 'Current period',
    formatter: d => `${d} GB`,
  },
  secondaryValue: {
    accessor: d => d.volumePrevious,
    title: 'Previous period',
    formatter: d => `${d} GB`,
  },
};

const examples = {};

examples.props = {
  data: tableData,
  columns: tableColumns,
  type: 'bar',
  title: 'Top Applications by Volume',
  subtitle: 'A simple table with one column as a relative bar chart',
};

examples.examples = [{
  props: {
    data: tableData,
    columns: tableColumns,
    title: 'Top Applications by Volume',
    subtitle: 'A simple table with one column as a relative bar chart',
    type: 'bar',
  },
  description: 'A simple table with one column as a relative bar chart',
}, {
  props: {
    data: tableDataComparison,
    columns: tableColumnsComparison,
    title: 'Top Applications by Volume',
    subtitle: 'A simple table with one column as a comparison bar chart',
    type: 'comparison',
  },
  description: 'A simple table with one column as a comparison bar chart',
}, {
  props: {
    data: tableDataComparison,
    columns: tableColumnsComparison,
    title: 'Top Applications by Volume',
    subtitle: 'A simple table with one column as a bullet bar chart',
    type: 'bullet',
  },
  description: 'A simple table with one column as a bullet bar chart',
}];

export default examples;
