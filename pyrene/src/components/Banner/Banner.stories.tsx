import React from 'react';

import { Story, Meta } from '@storybook/react';

import Banner, { BannerProps } from './Banner';

export default {
  title: 'Components/Other/Banner',
  component: Banner,
} as Meta;

const Template: Story<BannerProps> = (args) => <Banner {...args} />;

export const Standard = Template.bind({});
export const Overlay = Template.bind({});
export const Inline = Template.bind({});
export const Loading = Template.bind({});
export const Success = Template.bind({});
export const Warning = Template.bind({});

Standard.args = {
  label: 'There are over 10\'000 objects to load.',
  type: 'info',
  styling: 'standard',
  children: 'The monkey-rope is found in all whalers; but it was only in the Pequod that the monkey and his holder were ever tied together. This improvement upon the original usage was introduced by no less a man than Stubb, in order to afford the imperilled harpooneer the strongest possible guarantee for the faithfulness and vigilance.',
};

Overlay.args = {
  label: 'There are over 10\'000 objects to load.',
  type: 'info',
  styling: 'overlay',
  children: 'The monkey-rope is found in all whalers; but it was only in the Pequod that the monkey and his holder were ever tied together. This improvement upon the original usage was introduced by no less a man than Stubb, in order to afford the imperilled harpooneer the strongest possible guarantee for the faithfulness and vigilance.',
};

Inline.args = {
  label: 'There are over 10\'000 objects to load.',
  type: 'info',
  styling: 'inline',
  children: 'The monkey-rope is found in all whalers; but it was only in the Pequod that the monkey and his holder were ever tied together. This improvement upon the original usage was introduced by no less a man than Stubb, in order to afford the imperilled harpooneer the strongest possible guarantee for the faithfulness and vigilance.',
};

Loading.args = {
  label: 'There are over 10\'000 objects to load.',
  type: 'loading',
  styling: 'standard',
  children: 'The monkey-rope is found in all whalers; but it was only in the Pequod that the monkey and his holder were ever tied together. This improvement upon the original usage was introduced by no less a man than Stubb, in order to afford the imperilled harpooneer the strongest possible guarantee for the faithfulness and vigilance.',
};

Success.args = {
  label: 'There are over 10\'000 objects to load.',
  type: 'success',
  styling: 'standard',
  children: 'The monkey-rope is found in all whalers; but it was only in the Pequod that the monkey and his holder were ever tied together. This improvement upon the original usage was introduced by no less a man than Stubb, in order to afford the imperilled harpooneer the strongest possible guarantee for the faithfulness and vigilance.',
};

Warning.args = {
  label: 'There are over 10\'000 objects to load.',
  type: 'warning',
  styling: 'standard',
  children: 'The monkey-rope is found in all whalers; but it was only in the Pequod that the monkey and his holder were ever tied together. This improvement upon the original usage was introduced by no less a man than Stubb, in order to afford the imperilled harpooneer the strongest possible guarantee for the faithfulness and vigilance.',
};
