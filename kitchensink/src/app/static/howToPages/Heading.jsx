/* eslint-disable react/display-name */
import React from 'react';
import { Card, Heading } from 'pyrene/dist/pyrene.dev';

const headingHowTo = [{
  title: 'Margins',
  description: 'Headings are separated by margins, except for the first and last one',
  component: () => (
    <Card>
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
    </Card>
  ),
}];

export default headingHowTo;
