/* eslint-disable no-alert, no-console */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import Placeholder from '../../examples/Placeholder';
import ActionBar, { ActionBarProps } from './ActionBar';

export default {
  title: 'Components/Interaction/ActionBar',
  component: ActionBar,
} as Meta;


const Template: Story<ActionBarProps> = (args) => (
  <div>
    <ActionBar {...args} />
  </div>
);

const TemplateSmall: Story<ActionBarProps> = (args) => (
  <div style={{ maxWidth: '67px' }}>
    <ActionBar {...args} />
  </div>
);

const TemplateLarge: Story<ActionBarProps> = (args) => (
  <div style={{ maxWidth: '100px' }}>
    <ActionBar {...args} />
  </div>
);

export const Simple = TemplateSmall.bind({});
export const LeftAndRightNavigation = TemplateSmall.bind({});
export const VerticalWithLeftAndRightNavigation = Template.bind({});
export const WithPin = TemplateLarge.bind({});
export const WithAddDeleteSearchFunctionalities = TemplateLarge.bind({});
export const WithOnClickCallback = TemplateLarge.bind({});
export const WithSVGAndIcon = TemplateSmall.bind({});
export const WithPopover = TemplateLarge.bind({});

Simple.args = {
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

LeftAndRightNavigation.args = {
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
};

VerticalWithLeftAndRightNavigation.args = {
  actions: [
    {
      iconName: 'zoomIn',
      active: true,
      color: 'neutral300',
      onClick: () => alert('Zoom Out'),
    },
    {
      iconName: 'zoomOut',
      active: true,
      color: 'neutral300',
      onClick: () => alert('Zoom In'),
    },
    {
      iconName: 'refresh',
      active: true,
      color: 'neutral300',
      onClick: () => alert('Reset view'),
    },
  ],
  orientation: 'vertical',
};

WithPin.args = {
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
};

WithAddDeleteSearchFunctionalities.args = {
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
};

WithOnClickCallback.args = {
  styling: 'none',
  actions: [
    {
      iconName: 'question',
      active: true,
      color: 'blue500',
      onClick: () => alert('You will find help text here!'),
    },
  ],
};

WithSVGAndIcon.args = {
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
};

WithPopover.args = {
  actions: [
    {
      iconName: 'protection',
      active: true,
      tooltip: 'Check Shield',
      renderPopover: () => <Placeholder />,
    },
    {
      iconName: 'mdr',
      active: false,
      tooltip: 'Search Shield',
      renderPopover: () => <Placeholder />,
    },
    {
      iconName: 'refresh',
      active: true,
      onClick: () => console.log('Refreshing!'),
    },
  ],
};
