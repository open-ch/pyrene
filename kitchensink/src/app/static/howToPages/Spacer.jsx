/* eslint-disable react/display-name */
import React from 'react';
import {
  Card, Spacer, Heading, Paragraph,
} from '@osag/pyrene/dist/pyrene.dev';

const spacerHowTo = [{
  title: 'Margins',
  description: 'Spacers separate content, but collapse with neigbouring margins.',
  component: () => (
    <Card>
      <Heading level={1}>Heading</Heading>
      <Spacer size="large" />
      <Paragraph>Large spacer above.</Paragraph>
      <Spacer size="xxxlarge" />
      <Paragraph>Extra, extra, extra large spacer above.</Paragraph>
    </Card>
  ),
}];

export default spacerHowTo;
