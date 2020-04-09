import React from 'react';
import Placeholder from '../../examples/Placeholder';

const ActionBar = {};
/* eslint-disable no-alert */
ActionBar.props = {
  actions: [
    {
      iconName: 'chevronLeft',
      active: true,
      color: 'neutral300',
      onClick: () => alert('To the left!'),
      tooltip: 'go left',
    },
    {
      iconName: 'chevronRight',
      active: true,
      color: 'neutral300',
      onClick: () => alert('To the right!'),
      tooltip: 'go right',
    },
  ],
};

ActionBar.examples = [
  {
    props: {
      actions: [
        {
          iconName: 'chevronLeft',
          active: true,
          color: 'neutral300',
          onClick: () => alert('To the left!'),
        },
        {
          iconName: 'chevronRight',
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
          iconName: 'pin',
          active: true,
          color: 'red500',
          onClick: () => alert('Pinned!'),
        }, {
          iconName: 'share',
          active: true,
          color: 'green500',
          onClick: () => alert('Shared!'),
        }, {
          iconName: 'trash',
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
          iconName: 'add',
          active: true,
          onClick: () => alert('Added!'),
        }, {
          iconName: 'delete',
          active: false,
          onClick: () => alert('Deleted!'),
        }, {
          iconName: 'search',
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
          iconName: 'question',
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
          iconName: 'refresh',
          active: true,
          onClick: () => alert('Refreshed!'),
        },
        {
          svg: 'http://s.cdpn.io/3/kiwi.svg',
          active: true,
          onClick: () => alert('This is an SVG icon!'),
        },
      ],
    },
    description: 'Action bar with one SVG icon and one icon-font icon.',
  },
  {
    props: {
      actions: (stateProvider) => [
        {
          iconName: 'protection',
          active: typeof stateProvider.state.active === 'undefined' || stateProvider.state.active,
          tooltip: 'Check Shield',
          renderPopover: () => <Placeholder />, // eslint-disable-line react/display-name
        },
        {
          iconName: 'mdr',
          active: typeof stateProvider.state.active === 'undefined' || stateProvider.state.active,
          tooltip: 'Search Shield',
          renderPopover: () => <Placeholder />, // eslint-disable-line react/display-name
        },
        {
          iconName: 'refresh',
          active: true,
          onClick: () => {
            stateProvider.setState(() => ({ active: false }));
            setTimeout(() => stateProvider.setState(() => ({ active: true })), 1200);
          },
        },
      ],
    },
    description: 'Action bar with popover.',
  },
];

ActionBar.category = 'Interaction';

export default ActionBar;
