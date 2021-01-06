/* eslint-disable react/display-name */
import React from 'react';
import { Button, Container } from '@osag/pyrene/dist/pyrene.dev';

const buttonHowTo = [{
  title: 'Icon Usage',
  description: 'Buttons can use icon to emphasise the functionality or convey more meaning to it.',
  component: () => (
    <>
      <Button icon="share" label="Share" type="primary" />
      <Button icon="errorOutline" label="Delete" type="danger" />
      <Button icon="filter" label="Filter" type="secondary" />
      <Button icon="search" label="Search" type="ghost" />
    </>
  ),
}];

export default buttonHowTo;
