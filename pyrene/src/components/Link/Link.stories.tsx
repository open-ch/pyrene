import React from 'react';

import { Story, Meta } from '@storybook/react';

import Link, { LinkProps } from './Link';

export default {
  title: 'Components/Interaction/Link',
  component: Link,
  // Disable 'actionHandler' for the onClick prop.
  // https://github.com/storybookjs/addon-smart-knobs/issues/63
  parameters: { actions: { argTypesRegex: null } },
} as Meta;

const Template: Story<LinkProps> = (args) => <Link {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  label: 'Normal Link',
  path: 'SCRUBBED-URL',
  target: '_blank',
};

export const WithoutPath = Template.bind({});
WithoutPath.args = { label: 'Normal Link' };

export const Disabled = Template.bind({});
Disabled.args = { ...Simple.args, disabled: true };

export const Clickable = Template.bind({});
Clickable.args = {
  label: 'Click me!',
  onClick: () => window.alert('You did it!'),
};

export const Inline = Template.bind({});
Inline.args = { ...Simple.args, type: 'inline' };
