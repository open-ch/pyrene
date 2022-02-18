import React from 'react';

import { Story, Meta } from '@storybook/react';
import AttachmentField, { AttachmentFieldProps } from './AttachmentField';

export default {
  title: 'Components/Form/AttachmentField',
  component: AttachmentField,
} as Meta;

const Template: Story<AttachmentFieldProps> = () => (
  <AttachmentField width={500} placeholder="Add attachments" />
);

export const Simple = Template.bind({});
