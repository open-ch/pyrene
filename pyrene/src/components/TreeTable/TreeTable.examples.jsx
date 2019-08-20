import React from 'react';

/* eslint-disable react/display-name, no-nested-ternary */

const testOptions = [
  { value: 'chocolate', label: 'Chocolate', invalid: false },
  { value: 'strawberry', label: 'Strawberry', invalid: false },
  { value: 'vanilla', label: 'Vanilla', invalid: false },
  { value: 'bacon', label: 'Bacon', invalid: true },
  { value: 'cookiedough', label: 'Cookie Dough', invalid: false },
  { value: 'beer', label: 'Beer', invalid: false },
  { value: 'cottoncandy', label: 'Cotton Candy', invalid: false },
  { value: 'crab', label: 'Crab', invalid: false },
  { value: 'greentea', label: 'Green Tea', invalid: false },
  { value: 'mango', label: 'Mango', invalid: false },
  { value: 'tuttifrutti', label: 'Tutti Frutti', invalid: false },
  { value: 'grape', label: 'Grape', invalid: false },
  { value: 'coconutmilk', label: 'Coconut Milk', invalid: false },
  { value: 'dulce', label: 'Dulce de Leche', invalid: false },
  { value: 'caramel', label: 'Caramel', invalid: false },
  { value: 'banana', label: 'Banana', invalid: false },
  { value: 'garlic', label: 'Garlic', invalid: true },
  { value: 'twix', label: 'Twix', invalid: false },
  { value: 'mintchocolatechip', label: 'Mint Chocolate Chip', invalid: false },
  { value: 'spearmint', label: 'Spearmint', invalid: false },
  { value: 'oyster', label: 'Oyster', invalid: false },
  { value: 'pistachio', label: 'Pistachio', invalid: false },
  { value: 'rice', label: 'Rice', invalid: false },
  { value: 'chickenliver', label: 'Chicken Liver', invalid: true },
  { value: 'superman', label: 'Superman', invalid: false },
  { value: 'lucuma', label: 'Lucuma', invalid: false },
  { value: 'bluemoon', label: 'Blue Moon', invalid: false },
  { value: 'charcoal', label: 'Charcoal', invalid: false },
  { value: 'cheesecake', label: 'Cheesecake', invalid: false },
  { value: 'rumandraisin', label: 'Rum and Raisin', invalid: false },
  { value: 'moosetracks', label: 'Moose Tracks', invalid: false },
];

const treeTableData = [
  {
    name: 'Some Name 1',
    height: 25,
    width: 10,
    children: [
      {
        name: '[2](1)',
        height: 'write stuff',
        width: 50,
        children: [
          {
            name: '[3](1)',
            height: 'everywhere 😱',
            width: 75,
          },
          {
            name: '[3](2)',
          },
          {
            name: '[3](3)',
          },
        ],
      },
      {
        name: '[2](2) Height: 40px.',
        height: 40,
      },
    ],
  },
  {
    name: 'Some Name 1',
    height: 25,
    children: [
      {
        name: '[2](1)',
        children: [
          {
            name: '[3](1)',
          },
          {
            name: '[3](2)',
          },
          {
            name: '[3](3)',
          },
        ],
      },
      {
        name: '[2](2) Height: 40px.',
        height: 40,
      },
    ],
  },
  {
    name: 'Some Name 1',
    height: 25,
    width: 10,
    children: [
      {
        name: '[2](1)',
        height: 'write stuff',
        width: 50,
        children: [
          {
            name: '[3](1)',
            height: 'everywhere 😱',
            width: 75,
          },
          {
            name: '[3](2)',
          },
          {
            name: '[3](3)',
          },
        ],
      },
      {
        name: '[2](2) Height: 40px.',
        height: 40,
      },
    ],
  },
  {
    name: 'Some Name 1',
    height: 25,
    children: [
      {
        name: '[2](1)',
        children: [
          {
            name: '[3](1)',
          },
          {
            name: '[3](2)',
          },
          {
            name: '[3](3)',
          },
        ],
      },
      {
        name: '[2](2) Height: 40px.',
        height: 40,
      },
    ],
  },
];

const treeTableColumns = [
  {
    id: 'name',
    headerName: 'Name',
    headerStyle: { justifyContent: 'flexEnd' },
    cellStyle: {},
    accessor: 'name',
    initiallyHidden: false,
    width: 300,
  },
  {
    id: 'height',
    headerName: 'Height',
    accessor: 'height',
    width: 100,
  },
  {
    id: 'width',
    headerName: 'Width',
    accessor: 'width',
    cellRenderCallback: data => ( // Custom Cell rendering
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'var(--neutral-020)',
        }}
      >
        <div
          style={{
            width: typeof data === 'undefined' ? 0 : `${data}%`,
            height: '100%',
            backgroundColor:
              data > 66
                ? 'var(--acqua-300)'
                : data > 33
                  ? 'var(--teal-300)'
                  : 'var(--red-200)',
            transition: 'all .2s ease-out',
          }}
        />
      </div>
    ),
    initiallyHidden: true,
  },
];

const examples = {
  props: {
    defaultExpandedSection: '0.0.0',
    columns: treeTableColumns,
    data: treeTableData,
    title: 'Tree Table',
    onRowDoubleClick: data => console.log(data), // eslint-disable-line no-console
    filters: [{
      label: 'first column', type: 'singleSelect', filterKey: 'testKey', options: testOptions,
    }, {
      label: 'second column', type: 'multiSelect', filterKey: 'testKey2', options: testOptions,
    }],
  },
};

examples.category = 'Data';

export default examples;
