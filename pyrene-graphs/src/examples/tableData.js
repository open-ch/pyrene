/* eslint-disable import/prefer-default-export */
export const tableData = [
  {
    application: 'INFLUXdev',
    link: '#',
    volume: 91.3,
    shareOfTotal: 12.76,
  },
  {
    application: 'MSS KAFKA (DEV)',
    link: '#',
    volume: 89.7,
    shareOfTotal: 12.55,
  },
  {
    application: 'ORACLEdev',
    link: '#',
    volume: 89.0,
    shareOfTotal: 12.44,
  },
  {
    application: 'OSAG Proxy',
    link: '#',
    volume: 57.0,
    shareOfTotal: 7.96,
  },
  {
    application: 'SSH',
    link: '#',
    volume: 72.3,
    shareOfTotal: 10.11,
  },
  {
    application: 'INFLUXdev',
    link: '#',
    volume: 91.3,
    shareOfTotal: 12.76,
  },
  {
    application: 'MSS KAFKA (DEV)',
    link: '#',
    volume: 89.7,
    shareOfTotal: 12.55,
  },
  {
    application: 'ORACLEdev',
    link: '#',
    volume: 89,
    shareOfTotal: 12.44,
  },
  {
    application: 'OSAG Proxy',
    link: '#',
    volume: 57,
    shareOfTotal: 7.96,
  },
  {
    application: 'SSH',
    link: '#',
    volume: 72.3,
    shareOfTotal: 10.11,
  },
  {
    application: 'INFLUXdev',
    link: '#',
    volume: 91.3,
    shareOfTotal: 12.76,
  },
  {
    application: 'MSS KAFKA (DEV)',
    link: '#',
    volume: 89.7,
    shareOfTotal: 12.55,
  },
  {
    application: 'ORACLEdev',
    link: '#',
    volume: 89,
    shareOfTotal: 12.44,
  },
  {
    application: 'OSAG Proxy',
    link: '#',
    volume: 57,
    shareOfTotal: 7.96,
  },
  {
    application: 'SSH',
    link: '#',
    volume: 72.3,
    shareOfTotal: 10.11,
  },
];

export const tableColumns = {
  label: {
    accessor: d => d.application,
    linkAccessor: d => d.link,
    title: 'Application',
  },
  primaryValue: {
    accessor: d => d.volume,
    title: 'Volume',
    formatter: d => `${d.toFixed(1)} GB`,
  },
  secondaryValue: {
    accessor: d => d.shareOfTotal,
    title: 'Share of Total',
    formatter: d => `${d.toFixed(2)} %`,
  },
};

export const tableDataComparison = [
  {
    application: 'INFLUXdev',
    link: '#',
    volumeCurrent: 91.3,
    volumePrevious: 103.8,
  },
  {
    application: 'MSS KAFKA (DEV)',
    link: '#',
    volumeCurrent: 89.7,
    volumePrevious: 88.8,
  },
  {
    application: 'ORACLEdev',
    link: '#',
    volumeCurrent: 89.0,
    volumePrevious: 79.9,
  },
  {
    application: 'OSAG Proxy',
    link: '#',
    volumeCurrent: 57.0,
    volumePrevious: 53.1,
  },
  {
    application: 'SSH',
    link: '#',
    volumeCurrent: 72.3,
    volumePrevious: 63.9,
  },
];

export const tableColumnsComparison = {
  label: {
    accessor: d => d.application,
    linkAccessor: d => d.link,
    title: 'Application',
  },
  primaryValue: {
    accessor: d => d.volumeCurrent,
    title: 'Current',
    formatter: d => `${d.toFixed(1)} GB`,
  },
  secondaryValue: {
    accessor: d => d.volumePrevious,
    title: 'Previous',
    formatter: d => `${d.toFixed(1)} GB`,
  },
};

export const tableDataUpDown = [
  {
    location: 'Altdorf',
    link: '#',
    up: 100.0,
    down: 100.0,
  },
  {
    location: 'Zürich',
    link: '#',
    up: 14.0,
    down: 52.9,
  },
  {
    location: 'Lit',
    link: '#',
    up: 100.0,
    down: 49.7,
  },
  {
    location: 'Chorugh',
    link: '#',
    up: 100.0,
    down: 18.9,
  },
  {
    location: 'Los Angeles',
    link: '#',
    up: 100.0,
    down: 10.5,
  },
];

export const tableColumnsUpDown = {
  label: {
    accessor: d => d.location,
    linkAccessor: d => d.link,
    title: 'Location',
  },
  primaryValue: {
    accessor: d => d.up,
    title: 'Volume Up',
    formatter: d => `${d.toFixed(1)} %`,
  },
  secondaryValue: {
    accessor: d => d.down,
    title: '/Down',
    formatter: d => `${d.toFixed(1)} %`,
  },
};
