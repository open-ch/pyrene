import React from 'react';
import { Story, Meta } from '@storybook/react';

import TextWithIcon, { TextWithIconProps } from './TextWithIcon';

export default {
  title: 'Components/Other/TextWithIcon',
  component: TextWithIcon,
  args: {
    icon: 'error',
    color: 'red',
    label: 'Allow',
  },
} as Meta;

const TemplateTextWithIcon: Story<TextWithIconProps> = (args) => {
  return <TextWithIcon {...args} />;
};

export const WithIcon = TemplateTextWithIcon.bind({});
