/**
 * COLORS
 */

import icons from './icons';

const primaryColors = [
  {
    title: '',
    colors: [
      {
        colorName: 'blue', name: 'blue-500', darkFont: false, bordered: false, infoLabel: 'For accent and highlight',
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

const neutralColors = [
  {
    title: '',
    colors: [
      {
        name: 'neutral-500', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        name: 'neutral-400', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        name: 'neutral-300', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        name: 'neutral-200', darkFont: false, bordered: false,
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        name: 'neutral-100', darkFont: true, bordered: false,
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        name: 'neutral-050', darkFont: true, bordered: false,
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        name: 'neutral-030', darkFont: true, bordered: false,
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        name: 'neutral-020', darkFont: true, bordered: true,
      },
    ],
  },
  {
    title: '',
    colors: [
      {
        name: 'neutral-010', darkFont: true, bordered: true,
      },
    ],
  },
];

const interactionColors = [
  {
    title: 'neutral',
    colors: [
      {
        name: 'blue-500', darkFont: false, bordered: false, stack: 'top',
      },
      {
        name: 'blue-600', darkFont: false, bordered: false, stack: 'bottom',
      },
    ],
  },
  {
    title: 'success',
    colors: [
      {
        name: 'green-500', darkFont: false, bordered: false, stack: 'top',
      },
      {
        name: 'green-600', darkFont: false, bordered: false, stack: 'bottom',
      },
    ],
  },
  {
    title: 'warning',
    colors: [
      {
        name: 'orange-500', darkFont: false, bordered: false, stack: 'top',
      },
      {
        name: 'orange-600', darkFont: false, bordered: false, stack: 'bottom',
      },
    ],
  },
  {
    title: 'danger',
    colors: [
      {
        name: 'red-500', darkFont: false, bordered: false, stack: 'top',
      },
      {
        name: 'red-600', darkFont: false, bordered: false, stack: 'bottom',
      },
    ],
  },
  {
    title: 'outage',
    colors: [
      {
        name: 'neutral-500', darkFont: false, bordered: false, stack: 'single',
      },
    ],
  },
  {
    title: 'inactive',
    colors: [
      {
        name: 'neutral-100', darkFont: true, bordered: false, stack: 'single',
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
  interactionColors,
  extendedColors,
  icons,
  svgs,
};
