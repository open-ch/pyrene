/* eslint-disable react/display-name */
import React from 'react';
import { Card, CalendarDateSelector } from 'pyrene/dist/pyrene.dev';

const cardHowTo = [{
  title: 'Header and Footer',
  description: 'Cards can have headers and footers.',
  component: () => (
    <Card
      header={<CalendarDateSelector />}
      footer={<div>Footer</div>}
    >
      <div>Content</div>
    </Card>
  ),
}];

export default cardHowTo;
