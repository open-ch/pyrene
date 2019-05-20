/* eslint-disable react/display-name */
import React from 'react';
import { Card, Paragraph } from 'pyrene/dist/pyrene.dev';

const paragraphHowTo = [{
  title: 'Paragraphs',
  description: 'Paragraphs hold text',
  component: () => (
    <Card>
      <Paragraph>
Text is separated in paragraphs.
        <br />
Newline in the same paragraph.
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
