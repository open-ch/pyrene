import React from 'react';
import { Story, Meta } from '@storybook/react';
import ShareDialog, { ShareDialogProps } from './ShareDialog';

export default {
  title: 'Components/Other/ShareDialog',
  component: ShareDialog,
} as Meta;

const Template: Story<ShareDialogProps> = (args) => <ShareDialog {...args} />;

export const Simple = Template.bind({});
Simple.args = { link: 'SCRUBBED-URL' };
