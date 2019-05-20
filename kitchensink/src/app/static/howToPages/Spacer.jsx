/* eslint-disable react/display-name */
import React from 'react';
import { Card, Spacer, Paragraph } from 'pyrene/dist/pyrene.dev';

const spacerHowTo = [{
  title: 'Spacer',
  description: 'Spacers separate content',
  component: () => (
    <Card>
      <Paragraph>Text</Paragraph>
      <Spacer size="large" />
      <Paragraph>Text</Paragraph>
    </Card>
  ),
}];

export default spacerHowTo;
