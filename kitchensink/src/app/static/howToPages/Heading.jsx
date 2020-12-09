/* eslint-disable react/display-name */
import React from 'react';
import { Card, Heading } from '@osag/pyrene/dist/pyrene.dev';

const headingHowTo = [{
  title: 'Margins',
  description: 'Headings are separated by margins except for the first and last one. Go ahead and check out the margins in your browser inspector.',
  component: () => (
    <Card>
      <Heading level={1}>Section</Heading>
      <Heading level={2}>Subsection</Heading>
      <Heading level={1}>Section</Heading>
      <Heading level={2}>Subsection</Heading>
    </Card>
  ),
}];

export default headingHowTo;
