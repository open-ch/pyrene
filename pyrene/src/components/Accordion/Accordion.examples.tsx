/* eslint-disable react/display-name */
import React from 'react';
import { Example } from '../../examples/Example';
import Placeholder from '../../examples/Placeholder';
import { AccordionProps } from './Accordion';

type Column = {
  width: string,
  renderContent: () => React.ReactNode
};

type Row = {
  columns: Column[]
};

const RowLayout: React.FC<Row> = ({ columns }: Row) => (
  <div style={{ display: 'flex' }}>
    {columns.map((column, index) => (
      <div
        style={{
          width: column.width,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          marginRight: '16px',
          flexGrow: index === 0 ? 1 : 0,
        }}
        key={index} // eslint-disable-line react/no-array-index-key
      >
        {column.renderContent()}
      </div>
    ))}
  </div>
);

const renderCustomAccordionTitle = (column1: string, column2: string, column3: string) => () => (
  <div style={{ padding: '8px 0' }}>
    <RowLayout columns={[{
      width: '38%',
      renderContent: () => column1,
    }, {
      width: '30%',
      renderContent: () => column2,
    }, {
      width: '160px',
      renderContent: () => column3,
    }]}
    />
  </div>
);

const renderCustomAccordionContent = () => (
  <div style={{ margin: '-8px 24px 8px 32px', color: '#6B7282' }}>
    <RowLayout columns={[{
      width: '38%',
      renderContent: () => null,
    }, {
      width: '30%',
      renderContent: () => (
        <>
          <div>Categories: Entertainment</div>
          <div>Blocked: Streaming Media &amp; Downloads</div>
        </>
      ),
    }, {
      width: '160px',
      renderContent: () => null,
    }]}
    />
  </div>
);

const Accordion: Example<AccordionProps, {active: boolean}> = {};
Accordion.props = {
  type: 'regular',
  sections: [{
    renderContent: () => <Placeholder />,
    title: 'Section one',
  }, {
    renderContent: () => <Placeholder />,
    title: 'Section two',
  }, {
    renderContent: () => <Placeholder />,
    title: 'Section three',
  }],
};

Accordion.examples = [
  {
    props: {
      ...Accordion.props,
    },
    description: 'Simple regular accordion',
  },
  {
    props: {
      type: 'regular',
      sections: [{
        iconProps: ({ name: 'resolved', color: 'green600' }),
        renderContent: () => <Placeholder />,
        title: 'Section one',
      }, {
        iconProps: ({ name: 'info', color: 'blue500' }),
        renderContent: () => <Placeholder />,
        title: 'Section two',
      }, {
        iconProps: ({ name: 'error', color: 'red500' }),
        renderContent: () => <Placeholder />,
        title: 'Section three',
      }],
    },
    description: 'Regular accordion with icons',
  },
  {
    props: {
      type: 'custom',
      sections: [{
        iconProps: ({ name: 'info', color: 'blue500' }),
        renderContent: renderCustomAccordionContent,
        title: renderCustomAccordionTitle('youtu.be:443', 'Excluded by destination domain', 'GET connect'),
      }, {
        iconProps: ({ name: 'info', color: 'blue500' }),
        renderContent: renderCustomAccordionContent,
        title: renderCustomAccordionTitle('https://youtu.be/', 'Excluded by destination domain', 'GET something'),
      }, {
        iconProps: ({ name: 'error', color: 'red500' }),
        renderContent: renderCustomAccordionContent,
        title: renderCustomAccordionTitle('www.youtu.com:443', 'Member of required user group', 'GET anything'),
      }, {
        iconProps: ({ name: 'resolved', color: 'green600' }),
        renderContent: renderCustomAccordionContent,
        title: renderCustomAccordionTitle('https://control.open.ch/docs', 'Member of required user group', 'GET request'),
      }],
    },
    description: 'Custom accordion with render prop title',
  },
];

Accordion.category = 'Interaction';

export default Accordion;
