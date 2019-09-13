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
    maxWidth: '90px',
  },
  secondaryValue: {
    accessor: d => d.shareOfTotal,
    title: 'Share of Total',
    formatter: d => `${d.toFixed(2)} %`,
    maxWidth: '90px',
  },
};

export const tableDataComparison = [
  {
    application: 'Dropbox',
    link: '#',
    volumeCurrent: 1147.4,
    volumePrevious: 1058.3,
  },
  {
    application: 'Youtube',
    link: '#',
    volumeCurrent: 849.9,
    volumePrevious: 911.2,
  },
  {
    application: 'Google',
    link: '#',
    volumeCurrent: 558.1,
    volumePrevious: 561.3,
  },
  {
    application: 'Facebook',
    link: '#',
    volumeCurrent: 345.4,
    volumePrevious: 777.2,
  },
  {
    application: 'Qlik',
    link: '#',
    volumeCurrent: 200.2,
    volumePrevious: 203.3,
  },
  {
    application: 'We Transfer',
    link: '#',
    volumeCurrent: 192.1,
    volumePrevious: 181.2,
  },
  {
    application: 'Asana',
    link: '#',
    volumeCurrent: 145.3,
    volumePrevious: 88.8,
  },
  {
    application: 'Twitter',
    link: '#',
    volumeCurrent: 88.6,
    volumePrevious: 79.9,
  },
  {
    application: 'Bitbucket',
    link: '#',
    volumeCurrent: 52.0,
    volumePrevious: 53.1,
  },
  {
    application: 'Bamboo HR',
    link: '#',
    volumeCurrent: 21.4,
    volumePrevious: 22.3,
  },
  {
    application: 'Skype for Business',
    link: '#',
    volumeCurrent: 16.5,
    volumePrevious: 103.8,
  },
  {
    application: 'Stash',
    link: '#',
    volumeCurrent: 12.3,
    volumePrevious: 11.9,
  },
  {
    application: 'Adobe Photoshop',
    link: '#',
    volumeCurrent: 10.7,
    volumePrevious: 0.5,
  },
  {
    application: 'Jira',
    link: '#',
    volumeCurrent: 8.8,
    volumePrevious: 8.8,
  },
  {
    application: 'Sugar Pro',
    link: '#',
    volumeCurrent: 7.4,
    volumePrevious: 3.3,
  },
  {
    application: 'Yahoo',
    link: '#',
    volumeCurrent: 6.9,
    volumePrevious: 3.3,
  },
  {
    application: 'CNN',
    link: '#',
    volumeCurrent: 6.8,
    volumePrevious: 12.5,
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
    maxWidth: '90px',
  },
  secondaryValue: {
    accessor: d => d.volumePrevious,
    title: 'Previous',
    formatter: d => `${d.toFixed(1)} GB`,
    maxWidth: '90px',
  },
};

export const tableDataUpDown = [
  {
    location: 'Altdorf',
    link: '#',
    down: 100.0,
    up: 100.0,
  },
  {
    location: 'Zürich',
    link: '#',
    down: 14.0,
    up: 52.9,
  },
  {
    location: 'Lit',
    link: '#',
    down: 100.0,
    up: 49.7,
  },
  {
    location: 'Chorugh',
    link: '#',
    down: 100.0,
    up: 18.9,
  },
  {
    location: 'Los Angeles',
    link: '#',
    down: 100.0,
    up: 10.5,
  },
  {
    location: 'San Francisco',
    link: '#',
    down: 66.0,
    up: 14.5,
  },
  {
    location: 'Shanghai',
    link: '#',
    down: 22.0,
    up: 46.9,
  },
  {
    location: 'Peking',
    link: '#',
    down: 99.0,
    up: 12.7,
  },
  {
    location: 'Geneva',
    link: '#',
    down: 65.0,
    up: 33.9,
  },
  {
    location: 'Redwood City',
    link: '#',
    down: 88.0,
    up: 65.5,
  },
  {
    location: 'Paris',
    link: '#',
    down: 63.0,
    up: 63.0,
  },
  {
    location: 'Rome',
    link: '#',
    down: 78.0,
    up: 99.9,
  },
  {
    location: 'Milan',
    link: '#',
    down: 74.0,
    up: 10.7,
  },
  {
    location: 'Washington D.C.',
    link: '#',
    down: 100.0,
    up: 100.0,
  },
  {
    location: 'Johannesburg',
    link: '#',
    down: 14.0,
    up: 10.5,
  },
  {
    location: 'Lima',
    link: '#',
    down: 8.0,
    up: 8.5,
  },
  {
    location: 'Bogota',
    link: '#',
    down: 3.0,
    up: 5.5,
  },
];

export const tableColumnsUpDown = {
  label: {
    accessor: d => d.location,
    linkAccessor: d => d.link,
    title: 'Location',
  },
  primaryValue: {
    accessor: d => d.down,
    title: 'Volume Down',
    formatter: d => `${d.toFixed(1)} %`,
    maxWidth: '90px',
  },
  secondaryValue: {
    accessor: d => d.up,
    title: 'Volume Up',
    formatter: d => `${d.toFixed(1)} %`,
    maxWidth: '90px',
  },
};
