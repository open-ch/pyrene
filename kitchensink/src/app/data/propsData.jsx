/* eslint-disable */
import React from 'react';

import { Button } from 'pyrene';
import GalaxyImage from '../../images/galaxy.svg';
import PyreneImage from '../../images/pyrene.svg';

const ContentFiller = (props) => (
  <div className={'unSelectable'} style={{ width: props.width,
    height: props.height,
    backgroundColor: props.backgroundColor ? props.backgroundColor : 'var(--neutral-020)',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    color: 'var(--neutral-100)',
    fontSize: props.fontSize ? props.fontSize : 32,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1 }}
  >
    {props.label ? props.label : 'Content'}
  </div>
);

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

const testOptionsWithoutInvalid = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'bacon', label: 'Bacon' },
  { value: 'cookiedough', label: 'Cookie Dough' },
  { value: 'beer', label: 'Beer' },
  { value: 'cottoncandy', label: 'Cotton Candy' },
  { value: 'crab', label: 'Crab' },
  { value: 'greentea', label: 'Green Tea' },
  { value: 'mango', label: 'Mango' },
  { value: 'tuttifrutti', label: 'Tutti Frutti' },
  { value: 'grape', label: 'Grape' },
  { value: 'coconutmilk', label: 'Coconut Milk' },
  { value: 'dulce', label: 'Dulce de Leche' },
  { value: 'caramel', label: 'Caramel' },
  { value: 'banana', label: 'Banana' },
  { value: 'garlic', label: 'Garlic' },
  { value: 'twix', label: 'Twix' },
  { value: 'mintchocolatechip', label: 'Mint Chocolate Chip' },
  { value: 'spearmint', label: 'Spearmint' },
  { value: 'oyster', label: 'Oyster' },
  { value: 'pistachio', label: 'Pistachio' },
  { value: 'rice', label: 'Rice' },
  { value: 'chickenliver', label: 'Chicken Liver' },
  { value: 'superman', label: 'Superman' },
  { value: 'lucuma', label: 'Lucuma' },
  { value: 'bluemoon', label: 'Blue Moon' },
  { value: 'charcoal', label: 'Charcoal' },
  { value: 'cheesecake', label: 'Cheesecake' },
  { value: 'rumandraisin', label: 'Rum and Raisin' },
  { value: 'moosetracks', label: 'Moose Tracks' },
];

const adminAction = (event) => alert('Admin action triggered.');

const tableData = [
  {
    "name": "SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey ",
    "age": 23,
    "friend": {
      "name": "Perry Robinson",
      "age": 33
    }
  },
  {
    "name": "Savage Weeks",
    "age": 21,
    "friend": {
      "name": "Tammi Reese",
      "age": 32
    }
  },
  {
    "name": "Trevino Daniels",
    "age": 34,
    "friend": {
      "name": "Beasley Riddle",
      "age": 30
    }
  },
  {
    "name": "Pauline Emerson",
    "age": 26,
    "friend": {
      "name": "Fisher Horne",
      "age": 37
    }
  },
  {
    "name": "Brock Stanley",
    "age": 22,
    "friend": {
      "name": "Alejandra Browning",
      "age": 33
    }
  },
  {
    "name": "Serrano Morrison",
    "age": 32,
    "friend": {
      "name": "Lana Potter",
      "age": 23
    }
  },
  {
    "name": "Justice Moss",
    "age": 32,
    "friend": {
      "name": "Sweet Willis",
      "age": 20
    }
  },
  {
    "name": "Mclaughlin Burke",
    "age": 34,
    "friend": {
      "name": "Ellis Gordon",
      "age": 32
    }
  },
  {
    "name": "Virgie Watts",
    "age": 39,
    "friend": {
      "name": "Evans Allen",
      "age": 38
    }
  },
  {
    "name": "Deann Wilkerson",
    "age": 34,
    "friend": {
      "name": "Dona Wise",
      "age": 36
    }
  },
  {
    "name": "Clemons Benton",
    "age": 30,
    "friend": {
      "name": "Hoover Barber",
      "age": 32
    }
  },
  {
    "name": "Sondra Santiago",
    "age": 21,
    "friend": {
      "name": "Dianna Fowler",
      "age": 23
    }
  },
  {
    "name": "Winifred Mack",
    "age": 39,
    "friend": {
      "name": "Maryellen Fry",
      "age": 33
    }
  },
  {
    "name": "Lydia Steele",
    "age": 35,
    "friend": {
      "name": "Torres Burton",
      "age": 30
    }
  },
  {
    "name": "Santos Acevedo",
    "age": 36,
    "friend": {
      "name": "Staci Collier",
      "age": 24
    }
  },
  {
    "name": "Flossie Beasley",
    "age": 28,
    "friend": {
      "name": "Minerva Sawyer",
      "age": 24
    }
  },
  {
    "name": "Woodward Gentry",
    "age": 38,
    "friend": {
      "name": "Eaton Harper",
      "age": 20
    }
  },
  {
    "name": "Rosa Hampton",
    "age": 39,
    "friend": {
      "name": "Waller Schroeder",
      "age": 34
    }
  },
  {
    "name": "Weber Baird",
    "age": 31,
    "friend": {
      "name": "Weeks Ferrell",
      "age": 35
    }
  },
  {
    "name": "Meyers Austin",
    "age": 29,
    "friend": {
      "name": "Maryanne Roth",
      "age": 31
    }
  },
  {
    "name": "Lynch Randall",
    "age": 22,
    "friend": {
      "name": "Carmen Richmond",
      "age": 34
    }
  },
  {
    "name": "Alexandra Herrera",
    "age": 30,
    "friend": {
      "name": "Pace Harding",
      "age": 22
    }
  },
  {
    "name": "Joseph Cotton",
    "age": 35,
    "friend": {
      "name": "Hewitt Pate",
      "age": 38
    }
  },
  {
    "name": "Mack Patton",
    "age": 39,
    "friend": {
      "name": "Chavez Palmer",
      "age": 35
    }
  },
  {
    "name": "Kitty Wallace",
    "age": 23,
    "friend": {
      "name": "Wilda Wolf",
      "age": 23
    }
  },
  {
    "name": "Lynne Cohen",
    "age": 29,
    "friend": {
      "name": "Tracey Pollard",
      "age": 34
    }
  },
  {
    "name": "Riggs Harmon",
    "age": 22,
    "friend": {
      "name": "Vickie Tucker",
      "age": 28
    }
  },
  {
    "name": "White Duran",
    "age": 34,
    "friend": {
      "name": "Owens Cortez",
      "age": 22
    }
  },
  {
    "name": "Bonita Ortiz",
    "age": 29,
    "friend": {
      "name": "Haynes Mcfarland",
      "age": 38
    }
  },
  {
    "name": "Lamb Valdez",
    "age": 39,
    "friend": {
      "name": "Amparo Leblanc",
      "age": 25
    }
  },
  {
    "name": "Carroll Shelton",
    "age": 38,
    "friend": {
      "name": "Campbell Carter",
      "age": 39
    }
  },
  {
    "name": "Rae Reid",
    "age": 37,
    "friend": {
      "name": "Mccoy Russell",
      "age": 24
    }
  },
  {
    "name": "Joni Coffey",
    "age": 37,
    "friend": {
      "name": "Bond Justice",
      "age": 33
    }
  },
  {
    "name": "Cooke Flores",
    "age": 28,
    "friend": {
      "name": "Randolph Hinton",
      "age": 26
    }
  },
  {
    "name": "Gayle Kemp",
    "age": 26,
    "friend": {
      "name": "Kasey Bright",
      "age": 35
    }
  },
  {
    "name": "Kim Martinez",
    "age": 27,
    "friend": {
      "name": "Montgomery Livingston",
      "age": 32
    }
  },
  {
    "name": "Wiggins Shannon",
    "age": 33,
    "friend": {
      "name": "Amanda Bentley",
      "age": 40
    }
  },
  {
    "name": "Love Schneider",
    "age": 35,
    "friend": {
      "name": "Bean Hall",
      "age": 28
    }
  },
  {
    "name": "Kellie Herring",
    "age": 38,
    "friend": {
      "name": "Ford Levy",
      "age": 29
    }
  },
  {
    "name": "Edwards Whitfield",
    "age": 22,
    "friend": {
      "name": "Meyer Good",
      "age": 29
    }
  },
  {
    "name": "Lois Haney",
    "age": 36,
    "friend": {
      "name": "Roseann Goff",
      "age": 33
    }
  },
  {
    "name": "Chasity Cooley",
    "age": 31,
    "friend": {
      "name": "Ellison Soto",
      "age": 27
    }
  },
  {
    "name": "Benton Molina",
    "age": 38,
    "friend": {
      "name": "Whitley Tyson",
      "age": 21
    }
  },
  {
    "name": "Joyce Gonzalez",
    "age": 40,
    "friend": {
      "name": "Andrews Lewis",
      "age": 26
    }
  },
  {
    "name": "Randi Sandoval",
    "age": 23,
    "friend": {
      "name": "Tanya Perez",
      "age": 28
    }
  },
  {
    "name": "Collier Barnes",
    "age": 29,
    "friend": {
      "name": "Clark Ayers",
      "age": 23
    }
  },
  {
    "name": "Lauri Bailey",
    "age": 32,
    "friend": {
      "name": "Sherry Mayer",
      "age": 20
    }
  },
  {
    "name": "Richard Mcgowan",
    "age": 40,
    "friend": {
      "name": "Sawyer Richard",
      "age": 30
    }
  },
  {
    "name": "Jillian Mcdowell",
    "age": 24,
    "friend": {
      "name": "Estela Carroll",
      "age": 37
    }
  },
  {
    "name": "Hansen Briggs",
    "age": 22,
    "friend": {
      "name": "Tracy Whitaker",
      "age": 20
    }
  }
];

const tableColumns = [{
  id: 'name',
  headerName: 'Name',
  accessor: 'name', // String-based value accessors!
  sortMethod: (a, b, desc) => { // Custom sorting by last letter of name, must use the native javascript Array.sort
    var lastA = a.charAt(a.length - 1);
    var lastB = b.charAt(b.length - 1);
    if (lastA > lastB) {
      return 1;
    } else if (lastA < lastB) {
      return -1;
    } else {
      return 0;
    }
  }
}, {
  id: 'age',
  headerName: 'Age',
  accessor: 'age',
  resizable: false,
  cellRenderCallback: row => ( // Custom Cell rendering
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "var(--neutral-020)",
      }}
    >
      <div
        style={{
          width: `${((row.value - 20)/20) * 100}%`,
          height: "100%",
          backgroundColor:
            ((row.value - 20)/20) * 100 > 66
              ? "var(--acqua-300)"
              : ((row.value - 20)/20) * 100 > 33
              ? "var(--teal-300)"
              : "var(--red-200)",
          transition: "all .2s ease-out"
        }}
      />
    </div>
  )
}, {
  id: 'friendName', // Required because our accessor is not a string
  headerName: 'Friend Name',
  accessor: d => d.friend.name, // Custom value accessors!
  initiallyHidden: true,
}, {
  id: 'friendAge',
  headerName: 'Friend Age',
  accessor: 'friend.age',
}];

const treeTableData = [
  {
    'name': 'Some Name 1',
    'height': 25,
    'width': 10,
    'children': [
      {
        'name': '[2](1)',
        'height': 'write stuff',
        'width': 50,
        'children': [
          {
            'name': '[3](1)',
            'height': 'everywhere 😱',
            'width': 75,
          },
          {
            'name': '[3](2)',
          },
          {
            'name': '[3](3)',
          }
        ],
      },
      {
        'name': '[2](2) Height: 40px.',
        'height': 40,
      }
    ],
  },
  {
    'name': 'Some Name 1',
    'height': 25,
    'children': [
      {
        'name': '[2](1)',
        'children': [
          {
            'name': '[3](1)',
          },
          {
            'name': '[3](2)',
          },
          {
            'name': '[3](3)',
          }
        ],
      },
      {
        'name': '[2](2) Height: 40px.',
        'height': 40,
      }
    ],
  },
  {
    'name': 'Some Name 1',
    'height': 25,
    'width': 10,
    'children': [
      {
        'name': '[2](1)',
        'height': 'write stuff',
        'width': 50,
        'children': [
          {
            'name': '[3](1)',
            'height': 'everywhere 😱',
            'width': 75,
          },
          {
            'name': '[3](2)',
          },
          {
            'name': '[3](3)',
          }
        ],
      },
      {
        'name': '[2](2) Height: 40px.',
        'height': 40,
      }
    ],
  },
  {
    'name': 'Some Name 1',
    'height': 25,
    'children': [
      {
        'name': '[2](1)',
        'children': [
          {
            'name': '[3](1)',
          },
          {
            'name': '[3](2)',
          },
          {
            'name': '[3](3)',
          }
        ],
      },
      {
        'name': '[2](2) Height: 40px.',
        'height': 40,
      }
    ],
  },
];

const treeTableColumns = [
  {
    id: 'name',
    headerName: 'Name',
    headerStyle: {justifyContent: 'flexEnd'},
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
          width: "100%",
          height: "100%",
          backgroundColor: "var(--neutral-020)",
        }}
      >
        <div
          style={{
            width: typeof data === 'undefined' ?  0: `${data}%`,
            height: "100%",
            backgroundColor:
              data > 66
                ? "var(--acqua-300)"
                : data > 33
                ? "var(--teal-300)"
                : "var(--red-200)",
            transition: "all .2s ease-out"
          }}
        />
      </div>
    ),
    initiallyHidden: true,
  },
];


/**
 * The default/start props can be defined as an object.
 * If dynamic state handling is required, a single prop can be defined as a function.
 * In the case of the function method, an object is provided as the first param with the shape of ({ state: Object, setState: Function }).
 * The setState method can be used to manipulate the component state object provided as the other parameter.
 * TLDR: Works just like React state handling.
 * 
 * PLEASE NOTE: To use the state, the callback method must be provided with the variable name as `stateProvider` to have it registered correctly.
 */
const startProps = {
  'arrowbutton': {},
  'banner': {
    label: 'There are over 10’000 objects to load.',
    type: 'info',
    styling: 'standard',
    description: 'The monkey-rope is found in all whalers; but it was only in the Pequod that the monkey and his holder were ever tied together. This improvement upon the original usage was introduced by no less a man than Stubb, in order to afford the imperilled harpooneer the strongest possible guarantee for the faithfulness and vigilance.',
  },
  'button': {
    label: 'Click Me',
  },
  'checkbox': {
    label: 'Click Me',
    value: stateProvider => stateProvider.state.value,
    onChange: stateProvider => value => stateProvider.setState({ value: value.target.checked }),
  },
  'collapsible': {
    defaultExpanded: true,
    renderCallback: () => <ContentFiller width={500} height={300} />,
  },
  'container': {
    title: 'Show More',
    collapsible: true,
    defaultExpanded: true,
    renderCallback: () => <ContentFiller width={800} height={300} />,
    adminAction: {
      label: 'admin',
      action: adminAction,
    },
  },
  'filter': {
    filters: [{label: 'first', type: 'singleSelect', filterKey: 'testKey', options: testOptionsWithoutInvalid, defaultValue: 'vanilla'}, {label: 'second', type: 'multiSelect', filterKey: 'testKey2', options: testOptionsWithoutInvalid, defaultValue: ['vanilla', 'chocolate']}, {label: 'third', type: 'text', filterKey: 'testKey3', options: null, defaultValue: 'defaultFill'}, {label: 'fourth', type: 'text', filterKey: 'testKey4', options: null}, {label: 'fifth', type: 'text', filterKey: 'testKey5', options: null}, {label: 'sixth', type: 'text', filterKey: 'testKey6', options: null}, {label: 'seventh', type: 'text', filterKey: 'testKey7', options: null}, {label: 'eighth', type: 'text', filterKey: 'testKey8', options: null}, {label: 'ninth', type: 'text', filterKey: 'testKey9', options: null}, {label: 'tenth', type: 'text', filterKey: 'testKey10', options: null}, {label: 'eleventh', type: 'text', filterKey: 'testKey11', options: null}, {label: 'twelfth', type: 'text', filterKey: 'testKey12', options: null}]
  },
  'keyvaluetable': {
    header: 'Asdf',
    rows: [
      {key: 'Key', value: 'value'},
      {key: 'Beer 🍺', value: 'beer'},
      {key: 'SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey SuperLongKey ', value: 'Dec'},
      {key: 'Image as value', value: <img src={PyreneImage} alt="Pyrene icon" />}
      ],
  },
  'link': {
    label: 'Click Me',
    path: '#',
  },
  'loader': {
    size: 'large',
  },
  'modal': {
    renderCallback: () => <ContentFiller width={'100%'} height={600} />,
    canNext: true,
    canPrevious: true,
    displayNavigationArrows: true,
    size: 'small',
    title: 'Modal',
    rightButtonBarElements: [{type: 'secondary', label: 'Cancel', action: () => null}, {type: 'primary', label: 'Apply', action: () => null}],
    onClose: () => console.log('onClose Pressed'),
  },
  'multi-select': {
    title: 'Multi-Select',
    placeholder: 'Choose your favorite ice cream',
    helperLabel: 'Ice cream is delicious',
    defaultValues: [],
    options: testOptions,
    onChange: stateProvider => value => stateProvider.setState({ value: value.target.value }),
    value: stateProvider => stateProvider.state.value,
  },
  'popover': {
    displayPopover: true,
    renderPopoverContent: () => <div style={{boxSizing: 'borderBox', padding: 24}}><ContentFiller height={200} width={400} /></div>,
    children: <ContentFiller height={100} width={200} />
  },
  'radiogroup': {
    options: [{label: 'Beer 🍺', value: 'beer'}, {label:'Coffee ☕️', value: 'coffee'}, {label:'Coffeebeer 🍹😎', value: 'coffeebeer'}],
    onChange: stateProvider => value => stateProvider.setState({ value: value.target.value }),
    value: stateProvider => stateProvider.state.value,
  },
  'select': {
    title: 'Single-Select',
    placeholder: 'Choose your favorite ice cream',
    helperLabel: 'Ice cream is delicious',
    options: testOptions,
    onChange: stateProvider => value => stateProvider.setState({ value: value.target.value }),
    value: stateProvider => stateProvider.state.value,
  },
  'sharedialog': {
    position: 'top',
    align: 'start',
    link: 'http://www.veryveryverylonglinkonanydomainintheinternet.com',
  },
  'spacer': {
    direction: 'vertical',
    children: <ContentFiller width={100} height={100} fontSize={10}/>,
    spacing: 48,
  },
  'table': {
    toggleColumns: true,
    resizable: true,
    pivotBy: ["age"],
    title: 'Table',
    keyField: 'name',
    data: tableData,
    columns: tableColumns,
    onRowDoubleClick: rowInfo => console.log(rowInfo),
    actions: [{icon: 'search', label: 'Single', callback: () => console.log('single'), active: 'single'}, {icon: 'delete', label: 'Multi', callback: () => console.log('multi'), active: 'multi'}, {icon: 'info', label: 'Always', callback: () => console.log('always'), active: 'always'}],
    filters: [{label: 'first column', type: 'singleSelect', filterKey: 'testKey', options: testOptions}, {label: 'second column', type: 'multiSelect', filterKey: 'testKey2', options: testOptions}]
  },
  'tabview': {
    initialTabName: 'Tab 1',
    directAccessTabs: 3,
    tabs: [
      { name: 'Tab 1', renderCallback: () => <ContentFiller height={200} width={848} label={'tab 1'} />, disabled: false },
      { name: 'Tab 2', renderCallback: () => <ContentFiller height={200} width={848} label={'tab 2'} />, disabled: false },
      { name: 'Tab 3', renderCallback: () => <ContentFiller height={200} width={848} label={'tab 3'} />, disabled: true },
      { name: 'Looooooooooooooooooooooooooooooooooooooong Name', renderCallback: () => <ContentFiller height={200} width={848} label={'tab 4'} />},
      { name: 'Tab 5', renderCallback: () => <ContentFiller height={200} width={848} label={'tab 5'} />, disabled: true },
    ],
  },
  'textarea': {
    title: 'Label',
    placeholder: 'Placeholder Text',
    helperLabel: 'Helper text for instructions',
    width: 500,
    rows: 3,
    maxLength: 50,
    value: stateProvider => stateProvider.state.value,
    onChange: stateProvider => value => stateProvider.setState({ value: value.target.value }),
  },
  'textfield': {
    title: 'Field Label',
    placeholder: 'Placeholder Text',
    helperLabel: 'Helper text for instructions',
    width: 500,
    value: stateProvider => stateProvider.state.value,
    onChange: stateProvider => value => stateProvider.setState({ value: value.target.value }),
  },
  'calendardateselector': {
    onChange: stateProvider => value => stateProvider.setState({ value }),
    value: stateProvider => stateProvider.state.value,
    renderRightSection: () => <Button label={'Admin'} type={'admin'} onClick={adminAction} />,
  },
  'tooltip': {
    label: 'Tooltip Label',
    preferredPosition: ['top', 'bottom'],
    align: 'center',
    children: <ContentFiller width={100} height={50} fontSize={14} />
  },
 'treetable': {
    defaultExpandedSection: '0.0.0',
    columns: treeTableColumns,
    data: treeTableData,
    title: 'Tree Table',
    onRowDoubleClick: data => console.log(data),
    filters: [{label: 'first column', type: 'singleSelect', filterKey: 'testKey', options: testOptions}, {label: 'second column', type: 'multiSelect', filterKey: 'testKey2', options: testOptions}]
 },
};


export default startProps;
export { testOptions, testOptionsWithoutInvalid, tableData, ContentFiller };
