import iconExampleSelected from '../Checkbox/checkbox-selected.svg';

const IconActionBar = {};

IconActionBar.props = {
  icons: [
    {
      icon: 'chevronLeft',
      active: true,
      color: 'neutral300',
      onClick: () => alert('To the left!'),
    },
    {
      icon: 'chevronRight',
      active: true,
      color: 'neutral300',
      onClick: () => alert('To the right!'),
    },
  ],
};

IconActionBar.examples = [
  {
    props: {
      icons: [
        {
          icon: 'chevronLeft',
          active: true,
          color: 'neutral300',
          onClick: () => alert('To the left!'),
        },
        {
          icon: 'chevronRight',
          active: true,
          color: 'neutral300',
          onClick: () => alert('To the right!'),
        },
      ],
    },
    description: 'Icon action bar with left and right navigation.',
  },
  {
    props: {
      boxStyle: 'box',
      icons: [
        {
          icon: 'pin',
          active: true,
          color: 'red500',
          onClick: () => alert('Pinned!'),
        }, {
          icon: 'share',
          active: true,
          color: 'green500',
          onClick: () => alert('Shared!'),
        }, {
          icon: 'trash',
          active: false,
          onClick: () => {},
        },
      ],
    },
    description: 'Icon action bar with pin, share and trash functionalities. Trash is disabled.',
  },
  {
    props: {
      icons: [
        {
          icon: 'add',
          active: true,
          onClick: () => alert('Added!'),
        }, {
          icon: 'delete',
          active: false,
          onClick: () => alert('Deleted!'),
        }, {
          icon: 'search',
          active: true,
          onClick: () => alert('Searched!'),
        },
      ],
    },
    description: 'Icon action bar with add, delete and search functionalities.',
  },
  {
    props: {
      boxStyle: 'none',
      icons: [
        {
          icon: 'question',
          active: true,
          color: 'blue500',
          onClick: () => alert('You will find help text here!'),
        },
      ],
    },
    description: 'Scenario where clicking the question icon opens some help text.',
  },
  {
    props: {
      boxStyle: 'box',
      icons: [
        {
          icon: 'refresh',
          active: true,
          onClick: () => alert('Refreshed!'),
        },
        {
          icon: iconExampleSelected,
          iconType: 'svg',
          active: true,
          onClick: () => alert('Checked!'),
        },
      ],
    },
    description: 'Example with one SVG icon and one icon-font icon.',
  },
];

IconActionBar.category = 'Interaction';

export default IconActionBar;
