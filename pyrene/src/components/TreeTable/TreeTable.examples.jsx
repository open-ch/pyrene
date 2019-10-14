import React from 'react';
import uuid from 'uuid/v4';

import treeTableData from './data.json';

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

// const treeTableData = [
//   {
//     id: uuid(),
//     name: 'Some Name 1',
//     height: 25,
//     width: 10,
//     children: [
//       {
//         id: uuid(),
//         name: '[2](1)',
//         height: 'write stuff',
//         width: 50,
//         children: [
//           {
//             id: uuid(),
//             name: '[3](1)',
//             height: 'everywhere 😱',
//             width: 75,
//           },
//           {
//             id: uuid(),
//             name: '[3](2)',
//           },
//           {
//             id: uuid(),
//             name: '[3](3)',
//           },
//         ],
//       },
//       {
//         id: uuid(),
//         name: '[2](2) Height: 40px.',
//         height: 40,
//       },
//     ],
//   },
//   {
//     id: uuid(),
//     name: 'Some Name 1',
//     height: 25,
//     children: [
//       {
//         id: uuid(),
//         name: '[2](1)',
//         children: [
//           {
//             id: uuid(),
//             name: '[3](1)',
//           },
//           {
//             id: uuid(),
//             name: '[3](2)',
//           },
//           {
//             id: uuid(),
//             name: '[3](3)',
//           },
//         ],
//       },
//       {
//         id: uuid(),
//         name: '[2](2) Height: 40px.',
//         height: 40,
//       },
//     ],
//   },
//   {
//     id: uuid(),
//     name: 'Some Name 1',
//     height: 25,
//     width: 10,
//     children: [
//       {
//         id: uuid(),
//         name: '[2](1)',
//         height: 'write stuff',
//         width: 50,
//         children: [
//           {
//             id: uuid(),
//             name: '[3](1)',
//             height: 'everywhere 😱',
//             width: 75,
//           },
//           {
//             id: uuid(),
//             name: '[3](2)',
//           },
//           {
//             id: uuid(),
//             name: '[3](3)',
//           },
//         ],
//       },
//       {
//         id: uuid(),
//         name: '[2](2) Height: 40px.',
//         height: 40,
//       },
//     ],
//   },
//   {
//     id: uuid(),
//     name: 'Some Name 1',
//     height: 25,
//     children: [
//       {
//         id: uuid(),
//         name: '[2](1)',
//         children: [
//           {
//             id: uuid(),
//             name: '[3](1)',
//           },
//           {
//             id: uuid(),
//             name: '[3](2)',
//           },
//           {
//             id: uuid(),
//             name: '[3](3)',
//           },
//         ],
//       },
//       {
//         id: uuid(),
//         name: '[2](2) Height: 40px.',
//         height: 40,
//       },
//     ],
//   },
// ];

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
    id: 'id',
    headerName: 'ID',
    headerStyle: { justifyContent: 'flexEnd' },
    cellStyle: {},
    accessor: '_rowId',
    initiallyHidden: false,
    width: 100,
  },
  {
    id: 'height',
    headerName: 'Height',
    accessor: 'height',
    renderCallback: data => (
      <div>
        <div>
          {data}
        </div>
        <div>
          {data}
        </div>
        <div>
          {data}
        </div>
      </div>
    ),
    width: 100,
  },
  {
    id: 'width',
    headerName: 'Width',
    accessor: 'width',
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
      label: 'first column', type: 'singleSelect', id: 'testKey', options: testOptions,
    }, {
      label: 'second column', type: 'multiSelect', id: 'testKey2', options: testOptions,
    }],
    setUniqueRowKey: row => row.id,
  },
};

examples.category = 'Data';

export default examples;
