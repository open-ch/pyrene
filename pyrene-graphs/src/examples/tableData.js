/* eslint-disable import/prefer-default-export */
export const tableData = [
  {
    application: 'Dropbox',
    link: '#',
    volume: 1147.4,
    shareOfTotal: 16.6,
  },
  {
    application: 'Youtube',
    link: '#',
    volume: 849.9,
    shareOfTotal: 12.3,
  },
  {
    application: 'Google',
    link: '#',
    volume: 558.1,
    shareOfTotal: 8.1,
  },
  {
    application: 'Facebook',
    link: '#',
    volume: 345.4,
    shareOfTotal: 5.0,
  },
  {
    application: 'Qlik',
    link: '#',
    volume: 200.2,
    shareOfTotal: 2.9,
  },
  {
    application: 'We Transfer',
    link: '#',
    volume: 192.1,
    shareOfTotal: 2.7,
  },
  {
    application: 'Asana',
    link: '#',
    volume: 145.3,
    shareOfTotal: 2.0,
  },
  {
    application: 'Twitter',
    link: '#',
    volume: 88.6,
    shareOfTotal: 1.2,
  },
  {
    application: 'Bitbucket',
    link: '#',
    volume: 52.0,
    shareOfTotal: 0.7,
  },
  {
    application: 'Bamboo HR',
    link: '#',
    volume: 21.4,
    shareOfTotal: 0.3,
  },
  {
    application: 'Skype for Business',
    link: '#',
    volume: 16.5,
    shareOfTotal: 0.2,
  },
  {
    application: 'Stash',
    link: '#',
    volume: 12.3,
    shareOfTotal: 0.1,
  },
  {
    application: 'Adobe Photoshop',
    link: '#',
    volume: 10.7,
    shareOfTotal: 0.1,
  },
  {
    application: 'Jira',
    link: '#',
    volume: 8.8,
    shareOfTotal: 0.1,
  },
  {
    application: 'Sugar Pro',
    link: '#',
    volume: 7.4,
    shareOfTotal: 0.1,
  },
  {
    application: 'Yahoo',
    link: '#',
    volume: 6.9,
    shareOfTotal: 0.1,
  },
  {
    application: 'CNN',
    link: '#',
    volume: 6.8,
    shareOfTotal: 0.1,
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
