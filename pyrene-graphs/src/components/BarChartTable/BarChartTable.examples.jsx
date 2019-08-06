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

const examples = {};

examples.props = {
  data: tableData,
  columns: tableColumns,
};

examples.examples = [{
  props: {
    data: tableData,
    columns: tableColumns,
    title: 'Top Applications by Volume',
    subtitle: 'A simple table with one column as a relative bar chart',
  },
  description: 'A simple table with one column as a relative bar chart',
}];

export default examples;
