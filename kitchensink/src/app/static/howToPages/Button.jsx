/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import { Button, Container } from 'pyrene/dist/pyrene.dev';

const buttonHowTo = [{
  title: 'Icon Usage',
  description: 'Buttons can use icon to emphasise the functionality or convey more meaning to it.',
  component: () => (
    <Fragment>
      <Button icon="share" label="Share" type="primary" />
      <Button icon="errorOutline" label="Delete" type="danger" />
      <Button icon="filter" label="Filter" type="secondary" />
      <Button icon="search" label="Search" type="ghost" />
      <Button icon="warning" label="Admin" type="admin" />
    </Fragment>
  ),
}, {
  title: 'Admin Button',
  description: 'Admin buttons have a different visual style and are used, when a certain action or view is accessible for MC Engineers only.',
  component: () => (
    <div style={{ width: 320 }}>
      <Container
        title="network interfaces"
        adminAction={{ label: 'Admin', action: () => {} }}
        renderCallback={() => (<div style={{ height: 120 }} />)}
      />
    </div>
  ),
}];

export default buttonHowTo;
