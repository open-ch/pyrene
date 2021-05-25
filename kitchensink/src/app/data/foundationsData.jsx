/**
 * COLORS
 */

import icons from './icons';

const primaryColors = [
  {
    title: '',
    colors: [
      {
        colorName: 'blue', name: 'blue-500', darkFont: false, bordered: false, infoLabel: 'Accent and highlight',
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        colorName: 'dark', name: 'neutral-500', darkFont: false, bordered: false, infoLabel: 'Main color for type',
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        colorName: 'white', name: 'neutral-000', darkFont: true, bordered: true, infoLabel: 'For structure',
      },
    ],
  },
];

const successColors = [
  {
    title: 'Light',
    colors: [
      {
        colorName: '', name: 'green-200', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: 'Regular',
    colors: [
      {
        name: 'green-600', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: 'Dark',
    colors: [
      {
        name: 'green-700', darkFont: true, bordered: true,
      },
    ],
  },
];

const warningColors = [
  {
    title: 'Light',
    colors: [
      {
        name: 'orange-200', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: 'Regular',
    colors: [
      {
        name: 'orange-500', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: 'Dark',
    colors: [
      {
        name: 'orange-600', darkFont: true, bordered: true,
      },
    ],
  },
];

const dangerColors = [
  {
    title: 'Light',
    colors: [
      {
        name: 'red-200', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: 'Regular',
    colors: [
      {
        name: 'red-500', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: 'Dark',
    colors: [
      {
        name: 'red-600', darkFont: true, bordered: true,
      },
    ],
  },
];

const outageColors = [
  {
    title: 'Regular',
    colors: [
      {
        name: 'neutral-500', darkFont: false, bordered: false,
      },
    ],
  },
];

const inactiveColors = [
  {
    title: 'Regular',
    colors: [
      {
        name: 'neutral-100', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: 'Dark',
    colors: [
      {
        name: 'neutral-300', darkFont: true, bordered: true,
      },
    ],
  },
];

const semanticColors = [
  {
    title: '',
    colors: [
      {
        colorName: 'Success', name: 'green-500', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        colorName: 'Warning', name: 'orange-500', darkFont: true, bordered: false,
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        colorName: 'Danger', name: 'red-500', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        colorName: 'Outage', name: 'neutral-500', darkFont: false, bordered: false,
      },
    ],
  },
];

const neutralColors = [
  {
    title: '010',
    colors: [
      {
        name: 'neutral-010', darkFont: false, bordered: true,
      },
    ],
  },
  {
    title: '020',
    colors: [
      {
        name: 'neutral-020', darkFont: false, bordered: true,
      },
    ],
  },
  {
    title: '030',
    colors: [
      {
        name: 'neutral-030', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: '050',
    colors: [
      {
        name: 'neutral-050', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: '100',
    colors: [
      {
        name: 'neutral-100', darkFont: true, bordered: false,
      },
    ],
  },
  {
    title: '200',
    colors: [
      {
        name: 'neutral-200', darkFont: true, bordered: false,
      },
    ],
  },
  {
    title: '300',
    colors: [
      {
        name: 'neutral-300', darkFont: true, bordered: false,
      },
    ],
  },
  {
    title: '400',
    colors: [
      {
        name: 'neutral-400', darkFont: true, bordered: false,
      },
    ],
  },
  {
    title: '500',
    colors: [
      {
        name: 'neutral-500', darkFont: true, bordered: false,
      },
    ],
  },
];

const informationColors = [
  {
    title: '020',
    colors: [
      {
        name: 'blue-020', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: '050',
    colors: [
      {
        name: 'blue-050', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: '100',
    colors: [
      {
        name: 'blue-100', darkFont: true, bordered: false,
      },
    ],
  },
  {
    title: '200',
    colors: [
      {
        name: 'blue-200', darkFont: true, bordered: false,
      },
    ],
  },
  {
    title: '300',
    colors: [
      {
        name: 'blue-300', darkFont: true, bordered: false,
      },
    ],
  },
  {
    title: '400',
    colors: [
      {
        name: 'blue-400', darkFont: true, bordered: true,
      },
    ],
  },
  {
    title: '500',
    colors: [
      {
        name: 'blue-500', darkFont: true, bordered: true,
      },
    ],
  },
  {
    title: '600',
    colors: [
      {
        name: 'blue-600', darkFont: true, bordered: true,
      },
    ],
  },
  {
    title: '700',
    colors: [
      {
        name: 'blue-700', darkFont: true, bordered: true,
      },
    ],
  },
];

const sequentialColors = [
  {
    title: '1-80',
    colors: [
      {
        name: 'chart-1-80', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: '1-60',
    colors: [
      {
        name: 'chart-1-60', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: '1-40',
    colors: [
      {
        name: 'chart-1-40', darkFont: true, bordered: false,
      },
    ],
  },
  {
    title: '1-20',
    colors: [
      {
        name: 'chart-1-20', darkFont: true, bordered: false,
      },
    ],
  },
  {
    title: '1-10',
    colors: [
      {
        name: 'chart-1-10', darkFont: true, bordered: false,
      },
    ],
  },
  {
    title: '1-05',
    colors: [
      {
        name: 'chart-1-05', darkFont: true, bordered: false,
      },
    ],
  },
];

const categoricalColors = [
  {
    title: '',
    colors: [
      {
        colorName: 'Chart 2', name: 'chart-2', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        colorName: 'Chart 3', name: 'chart-3', darkFont: true, bordered: true,
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        colorName: 'Chart 4', name: 'chart-4', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        colorName: 'Chart 5', name: 'chart-5', darkFont: false, bordered: false,
      },
    ],
  },
];

const extendedColors = [
  {
    title: 'blue',
    colors: [
      {
        name: 'blue-010', darkFont: true, bordered: false, stack: 'top',
      },
      {
        name: 'blue-050', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'blue-100', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'blue-200', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'blue-300', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'blue-400', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'blue-500', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'blue-600', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'blue-700', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'blue-800', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'blue-900', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'blue-950', darkFont: false, bordered: false, stack: 'bottom',
      },
    ],
  },
  {
    title: 'green',
    colors: [
      {
        name: 'green-010', darkFont: true, bordered: false, stack: 'top',
      },
      {
        name: 'green-050', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'green-100', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'green-200', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'green-300', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'green-400', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'green-500', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'green-600', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'green-700', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'green-800', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'green-900', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'green-950', darkFont: false, bordered: false, stack: 'bottom',
      },
    ],
  },
  {
    title: 'orange',
    colors: [
      {
        name: 'orange-010', darkFont: true, bordered: false, stack: 'top',
      },
      {
        name: 'orange-050', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'orange-100', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'orange-200', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'orange-300', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'orange-400', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'orange-500', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'orange-600', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'orange-700', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'orange-800', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'orange-900', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'orange-950', darkFont: false, bordered: false, stack: 'bottom',
      },
    ],
  },
  {
    title: 'red',
    colors: [
      {
        name: 'red-010', darkFont: true, bordered: false, stack: 'top',
      },
      {
        name: 'red-050', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'red-100', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'red-200', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'red-300', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'red-400', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'red-500', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'red-600', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'red-700', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'red-800', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'red-900', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'red-950', darkFont: false, bordered: false, stack: 'bottom',
      },
    ],
  },
  {
    title: 'teal',
    colors: [
      {
        name: 'teal-010', darkFont: true, bordered: false, stack: 'top',
      },
      {
        name: 'teal-050', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'teal-100', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'teal-200', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'teal-300', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'teal-400', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'teal-500', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'teal-600', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'teal-700', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'teal-800', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'teal-900', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'teal-950', darkFont: false, bordered: false, stack: 'bottom',
      },
    ],
  },
  {
    title: 'acqua',
    colors: [
      {
        name: 'acqua-010', darkFont: true, bordered: false, stack: 'top',
      },
      {
        name: 'acqua-050', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'acqua-100', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'acqua-200', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'acqua-300', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'acqua-400', darkFont: true, bordered: false, stack: 'middle',
      },
      {
        name: 'acqua-500', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'acqua-600', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'acqua-700', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'acqua-800', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'acqua-900', darkFont: false, bordered: false, stack: 'middle',
      },
      {
        name: 'acqua-950', darkFont: false, bordered: false, stack: 'bottom',
      },
    ],
  },
];

const svgs = [
  { name: 'checkbox-blank', tags: [], path: './svgs/checkbox-blank.svg' },
];

export {
  primaryColors,
  neutralColors,
  semanticColors,
  informationColors,
  successColors,
  warningColors,
  dangerColors,
  outageColors,
  inactiveColors,
  categoricalColors,
  extendedColors,
  sequentialColors,
  icons,
  svgs,
};
