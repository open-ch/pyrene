/* eslint-disable react/display-name */
import React from 'react';
import { Link, Container } from 'pyrene/dist/pyrene.dev';

const linkHowTo = [
  {
    title: 'Standalone Link',
    description: 'The standalone link is paired with a chevron icon to add more visual weight and draw attention. The icon also helps to understand, that clicking on it will navigate to a different place. Examples include widgets or tool pages.',
    component: () => (
      <Container
        title="Network utilities"
        renderCallback={() => (
          <div style={{
            height: 120, display: 'flex', justifyContent: 'space-between', flexDirection: 'column',
          }}
          >
            <Link type="standalone" path="#" label="Connectivity Test" />
            <Link type="standalone" path="#" label="Ping" />
            <Link type="standalone" path="#" label="Traceroute" />
            <Link type="standalone" path="#" label="Network Usage" />
          </div>
        )}
      />
    ),
  },
  {
    title: 'Paragraph Link',
    description: 'Sometimes we need to refer to a different page or information within a paragraph, table or other context. Examples include links to tickets, docs pages, phone numbers, email addresses etc.',
    component: () => (
      <>
        <div style={{
          height: 192, width: 286, backgroundColor: 'white', borderRadius: 4, boxShadow: '0 0 1px 0 rgba(0, 21, 44, 0.3)', boxSizing: 'border-box', padding: 24, fontSize: 14, flexShrink: 0, lineHeight: 1.71,
        }}
        >
          {'[ request '}
          <Link type="inline" path="#" label="123798" />
          {' ]'}
          <br />
          <Link type="inline" path="#" label="pyrene@open-systems.com" />
          <br />
          <Link type="inline" path="#" label="+41 58 100 11 11" />
          <br />
          <Link type="inline" path="#" label="Host Document" />
        </div>
        <div style={{
          height: 192, width: 286, backgroundColor: 'white', borderRadius: 4, boxShadow: '0 0 1px 0 rgba(0, 21, 44, 0.3)', boxSizing: 'border-box', padding: 24, fontSize: 14, flexShrink: 0, lineHeight: 1.71,
        }}
        >
          {' Kogi Cosby sweater ethical squid irony disrupt, organic tote bag gluten-free'}
          <Link type="inline" path="#" label="XOXO" />
          {' wolf typewriter mixtape small batch. DIY pickled four loko McSweeney\'s, Odd Future dreamcatcher plaid PBR&B single.'}
        </div>
      </>
    ),
  },
];
export default linkHowTo;
