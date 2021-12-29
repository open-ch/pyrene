import React from 'react';

import { Story, Meta } from '@storybook/react';

import Banner, { BannerProps } from './Banner';

export default {
  title: 'Components/Other/Banner',
  component: Banner,
} as Meta;

const Template: Story<BannerProps> = (args) => <Banner {...args} />;

export const Example = Template.bind({});

Example.args = {
  label: 'There are over 10\'000 objects to load.',
  type: 'info',
  styling: 'standard',
  children: 'The monkey-rope is found in all whalers; but it was only in the Pequod that the monkey and his holder were ever tied together. This improvement upon the original usage was introduced by no less a man than Stubb, in order to afford the imperilled harpooneer the strongest possible guarantee for the faithfulness and vigilance.',
};
