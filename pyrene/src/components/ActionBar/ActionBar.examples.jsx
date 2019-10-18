const ActionBar = {};

ActionBar.props = {
  actions: [
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

ActionBar.examples = [
  {
    props: {
      actions: [
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
    description: 'Action bar with left and right navigation.',
  },
  {
    props: {
      styling: 'box',
      actions: [
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
    description: 'Action bar with pin, share and trash functionalities with trash being disabled.',
  },
  {
    props: {
      actions: [
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
    description: 'Action bar with add, delete and search functionalities.',
  },
  {
    props: {
      styling: 'none',
      actions: [
        {
          icon: 'question',
          active: true,
          color: 'blue500',
          onClick: () => alert('You will find help text here!'),
        },
      ],
    },
    description: 'Clicking the question icon opens help text.',
  },
  {
    props: {
      styling: 'box',
      actions: [
        {
          icon: 'refresh',
          active: true,
          onClick: () => alert('Refreshed!'),
        },
        {
          icon: 'http://s.cdpn.io/3/kiwi.svg',
          iconType: 'svg',
          active: true,
          onClick: () => alert('This is an SVG icon!'),
        },
      ],
    },
    description: 'Action bar with one SVG icon and one icon-font icon.',
  },
];

ActionBar.category = 'Interaction';

export default ActionBar;
