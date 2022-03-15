import React, { useState, useCallback } from 'react';
import { Story, Meta } from '@storybook/react';

import Modal, { ModalProps } from './Modal';
import Button from '../Button/Button';

const renderedContent = <div>Hello from modal</div>;

const contents = [
  <div>Previous content</div>,
  renderedContent,
  <div>Next content</div>,
];
export default {
  title: 'Components/Layout/Modal',
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(1);

  const nextHandle = () => setActiveContent(activeContent + 1);

  const previousHandle = () => setActiveContent(activeContent - 1);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} label="Open modal" />
      {isOpen && (
        <Modal
          {...args}
          onNextArrowClick={nextHandle}
          onPreviousArrowClick={previousHandle}
          canNext={activeContent < 2}
          canPrevious={activeContent >= 1}
          onClose={() => setIsOpen(false)}
          renderCallback={() => contents[activeContent]}
        />
      )}
    </div>
  );
};

export const Simple = Template.bind({});

Simple.args = {
  size: 'large',
  title: 'Modal',
  renderHeader: true,
  displayNavigationArrows: true,
  Footer: () => <div style={{ padding: '24px' }}>Footer</div>,
};

export const SmallClosable = Template.bind({});

SmallClosable.args = {
  size: 'small',
  renderCallback: () => renderedContent,
  title: 'Small modal',
  renderFooter: false,
};

export const XLarge = Template.bind({});

XLarge.args = {
  size: 'xlarge',
  renderCallback: () => renderedContent,
  renderFooter: false,
  title: 'Xlarge modal',
};
