/* eslint-disable react/display-name */
import React from 'react';
import { Card, Paragraph } from 'pyrene/dist/pyrene.dev';

const paragraphHowTo = [{
  title: 'Markup in Paragraphs',
  description: 'Paragraphs hold text or simple markup like line breaks or bold text.',
  component: () => (
    <Card>
      <Paragraph>
Paragraph text
        <br />
separated by a lind break.
      </Paragraph>
      <Paragraph>
        {'Or text that is '}
        <b>bold</b>
        {' in a new paragraph.'}
      </Paragraph>
    </Card>
  ),
}];

export default paragraphHowTo;
