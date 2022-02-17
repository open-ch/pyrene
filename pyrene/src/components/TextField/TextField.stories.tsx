import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import TextField, { TextFieldProps } from './TextField';

export default {
  title: 'Components/Form/TextField',
  component: TextField,
} as Meta;

const TemplateWithIcon: Story<TextFieldProps> = () => {
  const [inputValue, setInputValue] = useState('');
  return (
    <TextField helperLabel="Please provide your name" onChange={(value) => setInputValue(value)} placeholder="Type your name" title="Name" width={500} iconName="edit" value={inputValue} />
  );
};

export const WithIcon = TemplateWithIcon.bind({});

const TemplateWithoutIcon: Story<TextFieldProps> = () => {
  const [inputValue, setInputValue] = useState('');
  return (
    <TextField helperLabel="Helper text for instructions" onChange={(value) => setInputValue(value)} placeholder="Placeholder Text" title="Field Label" width={500} value={inputValue} />
  );
};

export const WithoutIcon = TemplateWithoutIcon.bind({});
