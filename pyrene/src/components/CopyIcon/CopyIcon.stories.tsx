import React from 'react';
import { Story, Meta } from '@storybook/react';
import CopyIcon, { CopyIconProps } from './CopyIcon';

export default {
  title: 'Components/Other/CopyIcon',
  component: CopyIcon,
} as Meta;

const Template: Story<CopyIconProps> = (args) => <CopyIcon {...args} />;

export const Copy = Template.bind({});
Copy.args = {
  valueToCc: 'Heading one',
};
