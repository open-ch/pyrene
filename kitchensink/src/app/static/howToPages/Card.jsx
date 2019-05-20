/* eslint-disable react/display-name */
import React from 'react';
import { Card, Paragraph } from 'pyrene/dist/pyrene.dev';

const cardHowTo = [{
  title: 'Card',
  description: 'Cards are containers for content',
  component: () => (
    <Card>
      <Paragraph>Content</Paragraph>
    </Card>
  ),
},
{
  title: 'Header',
  description: 'Cards can have headers and footers',
  component: () => (
    <Card
      header={<div>Header</div>}
      footer={<div>Footer</div>}
    >
      <Paragraph>Content</Paragraph>
    </Card>
  ),
}];

export default cardHowTo;
