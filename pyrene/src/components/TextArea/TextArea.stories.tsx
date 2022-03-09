import React from 'react';
import { Story } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import TextAreaComponent, { TextAreaProps } from './TextArea';

// The approach with useArgs generally works, but in the docs view typing in the component is not so smooth.
// Looks like it's an issue in storybook:
// https://github.com/storybookjs/storybook/issues/11657

export default {
  title: 'Components/Form/TextArea',
  component: TextAreaComponent,
  args: {
    helperLabel: 'Please provide your name',
    placeholder: 'Type your name',
    title: 'Name',
    value: '',
  },
};

const TemplateStandard: Story<TextAreaProps> = ({ onChange, ...args }) => {
  const [, updateArgs] = useArgs();
  const changeInputValue = (value: string) => updateArgs({ value: value });
  return <TextAreaComponent onChange={changeInputValue} {...args} />;
};

export const Standard = TemplateStandard.bind({});

const TemplateAutoResize: Story<TextAreaProps> = ({ onChange, adaptToContent, ...args }) => {
  const [, updateArgs] = useArgs();
  const changeInputValue = (value: string) => updateArgs({ value: value });
  return <TextAreaComponent onChange={changeInputValue} {...args} adaptToContent />;
};

export const AutoResize = TemplateAutoResize.bind({});
