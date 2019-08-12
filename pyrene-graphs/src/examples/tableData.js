/* eslint-disable import/prefer-default-export */
export const tableData = [
  {
    application: 'INFLUX',
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

export const tableColumns = {
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

export const tableDataComparison = [
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

export const tableColumnsComparison = {
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

export const tableDataUpDown = [
  {
    location: 'Altdorf',
    up: 100.0,
    down: 100.0,
  },
  {
    location: 'Zürich',
    up: 14.0,
    down: 52.9,
  },
  {
    location: 'Lit',
    up: 100,
    down: 49.7,
  },
  {
    location: 'Chorugh',
    up: 100,
    down: 18.9,
  },
  {
    location: 'Los Angeles',
    up: 100,
    down: 10.5,
  },
];

export const tableColumnsUpDown = {
  label: {
    accessor: d => d.location,
    title: 'Location',
  },
  primaryValue: {
    accessor: d => d.up,
    title: 'Volume Up',
    formatter: d => `${d} %`,
  },
  secondaryValue: {
    accessor: d => d.down,
    title: '/Down',
    formatter: d => `${d} %`,
  },
};
