const data = [
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
  data: data,
  columns: columns,
};

examples.examples = [{
  props: {
    data: data,
    columns: columns,
    title: 'Top Applications by Volume',
    subtitle: 'A horizontal bar chart',
    legend: [{
      label: 'Volume',
      colorKey: 'primary',
    },
    ],
  },
  description: 'A horizontal bar chart',
}, {
  props: {
    data: data,
    columns: columns,
    title: 'Top Applications by Volume Relative',
    subtitle: 'A horizontal relative bar chart',
    legend: [{
      label: 'Volume',
      colorKey: 'primary',
    },
    ],
    relative: true,
  },
  description: 'A horizontal relative bar chart',
}, {
  props: {
    data: data,
    columns: columns,
    title: 'Top Applications by Volume',
    subtitle: 'A vertical bar chart',
    legend: [{
      label: 'Volume',
      colorKey: 'primary',
    },
    ],
    direction: 'vertical',
  },
  description: 'A vertical bar chart',
}, {
  props: {
    data: data,
    columns: columns,
    title: 'Top Applications by Volume Relative',
    subtitle: 'A vertical relative bar chart',
    legend: [{
      label: 'Volume',
      colorKey: 'primary',
    },
    ],
    relative: true,
    direction: 'vertical',
  },
  description: 'A vertical relative bar chart',
},
];

export default examples;
